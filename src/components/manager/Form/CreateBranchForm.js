'use client';

import { useState } from 'react';
import AppButton from '@/components/common/AppButton';
import ReusableModal from '@/components/common/modal/formModal';
import { useDispatch } from 'react-redux';

export default function BranchCreateForm({ open, onClose }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    totalTable: 0,
    avatar: null,
    status: 'active',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('status', formData.status);
    data.append('address', formData.address);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('totalTable', formData.totalTable);

    if (formData.avatar) data.append('avatar', formData.avatar);

    dispatch({ type: 'admin_branch/createBranch', payload: data });
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
      title="Tạo chi nhánh"
      description="Điền thông tin chi nhánh bên dưới"
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
            <label className="block text-sm font-text mb-2">Tên chi nhánh</label>
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
        <div>
          <label className="block text-sm font-text mb-2">Tổng số bàn</label>
          <input
            type="number"
            onChange={(e) => setFormData({ ...formData, totalTable: e.target.value })}
            className="w-full border rounded p-2 mb-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-text mb-2">Trạng thái</label>
          <select
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full border rounded p-2 mb-2"
          >
            <option value="active">Đang hoạt động</option>
            <option value="inactive">Đã khóa</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-text mb-2">Ảnh</label>
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
