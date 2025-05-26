'use client';

import SearchBar from '@/components/common/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { updateQuery } from '@/redux/slices/manager/categorySlice';
import Pagination from '@/components/common/Pagination';
import CategoryCreateForm from '@/components/manager/Form/CreateCategoryForm';

export default function CategoryManage() {
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const dispatch = useDispatch();
  const { items, query, loading, error, pagination } = useSelector(state => state.admin_category);

  useEffect(() => {
    dispatch({ type: 'admin_category/fetchCategory' });
  }, [query, dispatch]);


  const handleSearch = (keyword) => {
    console.log('Tìm kiếm:', keyword);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Quản lý danh mục món ăn
        </h2>
        <SearchBar onSearch={handleSearch} />
        <button onClick={() => setOpenModalCreate(true)}
          className="flex gap-2 items-center bg-primary text-white rounded-lg hover:bg-primary-dark transition">
          <img src="/icons/manager/icon_add_color.png" alt="Add"
               className="w-12 h-12 bg-white border-2 border-[var(--primary)] rounded-l-lg" />
          <span className={`pr-4 py-2`}>Thêm danh mục</span>
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-left bg-white">
          <thead className="bg-gray-200 text-sm text-gray-600 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Tên danh mục
            </th>
            <th scope="col" className="px-6 py-3">
              Trạng thái
            </th>
          </tr>
          </thead>
          <tbody
            className="text-sm font-text text-gray-700">
          {items.length > 0 ? (
              items.map((item) => (
                <tr
                  key={item._id}
                  className="border-y hover:bg-gradient-to-r from-violet-200 to-amber-200 transition duration-1000 cursor-pointer ">
                  <td className="px-6 py-4 flex items-center gap-4">
                    <img className={`w-10 h-10 rounded-2xl`} src={item.avatar} alt="" />
                    {item.name}
                  </td>
                  <td className="px-6 py-3">
                    {item.status === 'active' ? 'Đang hoạt động ✔️' : 'Đã khóa ❌'}
                  </td>
                </tr>
              )))
            : (
              <tr key="no-data">
                <td colSpan={2} className="text-center py-6 text-gray-500">
                  Không có danh mục nào phù hợp
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination
          currentPage={query.page || 1}
          totalPages={5}
          onPageChange={(newPage) => {
            dispatch(updateQuery({ page: newPage }));
          }}
        />

      </div>
      <CategoryCreateForm open={openModalCreate} onClose={setOpenModalCreate} />
    </div>

  );
}