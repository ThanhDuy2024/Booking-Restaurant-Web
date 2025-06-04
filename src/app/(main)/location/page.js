'use client';
import React from 'react';
export default function LocationPage() {
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
            {/* Branch 1 */}
            <div className="bg-white shadow-md rounded-2xl overflow-hidden">
              <img
                src="/images/branch1.jpg"
                alt="Chi nhánh 1"
                className="w-full h-52 object-cover"
              />
              <div className="p-5">
                <h4 className="text-xl font-semibold mb-2">Chi nhánh Quận 1</h4>
                <p className="text-gray-600">
                  123 Lê Lợi, Phường Bến Thành, Quận 1, TP.HCM
                </p>
                <p className="text-gray-600">Điện thoại: 0901 234 567</p>
              </div>
            </div>

            {/* Branch 2 */}
            <div className="bg-white shadow-md rounded-2xl overflow-hidden">
              <img
                src="/images/branch2.jpg"
                alt="Chi nhánh 2"
                className="w-full h-52 object-cover"
              />
              <div className="p-5">
                <h4 className="text-xl font-semibold mb-2">Chi nhánh Quận 7</h4>
                <p className="text-gray-600">
                  456 Nguyễn Văn Linh, Quận 7, TP.HCM
                </p>
                <p className="text-gray-600">Điện thoại: 0902 345 678</p>
              </div>
            </div>

            {/* Branch 3 */}
            <div className="bg-white shadow-md rounded-2xl overflow-hidden">
              <img
                src="/images/branch3.jpg"
                alt="Chi nhánh 3"
                className="w-full h-52 object-cover"
              />
              <div className="p-5">
                <h4 className="text-xl font-semibold mb-2">Chi nhánh Hà Nội</h4>
                <p className="text-gray-600">
                  789 Trần Duy Hưng, Cầu Giấy, Hà Nội
                </p>
                <p className="text-gray-600">Điện thoại: 0903 456 789</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
