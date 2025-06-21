'use client';

import React from 'react';
import { useSelector } from 'react-redux';

export default function LocationPage() {

  const { branches } = useSelector(state => state.client_branch);

  return (
    <main>
      {/* Banner */}
      <section className="relative">
        <img
          src="/images/banner2.jpg"
          alt="Banner"
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
            Tận hưởng không gian ấm cúng cùng món ăn đậm vị
          </h2>
          <p className="text-white text-lg md:text-xl drop-shadow-sm">
            ☎ <strong>0901 234 567</strong>
          </p>
        </div>
      </section>

      {/* Branches Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1280px] w-full px-5 mx-auto">
          <h3 className="text-3xl font-bold mb-10 text-center text-gray-800">
            Chi nhánh nhà hàng
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {branches.map((item) => (
              <div className="bg-white shadow-md rounded-2xl overflow-hidden" key={item._id}>
                <img
                  src={item.avatar}
                  alt="error"
                  className="w-full h-52 object-cover"
                />
                <div className="p-5">
                  <h4 className="text-xl font-semibold mb-2">{item.name}</h4>
                  <p className="text-gray-600">
                    {item.address}
                  </p>
                  <p className="text-gray-600">Điện thoại: {item.phone}</p>
                </div>
              </div>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
