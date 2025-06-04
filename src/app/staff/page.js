'use client';

import React from 'react';
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

// Dữ liệu biểu đồ lượt đặt bàn
const chartData = {
  labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
  datasets: [
    {
      label: 'Lượt khách đặt bàn',
      data: [10, 15, 8, 12, 20, 18, 14],
      borderColor: '#4F46E5',
      backgroundColor: '#6366F1',
      pointStyle: 'circle',
      pointRadius: 5,
      pointHoverRadius: 7,
    },
  ],
};

// Dữ liệu biểu đồ doanh thu
const doanhThuData = {
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
  datasets: [
    {
      label: 'Doanh thu (VND)',
      data: [
        15000000, 12000000, 18000000, 20000000, 25000000, 27000000, 30000000,
        32000000, 31000000, 29000000, 26000000, 28000000,
      ],
      borderColor: '#10B981',
      backgroundColor: '#6EE7B7',
      pointStyle: 'circle',
      pointRadius: 5,
      pointHoverRadius: 7,
    },
  ],
};

// Cấu hình biểu đồ dùng chung
const chartOptions = (title) => ({
  responsive: true,
  plugins: {
    title: {
      display: true,
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
  return (
    <div className="p-6 bg-yellow-500 min-h-screen text-white">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-sm">Trang quản lý đặt lịch nhà hàng</p>
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

      {/* Biểu đồ đặt lịch & banner */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl p-6 shadow-xl text-slate-800">
          <h3 className="text-lg font-semibold mb-2">Thống kê đặt lịch</h3>
          <p className="text-sm text-slate-500 mb-4">
            Tăng <span className="text-green-600 font-bold">4%</span> so với
            tuần trước
          </p>
          <Line
            data={chartData}
            options={chartOptions('Biểu đồ lượt đặt bàn')}
          />
        </div>

        <div className="relative h-40 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-tr from-slate-900 to-slate-700 flex items-center justify-center">
          <h4 className="text-xl text-white font-semibold">
            Xin chào, chúc bạn làm việc hiệu quả! 🎉
          </h4>
        </div>
      </div>

      {/* Biểu đồ doanh thu */}
      <div className="bg-white rounded-2xl p-6 shadow-xl text-slate-800">
        <h3 className="text-lg font-semibold mb-2">Doanh thu </h3>
        <p className="text-sm text-slate-500 mb-4">
          Tăng <span className="text-green-600 font-bold">8%</span> so với tháng
          trước
        </p>
        <Line
          data={doanhThuData}
          options={chartOptions('Biểu đồ doanh thu theo tháng')}
        />
      </div>
    </div>
  );
};

// Component thẻ thống kê
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
