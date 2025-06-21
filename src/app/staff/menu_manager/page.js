'use client';
import React, { useState } from 'react';
import SearchBar from '@/components/common/SearchBar';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useSelector } from 'react-redux';

const MenuManager = () => {
  const [openCategory, setOpenCategory] = useState(null);
  const { foods } = useSelector(state => state.client_food);
  const { category } = useSelector(state => state.client_category);


  return (
    <main>
      <section>
        <div className="max-w-[1480px] w-full px-5 mx-auto py-0 font-sans">
          <h2 className="text-3xl font-extrabold mb-6 text-gray-800 flex items-center gap-7">
            {/*<SearchBar onSearch={handleSearch} />*/}
            Thực Đơn Món Ăn Nhà Hàng
          </h2>

          <div className="mt-12">
            {category.map((category) => (
              <div key={category._id} className="bg-white rounded  shadow">
                <div
                  className="flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-gray-100"
                  onClick={() =>
                    setOpenCategory(openCategory === category._id ? null : category._id)
                  }
                >
                  <span className="font-semibold text-gray-800">
                    {category.name}
                  </span>
                  {openCategory === category._id ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>

                {openCategory === category._id && (
                  <ul className="px-6 pb-4 space-y-3">
                    {foods
                      .filter(item => item.categoryId === category._id)
                      .map((item) => {
                      return (
                        <li
                          key={item._id}
                          className="flex items-center justify-between px-4 py-2 rounded-md shadow-sm bg-gray-50"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item.avatar}
                              alt='error'
                              className="w-12 h-12 object-cover rounded-full"
                            />
                            <div>
                              <span className="text-gray-800 font-medium block">
                                {item.name}
                              </span>
                              <span className="text-gray-500 text-sm">
                                {item.priceFormat} ₫
                              </span>
                            </div>
                          </div>
                          <button
                            className="bg-yellow-200 text-yellow-700 hover:bg-yellow-500 hover:text-white px-3 py-1 rounded text-sm transition">
                            Chỉnh sửa
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default MenuManager;
