import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '@/redux/slices/modalSlice';
import BookingModal from './common/bookingModal';

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
    </>
  );
}
