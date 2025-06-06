'use client';

import { useEffect, useState } from 'react';
import AppButton from '@/components/common/AppButton';
import ReusableModal from '@/components/common/modal/formModal';
import { useDispatch } from 'react-redux';
import Image from 'next/image';

export default function BranchUpdateForm({ open, onClose, item }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: item.name ?? '',
    address: item.address ?? '',
    email: item.email ?? '',
    phone: item.phone ?? '',
    totalTable: item.totalTable ?? 0,
    avatar: null,
    status: item.status ?? 'active',
  });
  const [showImg, setShowImg] = useState(false);

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

    dispatch({ type: 'admin_branch/updateBranchRequest', payload: data });
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
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border rounded p-2 mb-2"
              required
            />
          </div>
          <div className={'w-1/2'}>
            <label className="block text-sm font-text mb-2">Địa chỉ</label>
            <input
              type="text"
              value={formData.address}
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
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border rounded p-2 mb-2"
              required
            />
          </div>
          <div className={'w-1/2'}>
            <label className="block text-sm font-text mb-2">Số điện thoại</label>
            <input
              type="text"
              value={formData.phone}
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
            value={formData.totalTable}
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
            <option value="active" defaultValue={item.status === 'active' ?? true}>Đang hoạt động</option>
            <option value="inactive" defaultValue={item.status === 'active' ?? true}>Đã khóa</option>
          </select>
        </div>
        <div className={'flex flex-row justify-center items-center gap-2'}>
          {item.avatar &&
            <div className={'border-2 border-gray-400 border-dashed rounded-lg p-2 relative'}>
              <div
                className={'w-5 h-5 text-center bg-red-600 rounded-full absolute -top-1 -right-1 text-white flex justify-center items-center'}>x
              </div>
              <img src={item.avatar} alt="avatar" width={100} height={100} onClick={handleShowImage} />
            </div>}
          <div>
            <label className="block text-sm font-text mb-2">Ảnh</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full rounded"
            />
          </div>
        </div>
      </form>
      {
        showImg && <div className={'absolute w-full h-full top-0 left-0 flex justify-center items-center'}>
          <div className={'relative shadow-lg shadow-gray-500'}>
            <div
              className={'w-6 h-6 bg-red-600 rounded-full top-0 right-0 absolute z-10 flex justify-center items-center text-white'}
              onClick={handleShowImage}>x
            </div>
            <img src={item.avatar} alt="avatar" />
          </div>
        </div>
      }
    </ReusableModal>
  );
}