'use client'

import ReusableModal from '@/components/common/modal/formModal';
import { closeModal } from '@/redux/slices/modalSlice';
import AppButton from '@/components/common/AppButton';
import { Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ModalUpdateOrder({ data }) {
  const dispatch = useDispatch();
  const open = useSelector(state => state.modal.modals['updateOrder']);
  const { foods } = useSelector(state => state.client_food);
  console.log(data);
  const [formData, setFormData] = useState({
    foodObject: data.foods.map(item => ({
      foodId: item.id,
      quantity : item.quantity.toString(),
    })),
    discount: data.discount,
    tableNumber: data.tableNumber.toString(),
    status: 'complete',
  });

  useEffect(() => {
    dispatch({ type: 'client_food/fetchFood' });
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitter = e.nativeEvent.submitter;
    const action = submitter?.value;

    if (action === 'pay') {
      dispatch({ type: 'staff_order/updateOrder', payload: {id: data._id, data: formData}});
    } else if (action === 'cancel') {
      dispatch({ type: 'staff_order/deleteOrder', payload: data });
    }
    dispatch(closeModal('updateOrder'));
  };
  return (
    <>
      <ReusableModal
        open={open}
        onClose={() => dispatch(closeModal('updateOrder'))}
        title="Tạo đơn"
        description="Nhập thông tin để tạo đơn hàng"
        footer={
          <>
            <AppButton variant="contained" color="green" type="submit" form="order-update-form" name="action" value="pay">
              Thanh toán
            </AppButton>
            <AppButton variant="contained" color="red" type="submit" form="order-update-form" name="action" value="cancel">
              Hủy đơn
            </AppButton>
          </>
        }
      >
        <form
          id="order-update-form"
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
                  <Image  className="w-10 h-10 rounded-full object-cover" src={food.avatar} alt="" />
                  <div className="flex flex-col flex-1">
                    <p className="font-medium">{food.name}</p>
                    <p className="text-sm text-gray-500">{food.priceFormat} ₫</p>
                  </div>
                </div>
                <button
                  type="button"
                  // onClick={() => handleAddFood(food)}
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
            {data.foods.length === 0 ? (
              <p className="text-sm text-gray-500">Chưa chọn món nào</p>
            ) : (
              data.foods.map((item,index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border p-2 rounded mb-2"
                >
                  <div className={`flex items-center gap-4`}>
                    <img className={`w-10 h-10 rounded-full`} src={item.avatar} alt="error" />
                    <div>
                      <p>{item.name}</p>
                      <p className="text-sm text-gray-500">{item.priceFormat} ₫</p>
                    </div>
                  </div>
                  <label className={`w-16 border rounded p-1 items-center flex justify-center`}>{item.quantity}</label>
                </div>
              ))
            )}
          </div>
        </form>
      </ReusableModal>
    </>
  );
}