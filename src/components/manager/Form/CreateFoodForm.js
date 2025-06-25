'use client';

import { useState } from 'react';
import AppButton from '@/components/common/AppButton';
import ReusableModal from '@/components/common/modal/formModal';
import { useDispatch, useSelector } from 'react-redux';

export default function CreateFoodForm({ open, onClose }) {
  const dispatch = useDispatch();
  const items = useSelector(state => state.admin_category.items);

  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    position: '',
    price: 0,
    avatar: null,
    status: 'active',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('categoryId', formData.categoryId);
    data.append('status', formData.status);
    data.append('price', formData.price);
    data.append('position', formData.position);

    if (formData.avatar) data.append('avatar', formData.avatar);

    dispatch({ type: 'admin_food/createFood', payload: data });
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
      title="Tạo món ăn"
      description="Điền thông tin món ăn bên dưới"
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
            <label className="block text-sm font-text mb-2">Tên món ăn</label>
            <input
              type="text"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border rounded p-2 mb-2"
              required
            />
          </div>
          <div className={'w-1/2'}>
            <label className="block text-sm font-text mb-2">Danh mục</label>
            <select
              required={true}
              value={formData.branchId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className={`w-full border  rounded p-2 mb-2`}
            >
              <option value=""  defaultValue={true}>Chọn danh mục</option>
              {items.map((branch) => (
                <option key={branch._id} value={branch._id}>{branch.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-text mb-2">Giá sản phẩm</label>
          <input
            type="number"
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
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
