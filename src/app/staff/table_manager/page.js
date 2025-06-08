'use client';

import React, { useState, useEffect } from 'react';
import {
  FaChair,
  FaRegCheckCircle,
  FaConciergeBell,
  FaMoneyBillWave,
} from 'react-icons/fa';
import TotalFood from '@/components/common/totalFood';
import SearchBar from '@/components/common/SearchBar';

const mockTables = [
  {
    id: 1,
    name: 'Bàn 1',
    status: 'empty',
    customerName: '',
    dateTime: '',
  },
  {
    id: 2,
    name: 'Bàn 2',
    status: 'reserved',
    customerName: 'Trần Thị B',
    dateTime: '2025-06-05T19:00:00',
  },
  {
    id: 3,
    name: 'Bàn 3',
    status: 'occupied',
    customerName: 'Lê Văn C',
    dateTime: '2025-06-05T18:45:00',
  },
  {
    id: 4,
    name: 'Bàn 4',
    status: 'paying',
    customerName: 'Phạm Thị D',
    dateTime: '2025-06-05T18:30:00',
  },
  {
    id: 5,
    name: 'Bàn 5',
    status: 'paying',
    customerName: 'Phạm Thị D',
    dateTime: '2025-06-05T18:30:00',
  },
  {
    id: 6,
    name: 'Bàn 6',
    status: 'paying',
    customerName: 'Phạm Thị D',
    dateTime: '2025-06-05T18:30:00',
  },
  {
    id: 7,
    name: 'Bàn 7',
    status: 'paying',
    customerName: 'Phạm Thị D',
    dateTime: '2025-06-05T18:30:00',
  },
  {
    id: 8,
    name: 'Bàn 8',
    status: 'paying',
    customerName: 'Phạm Thị D',
    dateTime: '2025-06-05T18:30:00',
  },
  {
    id: 9,
    name: 'Bàn 9',
    status: 'paying',
    customerName: 'Phạm Thị D',
    dateTime: '2025-06-05T18:30:00',
  },
];

const mockOrders = {
  2: [
    { id: 1, name: 'Phở bò', quantity: 2, price: 50000 },
    { id: 2, name: 'Trà đá', quantity: 2, price: 10000 },
  ],
  3: [
    { id: 3, name: 'Bún chả', quantity: 1, price: 45000 },
    { id: 4, name: 'Nước cam', quantity: 2, price: 20000 },
  ],
  4: [
    { id: 5, name: 'Cơm tấm', quantity: 3, price: 40000 },
    { id: 6, name: 'Nước ngọt', quantity: 3, price: 15000 },
  ],
  5: [
    { id: 5, name: 'Cơm tấm', quantity: 3, price: 40000 },
    { id: 6, name: 'Nước ngọt', quantity: 3, price: 15000 },
  ],
  6: [
    { id: 5, name: 'Cơm tấm', quantity: 3, price: 40000 },
    { id: 6, name: 'Nước ngọt', quantity: 3, price: 15000 },
  ],
  7: [
    { id: 5, name: 'Cơm tấm', quantity: 3, price: 40000 },
    { id: 6, name: 'Nước ngọt', quantity: 3, price: 15000 },
  ],
  8: [
    { id: 5, name: 'Cơm tấm', quantity: 3, price: 40000 },
    { id: 6, name: 'Nước ngọt', quantity: 3, price: 15000 },
  ],
  9: [
    { id: 5, name: 'Cơm tấm', quantity: 3, price: 40000 },
    { id: 6, name: 'Nước ngọt', quantity: 3, price: 15000 },
  ],
};

const statusStyles = {
  empty: ' bg-blue-200 text-blue-800',
  reserved: 'bg-green-200 text-green-800',
  occupied: 'bg-yellow-200 text-yellow-800',
  paying: 'bg-red-200 text-red-800',
};

const statusLabels = {
  empty: 'Trống',
  reserved: 'Đã đặt',
  occupied: 'Đang phục vụ',
  paying: 'Đang thanh toán',
};

const statusIcons = {
  empty: <FaChair size={28} />,
  reserved: <FaRegCheckCircle size={28} />,
  occupied: <FaConciergeBell size={28} />,
  paying: <FaMoneyBillWave size={28} />,
};

const formatTime = (datetime) => {
  const date = new Date(datetime);
  return `${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
};

const TableManagerPage = () => {
  const [tables, setTables] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedTable, setSelectedTable] = useState(null);

  useEffect(() => {
    setTables(mockTables);
  }, []);
  const handleSearch = (keyword) => {
    dispatch(updateQuery({ search: keyword }));
  };

  const filteredTables = tables.filter((table) =>
    table.name.toLowerCase().includes(search.toLowerCase())
  );

  const openModal = (table) => {
    if (table.status === 'empty') return;
    setSelectedTable(table);
  };

  const closeModal = () => setSelectedTable(null);

  const orders = selectedTable ? mockOrders[selectedTable.id] || [] : [];

  const totalAmount = orders.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const getStatusLabel = (status) => {
    return statusLabels[status] || 'Không rõ';
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800">
        Quản lý bàn nhà hàng
      </h2>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-2 mt-6 sm:grid-cols-4 lg:grid-cols-8 gap-6">
        {filteredTables.length === 0 && (
          <p className="text-center text-gray-400 col-span-full">
            Không tìm thấy bàn nào.
          </p>
        )}

        {filteredTables.map((table) => (
          <div
            key={table.id}
            onClick={() => openModal(table)}
            className={`aspect-square w-full p-4 rounded-2xl shadow-md flex flex-col items-center justify-center gap-2 cursor-pointer
                        transform transition duration-300 hover:scale-105 
                        ${statusStyles[table.status]} 
                        ${table.status === 'empty' ? 'cursor-not-allowed opacity-50' : ''}`}
            title={getStatusLabel(table.status)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') openModal(table);
            }}
          >
            <div>{statusIcons[table.status]}</div>
            <h3 className="text-lg font-semibold">{table.name}</h3>
            <p className="text-sm font-medium">
              {getStatusLabel(table.status)}
            </p>

            {/* Thông tin khách hàng nếu không phải bàn trống */}
            {table.status !== 'empty' && (
              <div className="text-xs text-center mt-1 leading-tight">
                <p>{formatTime(table.dateTime)}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedTable && (
        <TotalFood
          selectedTable={{
            ...selectedTable,
            closeModal,
            status: getStatusLabel(selectedTable.status),
          }}
          orders={orders}
          totalAmount={totalAmount}
        />
      )}
    </div>
  );
};

export default TableManagerPage;
