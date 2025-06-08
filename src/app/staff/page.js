'use client';

import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const chartOptions = (title) => ({
  responsive: true,
  plugins: {
    title: {
      display: !!title,
      text: title,
    },
    legend: {
      labels: {
        color: '#374151',
      },
    },
  },
  scales: {
    x: {
      ticks: { color: '#6B7280' },
      grid: { color: '#E5E7EB' },
    },
    y: {
      ticks: { color: '#6B7280' },
      grid: { color: '#E5E7EB' },
    },
  },
});

const StaffDashboard = () => {
  const [timeRangeBooking, setTimeRangeBooking] = useState('week');
  const [timeRangeRevenue, setTimeRangeRevenue] = useState('month');

  const [bookingData, setBookingData] = useState({
    labels: [],
    datasets: [],
  });
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const datasets = {
      day: {
        labels: ['Sáng', 'Trưa', 'Chiều', 'Tối'],
        data: [2, 5, 3, 6],
      },
      week: {
        labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
        data: [10, 15, 8, 12, 20, 18, 14],
      },
      month: {
        labels: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'],
        data: [50, 60, 55, 70],
      },
    };

    const current = datasets[timeRangeBooking] || { labels: [], data: [] };

    setBookingData({
      labels: current.labels,
      datasets: [
        {
          label: 'Lượt khách đặt bàn',
          data: current.data,
          borderColor: '#FACC15',
          backgroundColor: '#FDE68A',
          pointRadius: 5,
          pointHoverRadius: 7,
        },
      ],
    });
  }, [timeRangeBooking]);

  useEffect(() => {
    const rawData = {
      day: {
        labels: ['Sáng', 'Trưa', 'Chiều', 'Tối'],
        data: [1000000, 2500000, 1800000, 3000000],
      },
      week: {
        labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
        data: [7, 12, 8, 15, 10, 9, 14],
      },
      month: {
        labels: [
          'Tháng 1',
          'Tháng 2',
          'Tháng 3',
          'Tháng 4',
          'Tháng 5',
          'Tháng 6',
          'Tháng 7',
          'Tháng 8',
          'Tháng 9',
          'Tháng 10',
          'Tháng 11',
          'Tháng 12',
        ],
        data: [
          15000000, 12000000, 18000000, 20000000, 25000000, 27000000, 30000000,
          32000000, 31000000, 29000000, 26000000, 28000000,
        ],
      },
    };

    const current = rawData[timeRangeRevenue] || { labels: [], data: [] };
    const finalData = Array.isArray(current.data)
      ? current.data.map((x) => x * (timeRangeRevenue === 'week' ? 1000000 : 1))
      : [];

    setRevenueData({
      labels: current.labels,
      datasets: [
        {
          label: 'Doanh thu (VND)',
          data: finalData,
          borderColor: '#10B981',
          backgroundColor: '#6EE7B7',
          pointRadius: 5,
          pointHoverRadius: 7,
        },
      ],
    });
  }, [timeRangeRevenue]);

  return (
    <div className="p-6 min-h-screen text-white">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-black">Dashboard</h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        <Card
          title="Đặt bàn hôm nay"
          value="35"
          growth="+12%"
          color="bg-gradient-to-tr from-blue-500 to-purple-600"
          icon="🗓️"
        />
        <Card
          title="Đang chờ xác nhận"
          value="8"
          growth="-5%"
          color="bg-gradient-to-tr from-red-500 to-pink-500"
          icon="⏳"
        />
        <Card
          title="Hoàn tất"
          value="27"
          growth="+7%"
          color="bg-gradient-to-tr from-emerald-500 to-green-400"
          icon="✅"
        />
        <Card
          title="Bị huỷ"
          value="3"
          growth="+1%"
          color="bg-gradient-to-tr from-orange-500 to-yellow-500"
          icon="❌"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Booking Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-xl text-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Thống kê đặt lịch</h3>
              <p className="text-sm text-slate-500">
                Tăng <span className="text-green-600 font-bold">4%</span> so với
                tuần trước
              </p>
            </div>
            <select
              value={timeRangeBooking}
              onChange={(e) => setTimeRangeBooking(e.target.value)}
              className="text-sm px-3 py-1.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
            >
              <option value="day">Hôm nay</option>
              <option value="week">Tuần</option>
              <option value="month">Tháng</option>
            </select>
          </div>
          <Line data={bookingData} options={chartOptions('')} />
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-xl text-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Doanh thu</h3>
              <p className="text-sm text-slate-500">
                Tăng <span className="text-green-600 font-bold">8%</span> so với
                tháng trước
              </p>
            </div>
            <select
              value={timeRangeRevenue}
              onChange={(e) => setTimeRangeRevenue(e.target.value)}
              className="text-sm px-3 py-1.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
            >
              <option value="day">Hôm nay</option>
              <option value="week">Tuần</option>
              <option value="month">Tháng</option>
            </select>
          </div>
          <Line data={revenueData} options={chartOptions('')} />
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, value, growth, color, icon }) => (
  <div className="bg-white text-slate-800 rounded-2xl p-4 shadow-xl flex items-center">
    <div
      className={`w-12 h-12 flex items-center justify-center rounded-full text-white mr-4 text-xl ${color}`}
    >
      {icon}
    </div>
    <div>
      <p className="text-sm text-slate-500">{title}</p>
      <h4 className="text-xl font-bold">{value}</h4>
      <p
        className={`text-sm font-semibold ${growth.includes('-') ? 'text-red-500' : 'text-green-500'}`}
      >
        {growth} so với hôm qua
      </p>
    </div>
  </div>
);

export default StaffDashboard;
