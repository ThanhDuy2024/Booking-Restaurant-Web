import { getCategoryFailed, getCategoryRequest, getCategorySuccess } from '@/redux/slices/common/categorySlice';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { getCategory } from '@/services/api/client/clientApi';
import { showToast } from '@/lib/utils';


function* handleFetchCategory() {
  try {
    yield put(getCategoryRequest());
    const {search, page} = yield select(state => state.client_category.query);

    const response = yield call(getCategory, search , page);
    const {data, pages} = response;

    yield put(getCategorySuccess({category: data, pages}));
  } catch (error) {
    const message = error || 'Lấy dữ liệu thất bại';
    yield put(getCategoryFailed(message));
    showToast(message, {type: 'error'});
  }
}

export default function* clientCategorySaga() {
  yield takeLatest('client_category/fetchCategory', handleFetchCategory);
}