import { call, put, takeLatest, select } from 'redux-saga/effects';
import { getFoodFailed, getFoodRequest, getFoodSuccess } from '@/redux/slices/common/foodSlice';
import { getFood } from '@/services/api/client/clientApi';
import { showToast } from '@/lib/utils';


function* handleFetchFoods() {
  try {
    yield put(getFoodRequest());
    const {search, page, categoryId} = yield select(state => state.client_food.query);

    const response = yield call(getFood, search, page, categoryId);
    const {data, pages} = response;

    yield put(getFoodSuccess({foods: data , pages}));
  } catch (error) {
    const message = error.response?.message || 'Lấy dữ liệu thất bại';
    yield put(getFoodFailed(message));
    showToast(message, {type: 'error'});
  }
}

export default function* clientFoodSaga() {
  yield takeLatest('client_food/fetchFood', handleFetchFoods);
}