'use client';
import React, { useEffect, useState } from 'react';
import SearchBar from '@/components/common/SearchBar';
import { useDispatch, useSelector } from 'react-redux';

import CreateFoodForm from '@/components/manager/Form/CreateFoodForm';
import UpdateFoodForm from '@/components/manager/Form/UpdateFoodForm';

import { selectFood, updateQuery } from '@/redux/slices/manager/foodSlice';
import Pagination from '@/components/common/Pagination';

const MenuManager = () => {
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const dispatch = useDispatch();
  const { selectedFood, foods, query, pagination } = useSelector(state => state.admin_food);

  const handleSearch = (keyword) => {
    dispatch(updateQuery({ search: keyword }));
  };

  useEffect(() => {
    dispatch({ type: 'admin_food/fetchFood' });
    dispatch({ type: 'admin_category/fetchCategory' });
  }, [query, dispatch]);

  return (
    <main>
      <section>
        <div className="max-w-[1480px] w-full h-full px-5 mx-auto py-0 font-sans bg-white">
          <div className="flex items-center justify-between mb-4">

            <h2 className="text-3xl font-extrabold mb-6 text-gray-800 flex items-center gap-7">
              {/*<SearchBar onSearch={handleSearch} />*/}
              Thực Đơn Món Ăn Nhà Hàng
            </h2>
            <SearchBar onSearch={handleSearch} />
            <button onClick={() => setOpenModalCreate(true)}
                    className="flex gap-2 items-center bg-primary text-white rounded-lg hover:bg-primary-dark transition">
              <img src="/icons/manager/icon_add_color.png" alt="Add"
                   className="w-12 h-12 bg-white border-2 border-[var(--primary)] rounded-l-lg" />
              <span className={`pr-4 py-2`}>Thêm thực đơn</span>
            </button>
          </div>
          <div className="mt-12">

            <ul className="px-6 pb-4 space-y-3">
              {foods.map((item) => {
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
                                {item.price} ₫
                              </span>
                      </div>
                    </div>
                    <div className={'flex flex-row justify-between items-center gap-3'}>
                      <button
                        type={'button'}
                        className="bg-yellow-200 text-yellow-700 hover:bg-yellow-500 hover:text-white px-3 py-1 rounded text-sm transition"
                        onClick={() => {
                          setOpenModalUpdate(true);
                          dispatch(selectFood(item._id));
                          console.log('selectedFood:', selectedFood);
                        }}>
                        Chỉnh sửa
                      </button>
                      <button
                        type={'button'}
                        className="bg-yellow-200 text-yellow-700 hover:bg-yellow-500 hover:text-white px-3 py-1 rounded text-sm transition"
                        onClick={() => {
                          dispatch({ type: 'admin_food/deleteFood', payload: item._id });
                        }}>
                        Xóa
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <Pagination
            currentPage={query.page || 1}
            totalPages={pagination.pages}
            onPageChange={(newPage) => {
              dispatch(updateQuery({ page: newPage }));
            }}
          />
        </div>
        <div>
        </div>
      </section>
      <CreateFoodForm open={openModalCreate} onClose={setOpenModalCreate} />
      {openModalUpdate && selectedFood && (
        <UpdateFoodForm
          open={openModalUpdate}
          onClose={setOpenModalUpdate}
          item={selectedFood}
        />)}
    </main>
  );
};

export default MenuManager;
