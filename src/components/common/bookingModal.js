'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/redux/slices/modalSlice';
import ReusableModal from '@/components/common/modal/formModal';
import AppButton from '@/components/common/AppButton';
import { booking } from '@/services/api/client/clientApi';
import { showToast } from '@/lib/utils';

export default function BookingModal() {
  const dispatch = useDispatch();
  const branches = useSelector(state => state.client_branch.branches);
  // if (branches == null) {
  //   dispatch({ type: 'client_branch/fetchBranch' });
  // }

  const open = useSelector((state) => state.modal.modals.booking.isOpen);
  const [formData, setFormData] = useState({
    branchId: '',
    fullName: '',
    phone: '',
    email: '',
    totalPerson: '',
    arriveDay: '',
    timeToArrive: '',
    note: '',
    status: 'initial',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = booking(formData);
    showToast(response);
    showToast('Vui lòng vô mail xác nhận dùm tụi mình nhé')
    dispatch(closeModal('booking'));
  };

  return (
    <ReusableModal
      open={open}
      onClose={() => dispatch(closeModal('booking'))}
      title="Đặt bàn"
      description="Vui lòng điền thông tin bên dưới để đặt bàn"
      footer={
        <AppButton
          variant="contained"
          color="primary"
          type="submit"
          form="booking-form"
        >
          Xác nhận
        </AppButton>
      }
    >
      <form id="booking-form" onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className={`block test-sm font-text mb-1`}>Chọn địa điểm</label>
          <select
            required={true}
            value={formData.branchId}
            onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
            className={`w-full border rounded-xl p-2`}
          >
            <option value="" disabled={true}>Chọn chi nhánh</option>
            {branches.map((branch) => (
              <option key={branch._id} value={branch._id}>{branch.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tên khách hàng</label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Số điện thoại</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Số người</label>
          <input
            type="number"
            required
            value={formData.totalPerson}
            onChange={(e) => setFormData({ ...formData, totalPerson: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ngày</label>
          <input
            type="date"
            required
            value={formData.arriveDay}
            onChange={(e) => setFormData({ ...formData, arriveDay: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Thời gian</label>
          <input
            type="time"
            required
            value={formData.timeToArrive}
            onChange={(e) => setFormData({ ...formData, timeToArrive: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ghi chú</label>
          <textarea
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            className="w-full border rounded p-2"
            rows={3}
          />
        </div>
      </form>
    </ReusableModal>
  );
}
