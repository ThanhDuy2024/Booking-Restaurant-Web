import {put, call, takeLatest} from 'redux-saga/effects'
import {
  createOrderFailed,
  createOrderRequest, createOrderSuccess,
  getOrderFailed,
  getOrderRequest,
  getOrderSuccess,
} from '@/redux/slices/staff/orderSlice';
import { createOrder, fetchOrderList } from '@/services/api/staff/orderService';
import { showToast } from '@/lib/utils';

export function* handlefetchOrder () {
  try {
    yield put(getOrderRequest());
    const {search, page, priceSort, date, status} = yield select(state => state.staff_order.query);

    const response = yield call(fetchOrderList,search, page, priceSort, date, status);
    const {data, pages} = response;
    yield put(getOrderSuccess({orderList: data, pages}));
  } catch (error) {
    const message = error || 'Lấy dữ liệu thất bại';
    yield put(getOrderFailed(message));
    showToast(message, {type: 'error'});
  }
}

export function* handleCreateOrder (formData) {
  try {
    yield put(createOrderRequest());
    const response = yield call(createOrder,formData);
    yield put(createOrderSuccess(response));
  } catch (error) {
    const message = error || 'Tạo đơn thất bại';
    yield put(createOrderFailed(message));
    showToast(message, {type: 'error'});
  }
}

export default function* staffOrderSaga() {
  yield takeLatest('staff_order/fetchOrder',handlefetchOrder);
  yield takeLatest('staff_order/createOrder', handleCreateOrder);
}