import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import ReusableModal from '@/components/common/modal/formModal';
import AppButton from '@/components/common/AppButton';
import { urlToFile } from '@/lib/utils';


export default function CategoryUpdateForm({ open, onClose, item }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: item?.name || '',
    avatar: item?.avatar || '',
    status: item?.status || '',
    removeAvatar: false,
    preview: item?.avatar || '',
  });

  useEffect(() => {
    const prepareFile = async () => {
      if (item?.avatar && typeof item.avatar === 'string') {
        const file = await urlToFile(item.avatar, 'avatar.jpg');
        setFormData({
          name: item.name || '',
          status: item.status || 'active',
          avatar: file,
          preview: item.avatar,
          removeAvatar: false
        });
      }
    };

    prepareFile();
  }, [item]);


  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('status', formData.status);
    if (formData.avatar) data.append('avatar', formData.avatar);


    for (let [key, value] of data.entries()) {
      console.log(`🔹 ${key}:`, value instanceof File ? value.name : value);
    }

    dispatch({
      type: 'admin_category/updateCategory', payload: {
        id: item._id,
        update: data,
      },
    });
    onClose(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      avatar: file,
      preview: URL.createObjectURL(file),
      removeAvatar: false,
    });
  };

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      avatar: null,
      preview: null,
      removeAvatar: true,
    });
  };

  return (
    <>
      <ReusableModal
        open={open}
        onClose={onClose}
        title="Cập nhật danh mục"
        description="Điền thông tin danh mục bên dưới"
        footer={
          <AppButton variant="contained"
                     color="primary"
                     type="submit"
                     form="category-update-form"
          >
            Lưu
          </AppButton>}
      >
        <form id={`category-update-form`} onSubmit={handleSubmit} className={`space-y-4`}>
          <div>
            <label className={`block text-sm font-text mb-2`}>Tên danh mục</label>
            <input
              defaultValue={item.name}
              type="text"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full border rounded p-2 mb-2`}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-text mb-2`}>Trạng thái</label>
            <select
              defaultValue={item.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className={`w-full border rounded p-2 mb-2`}
            >
              <option value="active">Đang hoạt động</option>
              <option value="inactive">Đã khóa</option>
            </select>
          </div>

          <div>
            <label className={`block test-sm font-text mb-2`}>Ảnh</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={`w-full rounded mb-2`}
            />
            {formData.preview && (
              <div className="relative inline-block mb-2">
                <img
                  src={formData.preview}
                  alt="Ảnh xem trước"
                  className="w-24 h-24 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-0 right-0 bg-white text-red-600 rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-100"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </form>
      </ReusableModal>
    </>
  );
}