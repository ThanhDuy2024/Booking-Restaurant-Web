import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-yellow-400 py-12  ">
      <div className="max-w-[1480px] w-full px-4 mx-auto py-0 flex items-center">
        <div className="grid grid-cols-1  md:grid-cols-4 gap-8 lg:gap-24 ">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-1">
            <div>
              <h3 className="font-bold text-lg mb-4">Về Nhà Hàng</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Giới thiệu
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Liên hệ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Địa chỉ
                  </a>
                </li>
              </ul>
            </div>
            <div className="lg:hidden md:hidden">
              <h3 className="font-bold text-lg mb-4 ">Hỗ Trợ Khách Hàng</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Câu hỏi thường gặp
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Chính sách đặt bàn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Giờ mở cửa
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-2 md:flex md:flex-col md:justify-center ">
            <h3 className="font-semibold text-xl mb-4 lg:text-center">
              Sign Up For Our Newsletter To Receive Notifications And Other
              Promotions
            </h3>
            <div className="flex mt-4">
              <input
                type="email"
                placeholder="Email address..."
                className="flex-grow px-4 py-4 rounded-l-full border border-r-0 border-gray-300 focus:outline-none focus:border-black"
              />
              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded-r-full hover:bg-gray-800 transition duration-300"
              >
                Subscribe
              </button>
            </div>
            <div className="mt-12">
              <p className="text-sm text-gray-600 mb-4 md:mb-0 text-center">
                Copyright © 2024. All Right Reserved
              </p>
            </div>
          </div>
          <div className="hidden md:block">
            <h3 className="font-bold text-lg mb-4 ">Hỗ Trợ Khách Hàng</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Câu hỏi thường gặp
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Chính sách đặt bàn
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Giờ mở cửa
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
