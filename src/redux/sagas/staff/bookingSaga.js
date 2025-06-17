import { call, put, takeLatest, select } from 'redux-saga/effects';
import { getBookingListFailed, getBookingListRequest, getBookingListSuccess } from '@/redux/slices/staff/bookingSlice';
import { fetchBookingList } from '@/services/api/staff/bookingService';
import { showToast } from '@/lib/utils';


export function* handleFetchBookingList() {
  try {
    yield put(getBookingListRequest());

    const {search, page, phone} = yield select(state=> state.staff_booking.query);
    const response = yield call(fetchBookingList, search, page, phone);

    const {data, pages} = response;

    yield put(getBookingListSuccess({bookingList: data, pages }));
  } catch (error){
    const message = error || 'Lấy dữ liệu thất bại';
    yield put(getBookingListFailed(message));
    showToast(message, {type: 'error'});
  }
}

export default function* staffBookingSaga() {
  yield takeLatest('staff_booking/fetchBookingList', handleFetchBookingList);
}