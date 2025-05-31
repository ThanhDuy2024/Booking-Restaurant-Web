import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  return (
    <header className="py-5 md:py-8 sticky top-0 z-40 bg-yellow-400 shadow-2xl">
      <div className="max-w[1480px] w-full px-5 mx-auto py-0 ">
        <div className="flex items-center justify-between">
          <div href="/" className="w-[80px] lg:w-[130px] block flex-shrink-0">
            <img
              onClick={() => {
                router.push('/');
              }}
              className="block max-w-full object-cover"
              src="/fonts/images/logo.webp"
              alt="Darion"
            />
          </div>
          <div className="lg:flex hidden relative items-center  border-2 border-black  w-[400px] rounded-full mx-5">
            <img
              className="  block max-w-full object-cover size-5 absolute left-3"
              src="/fonts/icons/ico_search.png"
              alt="Search"
            />
            <input
              type="text"
              placeholder="Search"
              className=" py-2 px-4 pl-10 w-full placeholder:text-gray-300 focus:outline-0 rounded-full"
            />
          </div>
          <nav className="flex items-center  lg:gap-10 xl:gap-28 ">
            <ul className="lg:flex hidden items-center gap-6">
              <li>
                <Link
                  href="/"
                  className="relative after:absolute after:h-[1.5px] after:bg-black after:left-0 after:bottom-[-2px] hover:after:scale-x-100 after:scale-x-0 after:w-full after:transition-all after:duration-300"
                >
                  Trang Chủ
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="relative after:absolute after:h-[1.5px] after:bg-black after:left-0 after:bottom-[-2px] hover:after:scale-x-100 after:scale-x-0 after:w-full after:transition-all after:duration-300"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  href="location"
                  className="relative after:absolute after:h-[1.5px] after:bg-black after:left-0 after:bottom-[-2px] hover:after:scale-x-100 after:scale-x-0 after:w-full after:transition-all after:duration-300"
                >
                  Chi Nhánh
                </Link>
              </li>
              <li>
                <Link
                  href="news"
                  className="relative after:absolute after:h-[1.5px] after:bg-black after:left-0 after:bottom-[-2px] hover:after:scale-x-100 after:scale-x-0 after:w-full after:transition-all after:duration-300"
                >
                  Liên Hệ
                </Link>
              </li>
              <hr />
              <li>
                <button
                  href="#"
                  className="relative bg-black text-white rounded-full w-[120px] py-2 overflow-hidden transition duration-300 ease-in-out hover:bg-white hover:text-black  shadow-md hover:shadow-lg"
                >
                  Đặt Bàn
                </button>
              </li>
            </ul>
          </nav>
          <button
            type="button"
            className="lg:hidden block"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <img
              src="/fonts/icons/nav menu.png"
              alt="Menu"
              className="w-6 h-6"
            />
          </button>
          {isMobileMenuOpen && (
            <>
              {/* Overlay */}
              <div
                className="fixed inset-0 bg-black bg-opacity-40 z-30"
                onClick={() => setIsMobileMenuOpen(false)}
              ></div>

              {/* Sidebar */}
              <div className=" fixed top-0 left-0 w-64 h-full bg-gray-900 text-white z-40 p-6 space-y-6 shadow-lg  ">
                <ul className="divide-y divide-gray-600 space-y-4">
                  <li>
                    <Link
                      href="/"
                      className="block hover:text-yellow-300 text-lg  "
                    >
                      Trang Chủ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/menu"
                      className="block hover:text-yellow-300 text-lg  "
                    >
                      Menu
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/location"
                      className="block hover:text-yellow-300 text-lg "
                    >
                      Chi Nhánh
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/news"
                      className="block hover:text-yellow-300 text-lg "
                    >
                      Liên Hệ
                    </Link>
                  </li>
                </ul>
                <button className="w-full bg-yellow-400 hover:bg-white text-black font-semibold py-2  transition border-2 border-collapse">
                  Đặt Bàn
                </button>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute  mx-3 py-1 text-xs px-2 -top-0 right-0 bg-black text-white rounded-xl border-2 border-collapse"
                >
                  ✕
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
