'use client'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuery, selectStaff } from '@/redux/slices/manager/staffSlice';
import SearchBar from '@/components/common/SearchBar';
import Spinner from '@/components/common/loading/Spinner';
import Pagination from '@/components/common/Pagination';
import CreateStaffForm from '@/components/manager/Form/CreateStaffForm';
import UpdateStaffForm from '@/components/manager/Form/UpdateStaffForm';


const UserManagerPage = () => {
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const dispatch = useDispatch();
  const { staffs, query, loading, error, pagination, selectedStaff } = useSelector(state => state.admin_staff);

  useEffect(() => {
    dispatch({ type: 'admin_staff/fetchStaff' });
  }, [query, dispatch]);


  const handleSearch = (keyword) => {
    dispatch(updateQuery({ search: keyword }));
  };

  const handleClickRow = (item) => {
    dispatch(selectStaff(item._id));
    console.log('click row')
    setOpenModalUpdate(true);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Quản lý tài khoản nhân viên
        </h2>
        <SearchBar onSearch={handleSearch} />
        <button onClick={() => setOpenModalCreate(true)}
                className="flex gap-2 items-center bg-primary text-white rounded-lg hover:bg-primary-dark transition">
          <img src="/icons/manager/icon_add_color.png" alt="Add"
               className="w-12 h-12 bg-white border-2 border-[var(--primary)] rounded-l-lg" />
          <span className={`pr-4 py-2`}>Thêm tài khoản</span>
        </button>
      </div>
      {loading && <Spinner type="PacmanLoader" color="#000000" size={60} delay={2000} />}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-left bg-white">
          <thead className="bg-gray-200 text-sm text-gray-600 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Tên
            </th>
            <th scope="col" className="px-6 py-3">
              Vai trò
            </th>
            <th scope="col" className="px-6 py-3">
              Trạng thái
            </th>
          </tr>
          </thead>
          <tbody
            className="text-sm font-text text-gray-700">
          {staffs && staffs.length > 0 ? (
              staffs.map((item) => (
                <tr
                  key={item._id}
                  onClick={() => handleClickRow(item)}
                  className="w-full border-y hover:bg-gradient-to-r from-violet-200 to-amber-200 transition duration-1000 cursor-pointer ">
                  <td className="px-6 py-4 flex items-center justify-start gap-2">
                    <img className={`w-10 h-10 rounded-2xl`} src={item.avatar} alt="" />
                    {item.fullName}
                  </td>
                  <td className="px-6 py-4">
                    {item.role}
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
      <CreateStaffForm open={openModalCreate} onClose={setOpenModalCreate} />
      {openModalUpdate && selectedStaff && (
        <UpdateStaffForm
          open={openModalUpdate}
          onClose={setOpenModalUpdate}
          item={selectedStaff}
        />
      )}
    </div>
  );
};
export default UserManagerPage;