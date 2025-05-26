'use client';

import { useState } from 'react';
import AppButton from '@/components/common/AppButton';
import ReusableModal from '@/components/common/modal/formModal';
import { useDispatch } from 'react-redux';
import { hasWarned } from 'framer-motion';
import apiClient from '@/services/api/apiClient';
import { createCategory } from '@/services/api/manager/categoryService';

export default function CategoryCreateForm({ open, onClose }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    avatar: null,
    status: 'active',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('status', formData.status);
    if (formData.avatar) data.append('avatar', formData.avatar);

    dispatch({ type: 'admin_category/createCategory', payload: data });
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
      title="Tạo danh mục"
      description="Điền thông tin danh mục bên dưới"
      footer={<AppButton variant="contained"
                         color="primary"
                         type="submit"
                         form="category-form">
        Lưu
      </AppButton>}
    >
      <form id="category-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-text mb-2">Tên danh mục</label>
          <input
            type="text"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
          <label className="block text-sm font-text mb-2">Ảnh (URL)</label>
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
