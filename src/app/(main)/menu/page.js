'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuery } from '@/redux/slices/common/foodSlice';
import Pagination from '@/components/common/Pagination';
import SearchBar from '@/components/common/SearchBar';
import Spinner from '@/components/common/loading/Spinner';

export default function MenuPage() {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.client_category);
  const { foods, loading, error, pagination, query } = useSelector(
    (state) => state.client_food
  );
  useEffect(() => {
    dispatch({ type: 'client_category/fetchCategory' });
    dispatch({ type: 'client_food/fetchFood' });
  }, [query, dispatch]);

  const handleCategoryChange = (categoryId) => {
    dispatch(updateQuery({ categoryId: categoryId }));
  };

  return (
    <main>

      <section className="relative">
        <img src="/images/img_product_list_banner.webp" alt="Banner" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-4xl font-semibold text-white">Menu</h2>
        </div>
      </section>
      {loading && <Spinner type="PacmanLoader" color="#000000" size={60} delay={2000} />}
      <section className="pt-12 pb-12">
        <div className="max-w[1480px] w-full px-5 mx-auto py-0 ">
          <div className="lg:grid grid-cols-5 gap-6">
            {/* Danh mục */}
            <div className="col-span-1 p-4 border rounded-md shadow-sm">
              <h2 className="text-lg font-semibold my-4">Danh Mục Món Ăn</h2>
              <ul className="space-y-3">
                {category.map((item) => (
                  <li
                    key={item._id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="food-selection"
                      id={item._id}
                      value={item._id}
                      onChange={() => handleCategoryChange(item._id)}
                    />
                    <label
                      htmlFor={item.name}
                      className="select-none font-medium text-sm"
                    >
                    {item.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            {/* Món ăn */}
            <div className="col-span-4 p-4">
              {foods.length === 0 ? (
                <div className="text-center text-gray-500 text-lg py-12">
                  Không tìm thấy món ăn nào phù hợp.
                </div>
              ) : (
                <>
                  <ul className="mt-8 lg:grid grid-cols-4 gap-7 md:grid grid-rows-1 md:gap-10 ">
                    {foods.map((item) => (
                      <li
                        key={item._id}
                        className="mt-6 md:mt-0 text-center group relative border border-gray-500 rounded-2xl p-2"
                      >
                        <div className="block">
                          {item.status === 'inactive' && (
                            <span className="absolute py-1 text-xs px-2 top-3 left-3 bg-red-500 text-white rounded-xl">
                  Out of stock
                </span>
                          )}
                          <div className="rounded-xl">
                            <img
                              className="block w-full h-full object-contain aspect-[1/1] rounded-t-xl group-hover:scale-105 transition-all duration-300"
                              src={item.avatar}
                              alt={item.name}
                            />
                          </div>
                          <h3 className="text-15 mt-2 font-semibold">{item.name}</h3>
                          <div className="mt-2 relative h-5 overflow-hidden">
                            <div
                              className="absolute flex items-center flex-col left-1/2 -translate-x-1/2 hover:bottom-0 -bottom-5 transition-all duration-300">
                              <div className="flex items-center justify-center font-bold text-15 text-center">
                                {item.priceFormat} ₫
                              </div>
                              {item.status === 'active' && (
                                <a
                                  href="#"
                                  className="uppercase text-xs font-medium relative after:absolute after:bottom-0 after:w-0 after:h-[1px] after:bg-black after:left-0 hover:after:w-full after:transition-all after:duration-500"
                                >
                                  Thêm vào giỏ
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <Pagination
                    currentPage={query.page || 1}
                    totalPages={pagination.pages}
                    onPageChange={(newPage) => {
                      dispatch(updateQuery({ page: newPage }));
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
