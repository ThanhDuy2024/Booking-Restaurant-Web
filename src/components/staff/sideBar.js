'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';

const sidebarVariants = {
  open: {
    x: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  closed: {
    x: '-100%',
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
};

export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {/* Overlay mờ */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <motion.div
        className="bg-primary text-text w-64 p-6 fixed top-0 left-0 h-full shadow-xl z-50 flex flex-col"
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <img
              className="w-14 h-14 rounded-full border-2 border-white"
              src="/images/avt1.jpg"
              alt="Avatar"
            />
            <div className="text-black">
              <p className="font-semibold text-sm leading-tight">Hoangcs</p>
              <p className="text-xs opacity-80">example@email.com</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white">
            <X size={25} />
          </button>
        </div>

        <hr className="border-white border-2 rounded-2xl  mb-4" />

        <ul className="flex flex-col gap-2 text-sm">
          {[
            { label: 'Trang chủ', icon: 'home-staff.png', href: '/manager' },
            { label: 'Lịch đặt', icon: 'schedule.png', href: '/manager/schedule' },
            { label: 'Quản lí bàn', icon: 'table02.png', href: '/manager/tables' },
            { label: 'Thực đơn', icon: 'menu.png', href: '/manager/menu' },
            { label: 'Thống kê', icon: 'report.png', href: '/manager/statistics' },
          ].map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="flex items-center gap-4 bg-white/90 text-black rounded-xl
                 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <img
                  className="w-12 h-12 object-contain"
                  src={`/icons/staff/${item.icon}`}
                  alt={item.label}
                />
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto text-center text-xs text-black pt-6">
          © 2025 Arena of Valor
        </div>
      </motion.div>
    </>
  );
}
