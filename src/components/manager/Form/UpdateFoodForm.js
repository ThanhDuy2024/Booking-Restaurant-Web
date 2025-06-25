'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppButton from '@/components/common/AppButton';
import ReusableModal from '@/components/common/modal/formModal';

export default function UpdateFoodForm({ open, onClose, item }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.admin_category.items);

  const [formData, setFormData] = useState({
    name: item?.name ?? '',
    categoryId: item?.categoryId ?? '',
    position: item?.position ?? '',
    price: item?.price ?? 0,
    status: item?.status ?? 'active',
    avatar: null,
  });

  const [showImg, setShowImg] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('categoryId', formData.categoryId);
    data.append('status', formData.status);
    data.append('price', formData.price);
    data.append('position', formData.position);

    if (formData.avatar) {
      data.append('avatar', formData.avatar);
    }

    dispatch({
      type: 'admin_food/updateFood',
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
      title="Cập nhật món ăn"
      description="Chỉnh sửa thông tin món ăn bên dưới"
      footer={
        <AppButton variant="contained" color="primary" type="submit" form="update-food-form">
          Lưu
        </AppButton>
      }
    >
      <form id="update-food-form" onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <div className="w-1/2">
            <label className="block text-sm mb-2">Tên món ăn</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm mb-2">Danh mục</label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Chọn danh mục</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="w-1/2">
            <label className="block text-sm mb-2">Vị trí</label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full border rounded p-2"
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm mb-2">Giá sản phẩm</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full border rounded p-2"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-2">Trạng thái</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full border rounded p-2"
          >
            <option value="active">Đang hoạt động</option>
            <option value="inactive">Đã khóa</option>
          </select>
        </div>

        <div className="flex gap-2 items-center">
          {item.avatar && !formData.avatar && (
            <div className="relative border-2 border-dashed p-2 rounded-lg">
              <div
                className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex justify-center items-center cursor-pointer"
                onClick={() => setFormData({ ...formData, avatar: null })}
              >
                x
              </div>
              <img
                src={item.avatar}
                alt="avatar"
                width={100}
                height={100}
                onClick={handleShowImage}
                className="cursor-pointer"
              />
            </div>
          )}
          <div className="flex-1">
            <label className="block text-sm mb-2">Ảnh món ăn</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" />
          </div>
        </div>
      </form>

      {showImg && (
        <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
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
