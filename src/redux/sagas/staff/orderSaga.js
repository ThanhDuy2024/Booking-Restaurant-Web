import {put, call, takeLatest, select} from 'redux-saga/effects'
import {
  createOrderFailed,
  createOrderRequest, createOrderSuccess, deleteOrderFailed, deleteOrderRequest, deleteOrderSuccess,
  getOrderFailed,
  getOrderRequest,
  getOrderSuccess, updateOrderFailed, updateOrderRequest, updateOrderSuccess,
} from '@/redux/slices/staff/orderSlice';
import { createOrder, deleteOrder, fetchOrderList, updateOrder } from '@/services/api/staff/orderService';
import { showToast } from '@/lib/utils';

export function* handleFetchOrder () {
  try {
    yield put(getOrderRequest());
    const {search, page, date, priceSort, status} = yield select(state => state.staff_order.query);

    const response = yield call(fetchOrderList,search, page, date ,priceSort, status);
    const {data, pages} = response;
    yield put(getOrderSuccess({orderList: data, pages}));
  } catch (error) {
    const message = error || 'Lấy dữ liệu thất bại';
    yield put(getOrderFailed(message));
    showToast(message, {type: 'error'});
  }
}

export function* handleCreateOrder (action) {
  try {
    yield put(createOrderRequest());
    const response = yield call(createOrder,action.payload);
    yield put(createOrderSuccess(response));
    yield put({type: 'staff_order/fetchOrder' });
  } catch (error) {
    const message = error || 'Tạo đơn thất bại';
    yield put(createOrderFailed(message));
    showToast(message, {type: 'error'});
  }
}

export function* handleUpdateOrder (action) {
  try {
    yield put(updateOrderRequest());
    const response = yield call(updateOrder, action.payload.id, action.payload.data);
    yield put(updateOrderSuccess({...response, id:action.payload.id,}));
  } catch (error) {
    const message = error || 'Update thất bại';
    yield put(updateOrderFailed(message));
    showToast(message,{type: 'error'});
  }
}

export function* handleDeleteOrder (action) {
  try {
    yield put(deleteOrderRequest());
    const response = yield call(deleteOrder, action.payload._id);
    yield put(deleteOrderSuccess(response));
    yield put({type: 'staff_order/fetchOrder'});
  } catch (error) {
    const message = error || 'Hủy đơn thất bại';
    yield put(deleteOrderFailed(message));
    showToast(message, {type: 'error'});
  }
}

export default function* staffOrderSaga() {
  yield takeLatest('staff_order/fetchOrder',handleFetchOrder);
  yield takeLatest('staff_order/createOrder', handleCreateOrder);
  yield takeLatest('staff_order/updateOrder', handleUpdateOrder);
  yield takeLatest('staff_order/deleteOrder', handleDeleteOrder);
}