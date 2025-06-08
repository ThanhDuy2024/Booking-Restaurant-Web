'use client';
import React from 'react';

export default function TotalFood({ selectedTable, orders, totalAmount }) {
  if (!selectedTable) return null;

  const formattedDate = selectedTable.dateTime
    ? new Date(selectedTable.dateTime).toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : 'Không rõ thời gian';

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={selectedTable.closeModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white rounded-xl max-w-lg w-full shadow-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={selectedTable.closeModal}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl font-bold transition"
          aria-label="Đóng modal"
        >
          &times;
        </button>

        {/* Tiêu đề modal */}
        <h3 id="modal-title" className="text-2xl font-bold mb-2 text-gray-900">
          {selectedTable.name} -{' '}
          <span className="capitalize">{selectedTable.status}</span>
        </h3>

        <p className="text-gray-700 mb-4">
          <strong>Ngày giờ đặt:</strong> {formattedDate}
        </p>

        {/* Danh sách món */}
        {orders.length === 0 ? (
          <p className="text-gray-600 text-center py-8 text-lg">
            Bàn chưa có món đặt.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-indigo-100 text-indigo-700 font-semibold">
                  <th className="py-3 px-4 border border-indigo-200 text-left">
                    Tên món
                  </th>
                  <th className="py-3 px-4 border border-indigo-200 text-center">
                    Số lượng
                  </th>
                  <th className="py-3 px-4 border border-indigo-200 text-right">
                    Đơn giá (VND)
                  </th>
                  <th className="py-3 px-4 border border-indigo-200 text-right">
                    Thành tiền (VND)
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item) => (
                  <tr key={item.id} className="odd:bg-gray-50 even:bg-white">
                    <td className="py-3 px-4 border border-indigo-200">
                      {item.name}
                    </td>
                    <td className="py-3 px-4 border border-indigo-200 text-center">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-4 border border-indigo-200 text-right">
                      {item.price.toLocaleString('vi-VN')}
                    </td>
                    <td className="py-3 px-4 border border-indigo-200 text-right">
                      {(item.price * item.quantity).toLocaleString('vi-VN')}
                    </td>
                  </tr>
                ))}
                <tr className="bg-indigo-200 font-semibold">
                  <td
                    colSpan={3}
                    className="py-3 px-4 border border-indigo-200 text-right"
                  >
                    Tổng cộng:
                  </td>
                  <td className="py-3 px-4 border border-indigo-200 text-right">
                    {totalAmount.toLocaleString('vi-VN')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
