'use client';

import React, { useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
);

const monthlyData = [
  { month: 'Tháng 1', revenue: 25000000, online: 10, walkin: 15 },
  { month: 'Tháng 2', revenue: 46000000, online: 20, walkin: 26 },
  { month: 'Tháng 3', revenue: 30000000, online: 12, walkin: 18 },
  { month: 'Tháng 4', revenue: 40000000, online: 17, walkin: 23 },
  { month: 'Tháng 5', revenue: 35000000, online: 14, walkin: 21 },
  { month: 'Tháng 6', revenue: 42000000, online: 18, walkin: 24 },
  { month: 'Tháng 7', revenue: 38000000, online: 16, walkin: 22 },
  { month: 'Tháng 8', revenue: 45000000, online: 19, walkin: 26 },
  { month: 'Tháng 9', revenue: 47000000, online: 21, walkin: 26 },
  { month: 'Tháng 10', revenue: 50000000, online: 25, walkin: 25 },
  { month: 'Tháng 11', revenue: 52000000, online: 28, walkin: 24 },
  { month: 'Tháng 12', revenue: 55000000, online: 30, walkin: 25 },
];

const reportManager = () => {
  const [showTable, setShowTable] = useState(false);
  const [chartType, setChartType] = useState('revenue');

  const totalOnline = monthlyData.reduce((sum, item) => sum + item.online, 0);
  const totalWalkin = monthlyData.reduce((sum, item) => sum + item.walkin, 0);

  const revenueChartData = {
    labels: monthlyData.map((item) => item.month),
    datasets: [
      {
        label: 'Doanh Thu (VND)',
        data: monthlyData.map((item) => item.revenue),
        backgroundColor: '#f7ce00',
      },
    ],
  };

  const bookingChartData = {
    labels: monthlyData.map((item) => item.month),
    datasets: [
      {
        label: 'Online',
        data: monthlyData.map((item) => item.online),
        backgroundColor: '#3ed6dd',
      },
      {
        label: 'Walk-in',
        data: monthlyData.map((item) => item.walkin),
        backgroundColor: '#f7ce00',
      },
    ],
  };

  const doughnutData = {
    labels: ['Online', 'Walk-in'],
    datasets: [
      {
        label: 'Lượt Đặt Bàn',
        data: [totalOnline, totalWalkin],
        backgroundColor: ['#3ed6dd', '#f7ce00'],
        hoverOffset: 10,
      },
    ],
  };

  return (
    <div className="p-6 flex flex-col md:flex-row gap-10">
      {/* Biểu đồ bên trái */}
      <div className="md:w-1/2 flex flex-col gap-6">
        <h2 className="text-[30px] font-semibold mb-4">
          Doanh Thu Và Đặt Bàn Theo Tháng
        </h2>
        {/* Nút chuyển biểu đồ */}
        <div className="text-center">
          <button
            onClick={() =>
              setChartType((prev) =>
                prev === 'revenue' ? 'booking' : 'revenue',
              )
            }
            className="mb-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-yellow-500"
          >
            {chartType === 'revenue' ? 'Xem Lượng Đặt Bàn' : 'Xem Doanh Thu'}
          </button>
        </div>

        <div>
          <h2 className="text-md font-semibold text-center mb-2">
            {chartType === 'revenue'
              ? 'Doanh Thu Theo Tháng'
              : 'Lượt Đặt Bàn Theo Tháng'}
          </h2>
          <Bar
            data={chartType === 'revenue' ? revenueChartData : bookingChartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value) =>
                      chartType === 'revenue'
                        ? value.toLocaleString('vi-VN') + ' VND'
                        : value,
                  },
                },
              },
            }}
          />
        </div>

        {/* Nút Xem thêm */}
        <div className="text-center">
          <button
            onClick={() => setShowTable(!showTable)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-yellow-500"
          >
            {showTable ? 'Ẩn bảng dữ liệu' : 'Xem thêm'}
          </button>
        </div>

        {/* Bảng dữ liệu chi tiết */}
        {showTable && (
          <table className="w-full mt-4 text-left border">
            <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="p-2 border">Tháng</th>
              <th className="p-2 border">Doanh Thu (VND)</th>
              <th className="p-2 border">Online</th>
              <th className="p-2 border">Walk-in</th>
            </tr>
            </thead>
            <tbody>
            {monthlyData.map((item, index) => (
              <tr key={index}>
                <td className="p-2 border">{item.month}</td>
                <td className="p-2 border">
                  {item.revenue.toLocaleString('vi-VN')} VND
                </td>
                <td className="p-2 border">{item.online}</td>
                <td className="p-2 border">{item.walkin}</td>
              </tr>
            ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Biểu đồ tròn bên phải */}
      <div className="md:w-1/2 flex flex-col items-center">
        <h2 className="text-md font-semibold text-center mb-2">
          Tổng Lượt Đặt Bàn
        </h2>
        <div className="w-64">
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </div>
  );
};

export default reportManager;
