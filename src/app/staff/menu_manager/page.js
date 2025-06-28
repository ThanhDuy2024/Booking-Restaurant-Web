'use client';
import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuery } from '@/redux/slices/common/foodSlice';
import Pagination from '@/components/common/Pagination';
import Spinner from '@/components/common/loading/Spinner';

const MenuManager = () => {
  const { foods, query, pagination, loading } = useSelector(state => state.client_food);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type: 'client_food/fetchFood'});
  }, [query]);
  return (
    <main>
      <section>
        <div className="max-w-[1480px] w-full px-5 mx-auto py-0 font-sans">
          <h2 className="text-3xl font-extrabold mb-6 text-gray-800 flex items-center gap-7">
            {/*<SearchBar onSearch={handleSearch} />*/}
            Thực Đơn Món Ăn Nhà Hàng
          </h2>
          {loading && <Spinner type="PacmanLoader" color="#000000" size={60} delay={2000} />}
          <div className="mt-12">
            <ul className="px-6 pb-4 space-y-3">
              {foods
                .map((item) => {
                  return (
                    <li
                      key={item._id}
                      className="flex items-center justify-between px-4 py-2 rounded-md shadow-sm bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.avatar}
                          alt="error"
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
            <Pagination
              currentPage={query.page || 1}
              totalPages={pagination.pages}
              onPageChange={(newPage) => {
                dispatch(updateQuery({ page: newPage }));
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default MenuManager;