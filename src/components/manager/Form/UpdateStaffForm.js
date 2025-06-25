'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppButton from '@/components/common/AppButton';
import ReusableModal from '@/components/common/modal/formModal';

export default function UpdateStaffForm({ open, onClose, item }) {
  const dispatch = useDispatch();
  const branches = useSelector(state => state.client_branch.branches);

  const [formData, setFormData] = useState({
    fullName: item.fullName ?? '',
    address: item.address ?? '',
    email: item.email ?? '',
    phone: item.phone ?? '',
    avatar: null,
    status: item.status ?? 'active',
    role: item.role ?? 'staff',
    branch: item.branch ?? '',
  });

  const [showImg, setShowImg] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('status', formData.status);
    data.append('address', formData.address);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('role', formData.role);
    data.append('branch', formData.branch);
    if (formData.avatar) data.append('avatar', formData.avatar);

    dispatch({
      type: 'admin_staff/updateStaff',
      payload: {
        id: item._id,
        update: data,
      },
    });

    onClose(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, avatar: file });
  };

  const handleShowImage = () => {
    setShowImg(!showImg);
  };

  return (
    <ReusableModal
      open={open}
      onClose={onClose}
      title="Chỉnh sửa nhân viên"
      description="Điền thông tin nhân viên bên dưới"
      footer={
        <AppButton variant="contained" color="primary" type="submit" form="staff-update-form">
          Lưu
        </AppButton>
      }
    >
      <form id="staff-update-form" onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <div className="w-1/2">
            <label className="block text-sm mb-2">Tên nhân viên</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full border rounded p-2 mb-2"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm mb-2">Địa chỉ</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full border rounded p-2 mb-2"
              required
            />
          </div>
        </div>

        <div className="flex gap-2">
          <div className="w-1/2">
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border rounded p-2 mb-2"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm mb-2">Số điện thoại</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full border rounded p-2 mb-2"
              required
            />
          </div>
        </div>

        <div className="flex gap-2">
          <div className="w-1/2">
            <label className="block text-sm mb-2">Vai trò</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full border rounded p-2 mb-2"
            >
              <option value="staff">Nhân viên</option>
              <option value="cashier">Thu ngân</option>
            </select>
          </div>
          <div className="w-1/2">
            <label className="block text-sm mb-2">Chi nhánh</label>
            <select
              value={formData.branch}
              onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
              className="w-full border rounded p-2 mb-2"
              required
            >
              <option value="">Chọn chi nhánh</option>
              {branches.map((branch) => (
                <option key={branch._id} value={branch._id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm mb-2">Trạng thái</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full border rounded p-2 mb-2"
          >
            <option value="active">Đang hoạt động</option>
            <option value="inactive">Đã khóa</option>
          </select>
        </div>

        <div className="flex gap-2 items-center">
          {item.avatar && (
            <div className="relative border-2 border-dashed p-2 rounded-lg">
              <div
                className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex justify-center items-center cursor-pointer"
                onClick={() => setFormData({ ...formData, avatar: null })}
              >
                x
              </div>
              <img src={item.avatar} alt="avatar" width={100} height={100} onClick={handleShowImage} />
            </div>
          )}
          <div className="flex-1">
            <label className="block text-sm mb-2">Ảnh đại diện</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" />
          </div>
        </div>
      </form>

      {showImg && (
        <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center bg-black bg-opacity-70">
          <div className="relative shadow-lg">
            <div
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
              onClick={handleShowImage}
            >
              x
            </div>
            <img src={item.avatar} alt="avatar-large" />
          </div>
        </div>
      )}
    </ReusableModal>
  );
}
