import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
  createFoodFailed,
  createFoodRequest,
  createFoodSuccess, deleteFoodFailed, deleteFoodRequest, deleteFoodSuccess,
  getFoodFailed,
  getFoodRequest,
  getFoodSuccess, updateFoodFailed, updateFoodRequest, updateFoodSuccess,
} from '@/redux/slices/manager/foodSlice';
import { createFood, deleteFood, editFood, fetchFood } from '@/services/api/manager/foodService';
import { showToast } from '@/lib/utils';

function* handleFetchFood() {
  try {
    yield put(getFoodRequest());

    const {search, page} = yield select(state => state.admin_food.query);
    const data = yield call(fetchFood, search , page);

    const {foodList, pages} = data;
    yield put(getFoodSuccess({food: foodList, pages}));
  } catch (error) {
    const message = error || 'Lấy dữ liệu thất bại';
    yield put(getFoodFailed(message));
    showToast(message, {type: 'error'});
  }
}

function* handleCreateFood(action) {
  try {
    yield put(createFoodRequest());

    const newFood = yield call(createFood, action.payload);
    yield put(createFoodSuccess(newFood));

    showToast('Tạo danh mục thành công', {type: 'success'});
    yield put({type: 'admin_food/fetchFood'});
  } catch (error) {
    const message = error || 'Tạo món ăn mới thất bại';
    yield put(createFoodFailed(message));
    showToast(message, {type: 'error'});
  }
}

function* handleUpdateFood(action) {
  try {
    yield put(updateFoodRequest());

    const {id, update} = action.payload;
    yield call(editFood, id, update);

    yield put(updateFoodSuccess({ id }));
    showToast('Cập nhật món ăn thành công', {type: 'success'});

    yield put({type: 'admin_food/fetchFood'});
  } catch (error) {
    const message = error || 'Cập nhật danh mục thất bại';
    yield put(updateFoodFailed(message));
    showToast(message, {type: 'error'});
  }
}

function* handleDeleteFood(action) {
  try {
    yield put(deleteFoodRequest());

    yield call(deleteFood, action.payload);
    yield put(deleteFoodSuccess(action.payload));
  } catch (error) {
    const message = error || 'Khóa món thất bại';
    yield put(deleteFoodFailed(message));
    showToast(message, {type: 'error'});
  }
}

export default function* foodSaga() {
  yield takeLatest('admin_food/fetchFood', handleFetchFood);
  yield takeLatest('admin_food/createFood', handleCreateFood);
  yield takeLatest('admin_food/updateFood', handleUpdateFood);
  yield takeLatest('admin_food/deleteFood', handleDeleteFood);
}