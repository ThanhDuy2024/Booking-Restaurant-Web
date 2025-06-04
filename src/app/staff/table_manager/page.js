'use client';

import React from 'react';

const tables = [
  { name: 'Bàn 1', type: 'VIP', seats: 4, status: 'Đã đặt' },
  { name: 'Bàn 2', type: 'Thường', seats: 2, status: 'Còn trống' },
  { name: 'Bàn 3', type: 'Gia đình', seats: 6, status: 'Đang phục vụ' },
  { name: 'Bàn 4', type: 'VIP', seats: 4, status: 'Còn trống' },
  { name: 'Bàn 5', type: 'Thường', seats: 2, status: 'Đã đặt' },
  { name: 'Bàn 6', type: 'Thường', seats: 2, status: 'Còn trống' },
];

const TableManagerPage = () => {
  return (
    <div className="p-6 bg-yellow-500 min-h-screen text-white">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Quản lý bàn</h2>
        <p className="text-sm">
          Theo dõi danh sách và trạng thái các bàn trong nhà hàng
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-xl text-slate-800">
        <h3 className="text-xl font-semibold mb-4">Danh sách bàn</h3>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left table-auto border-collapse">
            <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <tr>
                <th className="p-3 font-medium">STT</th>
                <th className="p-3 font-medium">Tên bàn</th>
                <th className="p-3 font-medium">Loại bàn</th>
                <th className="p-3 font-medium">Số lượng </th>
                <th className="p-3 font-medium">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-slate-700 bg-white">
              {tables.map((table, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-all">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{table.name}</td>
                  <td className="p-3">{table.type}</td>
                  <td className="p-3">{table.seats} người</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        table.status === 'Còn trống'
                          ? 'bg-green-100 text-green-700'
                          : table.status === 'Đang phục vụ'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {table.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableManagerPage;
