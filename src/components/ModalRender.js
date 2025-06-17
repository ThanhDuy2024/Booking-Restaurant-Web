'use client'

import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '@/redux/slices/modalSlice';
import BookingModal from './common/bookingModal';
import ModalCreateOrder from '@/components/staff/modalCreateOrder';
import ModalUpdateOrder from '@/components/staff/modalUpdateOrder';

export default function ModalRender() {
  const { modals } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  return (
    <>
      {modals.booking.isOpen && (
        <BookingModal
          data={modals.booking.data}
          onClose={() => dispatch(closeModal('booking'))}
        />
      )}

      {modals.createOrder.isOpen && (
        <ModalCreateOrder
          data={modals.createOrder.data}
          onClose={() => dispatch(closeModal('createOrder'))}
        />
      )}

      {modals.updateOrder.isOpen && (
        <ModalUpdateOrder
          data={modals.updateOrder.data}
          onClose={() => dispatch(closeModal('updateOrder'))}
        />
      )}
    </>
  );
}
