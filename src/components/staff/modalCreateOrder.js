'use client';

import { useDispatch, useSelector } from 'react-redux';
import ReusableModal from '@/components/common/modal/formModal';
import AppButton from '@/components/common/AppButton';
import { closeModal } from '@/redux/slices/modalSlice';
import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react'; // Chỉ nếu bạn dùng icon

export default function ModalCreateOrder({ data }) {
  const dispatch = useDispatch();
  const open = useSelector(state => state.modal.modals['createOrder']);
  const { foods } = useSelector(state => state.client_food);
  const [foodChosen, setFoodChosen] = useState([]);
  const [formData, setFormData] = useState({
    foodObject: [],
    discount: '10%',
    tableNumber: data.tableNumber,
    status: 'inital',
  });
  const handleAddFood = (food) => {
    setFormData(prev => {
      const exist = prev.foodObject.find(item => item.foodId === food._id);
      return exist
        ? {
          ...prev,
          foodObject: prev.foodObject.map(item =>
            item.foodId === food._id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }
        : {
          ...prev,
          foodObject: [...prev.foodObject, { foodId: food._id, quantity: 1 }],
        };
    });

    setFoodChosen(prev => {
      const exist = prev.find(item => item._id === food._id);
      return exist ? prev.map(item => item._id === food._id ? {
        ...item,
        quantity: item.quantity + 1,
      } : item) : [...prev, { ...food, quantity: 1 }];
    });
  };

  const handleQuantityChange = (id, value) => {
    setFormData(prev => ({
      ...prev,
      foodObject: prev.foodObject.map(item =>
        item._id === id ? { ...item, quantity: Number(value) } : item,
      ),
    }));

    setFoodChosen(prev =>
      prev.map(item => (item._id === id ? { ...item, quantity: Number(value) } : item)),
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      foodObject: formData.foodObject.map(item => (
        {
          foodId: item.foodId,
          quantity:String(item.quantity),
        }
      ))
    }
    dispatch({ type: 'staff_order/createOrder', payload: payload });
    dispatch(closeModal('createOrder'));
  };

  useEffect(() => {
    dispatch({ type: 'client_food/fetchFood' });
  }, [dispatch]);

  return (
    <ReusableModal
      open={open}
      onClose={() => dispatch(closeModal('createOrder'))}
      title="Tạo đơn"
      description="Nhập thông tin để tạo đơn hàng"
      footer={
        <AppButton variant="contained" color="primary" type="submit" form="order-create-form">
          Xác nhận
        </AppButton>
      }
    >
      <form
        id="order-create-form"
        onSubmit={handleSubmit}
        className="flex gap-4 max-h-[70vh] overflow-hidden"
      >
        {/* Danh sách món ăn */}
        <div className="w-3/5 overflow-y-auto border-r pr-4">
          <h3 className="font-semibold mb-2">Chọn món</h3>
          {foods.map(food => (
            <div
              key={food._id}
              className="flex justify-between items-center border p-2 rounded mb-2 gap-2"
            >
              <div className="flex items-center gap-3 w-full">
                <img className="w-10 h-10 rounded-full object-cover" src={food.avatar} alt="" />
                <div className="flex flex-col flex-1">
                  <p className="font-medium">{food.name}</p>
                  <p className="text-sm text-gray-500">{food.priceFormat} ₫</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleAddFood(food)}
                className="flex items-center gap-1 px-3 py-1 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Thêm
              </button>
            </div>
          ))}
        </div>

        {/* Món đã chọn */}
        <div className="w-2/5 overflow-y-auto pl-2">
          <h3 className="font-semibold mb-2">Món đã chọn</h3>
          {foodChosen.length === 0 ? (
            <p className="text-sm text-gray-500">Chưa chọn món nào</p>
          ) : (
            foodChosen.map(item => (
              <div
                key={item._id}
                className="flex justify-between items-center border p-2 rounded mb-2"
              >
                <div className={`flex items-center gap-4`}>
                  <img className={`w-10 h-10 rounded-full`} src={item.avatar} alt="error" />
                  <div>
                    <p>{item.name}</p>
                    <p className="text-sm text-gray-500">{item.priceFormat} ₫</p>
                  </div>
                </div>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                  className="w-16 border rounded px-2 py-1"
                />
              </div>
            ))
          )}
        </div>
      </form>
    </ReusableModal>
  );
}
