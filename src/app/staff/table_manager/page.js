'use client';

import React, { useState, useEffect } from 'react';
import {
  FaChair,
  FaConciergeBell,
  FaMoneyBillWave,
} from 'react-icons/fa';
import SearchBar from '@/components/common/SearchBar';
import { updateQuery } from '@/redux/slices/staff/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getTodayDateString } from '@/lib/utils';
import { openModal } from '@/redux/slices/modalSlice';

const formatTime = (datetime) => {
  const date = new Date(datetime);
  return `${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
};

const status = [
  { type: 'empty', label: 'Trống', icon: <FaChair size={28} />, style: 'bg-blue-200 text-blue-800' },
  { type: 'inital', label: 'Đang phục vụ', icon: <FaConciergeBell size={28} />, style: 'bg-green-200 text-green-800' },
  { type: 'complete', label: 'Đã thanh toán', icon: <FaMoneyBillWave size={28} />, style: 'bg-red-200 text-red-800' },
];

const TableManagerPage = () => {
  const dispatch = useDispatch();
  const { orderList } = useSelector((state) => state.staff_order);
  const [localOrders, setLocalOrders] = useState([]);
  useEffect(() => {
    const today = getTodayDateString();
    dispatch(updateQuery({ date: today }));
    dispatch({ type: 'staff_order/fetchOrder' });
  }, [dispatch]);


  useEffect(() => {
    setLocalOrders(orderList);

    const timeouts = [];

    orderList.forEach((order) => {
      if (order.status === 'complete') {
        const timeout = setTimeout(() => {
          setLocalOrders((prev) =>
            prev.filter(o => o._id !== order._id)
          );
        }, 10000);
        timeouts.push(timeout);
      }
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [orderList]);

  const totalTable = 40;
  const tables = Array.from({ length: totalTable }, (_, i) => {
    const tableId = i + 1;
    const matchedOrder = localOrders.find(order => Number(order.tableNumber) === tableId);

    return {
      id: tableId,
      name: `${tableId}`,
      status: matchedOrder ? matchedOrder.status : 'empty',
      dateTime: matchedOrder?.createdAt || null,
    };
  });

  const getStatusInfo = (type) => status.find((s) => s.type === type) || {};

  const handleSearch = (keyword) => {
    dispatch(updateQuery({ search: keyword }));
  };
  return (
    <div className="p-8 bg-white rounded-2xl shadow-md  min-h-screen font-sans">
      <SearchBar onSearch={handleSearch} />

      <div className="grid grid-cols-2 mt-6 sm:grid-cols-4 lg:grid-cols-8 gap-6">
        {tables.length === 0 && (
          <p className="text-center text-gray-400 col-span-full">
            Không tìm thấy bàn nào.
          </p>
        )}

        {tables.map((table) => {
          const { icon, label, style } = getStatusInfo(table.status);

          return (
            <div
              key={table.id}
              onClick={() =>
                table.status === "empty"
                  ? dispatch(openModal({name: 'createOrder', data: {tableNumber: table.name}}))
                  : dispatch(openModal({name: 'updateOrder', data: localOrders.find(order => Number(order.tableNumber) === table.id)}))
              }
              className={`aspect-square w-full p-4 rounded-2xl shadow-md flex flex-col items-center justify-center gap-2 transform transition duration-300 hover:scale-105 ${style} ${table.status === 'empty' ? 'opacity-50' : 'cursor-pointer'}`}
              title={label}
              role="button"
              tabIndex={0}
            >
              <div>{icon}</div>
              <h3 className="text-lg font-semibold">{table.name}</h3>
              <p className="text-sm font-medium">{label}</p>
              {table.status !== 'empty' && table.dateTime && (
                <div className="text-xs text-center mt-1 leading-tight">
                  <p>{formatTime(table.dateTime)}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TableManagerPage;
