'use client';

import { useState } from 'react';
import AppButton from '@/components/common/AppButton';
import ReusableModal from '@/components/common/modal/formModal';
import { useDispatch, useSelector } from 'react-redux';

export default function CreateStaffForm({ open, onClose }) {
  const dispatch = useDispatch();
  const branches = useSelector(state => state.client_branch.branches);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '1112',
    avatar: null,
    phone: '',
    address: '',
    status: 'active',
    role: 'staff',
    branch: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('fullName', formData.name);
    data.append('status', formData.status);
    data.append('address', formData.address);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('password', formData.password);
    data.append('branch', formData.branch);
    data.append('role', formData.role);

    if (formData.avatar) data.append('avatar', formData.avatar);

    dispatch({ type: 'admin_staff/createStaff', payload: data });
    onClose(false);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, avatar: file });
  };
  return (
    <ReusableModal
      open={open}
      onClose={onClose}
      title="Tạo tài khoản"
      description="Điền thông tin bên dưới"
      footer={<AppButton variant="contained"
                         color="primary"
                         type="submit"
                         form="category-form">
        Lưu
      </AppButton>}
    >
      <form id="category-form" onSubmit={handleSubmit} className="space-y-4">
        <div className={'w-full flex flex-row justify-between items-center gap-2'}>
          <div className={'w-1/2'}>
            <label className="block text-sm font-text mb-2">Tên nhân viên</label>
            <input
              type="text"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border rounded p-2 mb-2"
              required
            />
          </div>
          <div className={'w-1/2'}>
            <label className="block text-sm font-text mb-2">Địa chỉ</label>
            <input
              type="text"
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full border rounded p-2 mb-2"
              required
            />
          </div>
        </div>
        <div className={'w-full flex flex-row justify-between items-center gap-2'}>
          <div className={'w-1/2'}>
            <label className="block text-sm font-text mb-2">Email</label>
            <input
              type="email"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border rounded p-2 mb-2"
              required
            />
          </div>
          <div className={'w-1/2'}>
            <label className="block text-sm font-text mb-2">Số điện thoại</label>
            <input
              type="text"
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full border rounded p-2 mb-2"
              required
            />
          </div>
        </div>

        <div className={'w-full flex flex-row items-center justify-between gap-2'}>
          <div className={'w-1/2'}>
            <label className="block text-sm font-text mb-2">Vai trò</label>
            <select
              type="text"
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full border rounded p-2 mb-2"
              required
            >
              <option value={'staff'}>Nhân viên</option>
              <option value={'cashier'}>Thu ngân</option>
            </select>
          </div>
          <div className={'w-1/2'}>
            <label className={`block test-sm font-text mb-2`}>Chọn địa điểm</label>
            <select
              required={true}
              value={formData.branchId}
              onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
              className={`w-full border  rounded p-2 mb-2`}
            >
              <option value=""  defaultValue={true}>Chọn chi nhánh</option>
              {branches.map((branch) => (
                <option key={branch._id} value={branch._id}>{branch.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={'w-full flex flex-row justify-between items-center gap-2'}>
          <div className={'w-1/2'}>
            <label className="block text-sm font-text mb-2">Trạng thái</label>
            <select
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full border rounded p-2 mb-2"
            >
              <option value="active">Đang hoạt động</option>
              <option value="inactive">Đã khóa</option>
            </select>
          </div>
          <div className={'w-1/2'}>
            <label className="block text-sm font-text mb-2">Mật khẩu</label>
            <input
              type={'text'}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full border rounded p-2 mb-2"
            /></div>
        </div>

        <div>
          <label className="block text-sm font-text mb-2">Ảnh đại diện</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full rounded"
          />
        </div>
      </form>
    </ReusableModal>
  );
}
