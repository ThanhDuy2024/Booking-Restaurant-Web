'use client';
import React, { useEffect, useState } from 'react';
import SearchBar from '@/components/common/SearchBar';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuery } from '@/redux/slices/manager/categorySlice';

import CreateFoodForm from '@/components/manager/Form/CreateFoodForm';
import UpdateFoodForm from '@/components/manager/Form/UpdateFoodForm';
import { selectFood } from '@/redux/slices/manager/foodSlice';

const MenuManager = () => {
  const [openCategory, setOpenCategory] = useState(null);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const dispatch = useDispatch();

  const { foods, query, loading, error, pagination, selectedFood } = useSelector(state => state.admin_food);
  const { items } = useSelector(state => state.admin_category);

  const handleSearch = (keyword) => {
    dispatch(updateQuery({ search: keyword }));
  };

  useEffect(() => {
    dispatch({ type: 'admin_food/fetchFood' });
    dispatch({ type: 'admin_category/fetchCategory' });
  }, [query, dispatch]);

  // useEffect(() => {
  //   Object.entries(foods).forEach(([key, value]) => {
  //     if (key === 'foods' && Array.isArray(value)) {
  //       console.log('Danh sách món ăn:', value);
  //     }
  //   });
  //
  // }, [foods]);

  return (
    <main>
      <section>
        <div className="max-w-[1480px] w-full px-5 mx-auto py-0 font-sans">
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
            {items.map((category) => (
              <div key={category._id} className="bg-white rounded  shadow">
                <div
                  className="flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setOpenCategory(openCategory === category._id ? null : category._id);
                    console.log(category._id);
                  }
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
                    {foods['foods']
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
                            <button
                              className="bg-yellow-200 text-yellow-700 hover:bg-yellow-500 hover:text-white px-3 py-1 rounded text-sm transition"
                            onClick={() => {
                              setOpenModalUpdate(true);
                              dispatch(selectFood(item._id));
                            }}>
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
