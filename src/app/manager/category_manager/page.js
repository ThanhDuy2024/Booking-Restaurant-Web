'use client';

import SearchBar from '@/components/common/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectCategory, updateQuery } from '@/redux/slices/manager/categorySlice';
import Pagination from '@/components/common/Pagination';
import CategoryCreateForm from '@/components/manager/Form/CreateCategoryForm';
import CategoryUpdateForm from '@/components/manager/Form/UpdateCategoryForm';
import Spinner from '@/components/common/loading/Spinner';
import { BsX, BsXCircle } from 'react-icons/bs';

export default function CategoryManage() {
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const dispatch = useDispatch();
  const { items, query, loading, error, pagination, selectedItem } = useSelector(state => state.admin_category);

  useEffect(() => {
    dispatch({ type: 'admin_category/fetchCategory' });
  }, [query, dispatch]);


  const handleSearch = (keyword) => {
    dispatch(updateQuery({ search: keyword }));
  };

  const handleClickRow = (item) => {
    dispatch(selectCategory(item._id));
    setOpenModalUpdate(true);
  };

  const handleRemoveItem = (id) => {
    dispatch({ type: 'admin_category/deleteCategory', payload: id });
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
      {loading && <Spinner type="PacmanLoader" color="#000000" size={60} delay={2000} />}
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
          {items && items.length > 0 ? (
              items.map((item) => (
                <tr
                  key={item._id}

                  className="border-y hover:bg-gradient-to-r from-violet-200 to-amber-200 transition duration-1000 cursor-pointer ">
                  <td className="px-6 py-4 flex items-center gap-4" onClick={() => handleClickRow(item)}>
                    <img className={`w-10 h-10 rounded-2xl`} src={item.avatar} alt="" />
                    {item.name}
                  </td>
                  <td className="px-6 py-3">
                    <div className={'flex flex-row justify-between items-center'}>
                      {item.status === 'active' ? 'Đang hoạt động ✔️' : 'Đã khóa ❌'}
                      <button type={'button'} onClick={() => handleRemoveItem(item._id)}>
                        <BsXCircle size={20} />
                      </button>
                    </div>
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
          totalPages={pagination.pages}
          onPageChange={(newPage) => {
            dispatch(updateQuery({ page: newPage }));
          }}
        />

      </div>
      <CategoryCreateForm open={openModalCreate} onClose={setOpenModalCreate} />
      {openModalUpdate && selectedItem && (
        <CategoryUpdateForm
          open={openModalUpdate}
          onClose={setOpenModalUpdate}
          item={selectedItem}
        />
      )}
    </div>

  );
}