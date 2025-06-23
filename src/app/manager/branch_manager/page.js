'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, Suspense } from 'react';
import { selectBranch, updateQuery } from '@/redux/slices/manager/branchSlice';
import React from 'react';


// Lazy load components
const SearchBar = React.lazy(() => import('@/components/common/SearchBar'));
const Pagination = React.lazy(() => import('@/components/common/Pagination'));
const BranchCreateForm = React.lazy(() => import('@/components/manager/Form/CreateBranchForm'));
const BranchUpdateForm = React.lazy(() => import('@/components/manager/Form/UpdateBranchForm'));
const Spinner = React.lazy(() => import('@/components/common/loading/Spinner'));


const BranchManagerPage = () => {
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const dispatch = useDispatch();
  const { branches, query, loading, error, pagination, selectedBranch } = useSelector(state => state.admin_branch);

  useEffect(() => {
    dispatch({ type: 'admin_branch/fetchBranch' });
  }, [query, dispatch]);


  const handleSearch = (keyword) => {
    dispatch(updateQuery({ search: keyword }));
  };

  const handleClickRow = (item) => {
    dispatch(selectBranch(item._id));
    setOpenModalUpdate(true);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Quản lý chi nhánh
          </h2>
          <SearchBar onSearch={handleSearch} />
          <button onClick={() => setOpenModalCreate(true)}
                  className="flex gap-2 items-center bg-primary text-white rounded-lg hover:bg-primary-dark transition">
            <img src="/icons/manager/icon_add_color.png" alt="Add"
                 className="w-12 h-12 bg-white border-2 border-[var(--primary)] rounded-l-lg" />
            <span className={`pr-4 py-2`}>Thêm chi nhánh</span>
          </button>
        </div>
        {loading && <Spinner type="PacmanLoader" color="#000000" size={60} delay={2000} />}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-left bg-white">
            <thead className="bg-gray-200 text-sm text-gray-600 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Tên chi nhánh
              </th>
              <th scope="col" className="px-6 py-3">
                Trạng thái
              </th>
            </tr>
            </thead>
            <tbody
              className="text-sm font-text text-gray-700">
            {branches.length > 0 ? (
                branches.map((item) => (
                  <tr
                    key={item._id}
                    onClick={() => handleClickRow(item)}
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
            totalPages={pagination.pages}
            onPageChange={(newPage) => {
              dispatch(updateQuery({ page: newPage }));
            }}
          />

        </div>
        <BranchCreateForm
          open={openModalCreate} onClose={setOpenModalCreate} />
        {openModalUpdate && selectedBranch && (
          <BranchUpdateForm
            open={openModalUpdate}
            onClose={setOpenModalUpdate}
            item={selectedBranch}
          />
        )}
      </div>
    </Suspense>
  );
};

export default BranchManagerPage;