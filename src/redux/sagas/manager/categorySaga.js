import {
  createCategoryFailed,
  createCategoryRequest, createCategorySuccess, deleteCategoryFailed, deleteCategoryRequest, deleteCategorySuccess,
  getCategoryFailed,
  getCategoryRequest,
  getCategorySuccess, updateCategoryFailed, updateCategoryRequest, updateCategorySuccess,
} from '@/redux/slices/manager/categorySlice';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { showToast } from '@/lib/utils';
import { fetchStaffAccount } from '@/services/api/manager/staffService';
import { createCategory, fetchCategory } from '@/services/api/manager/categoryService';


function* handleFetchCategory() {
  try {

    yield put(getCategoryRequest());
    const { search, page } = yield select(state => state.admin_category.query);
    const data = yield call(fetchCategory, search, page);
    const { categoryList, pages } = data;
    yield put(getCategorySuccess({ items: categoryList, pages }));
  } catch (error) {
    const message = error.response?.data?.message || 'Lấy dữ liệu thất bại';
    yield put(getCategoryFailed(message));
    showToast(message, { type: 'error' });
  }
}

function* handleCreateCategory(action) {
  try {
    yield put(createCategoryRequest());
    const newCategory = yield call(createCategory, action.payload);
    yield put(createCategorySuccess(newCategory));
    showToast('Tạo danh mục thành công', { type: 'success' });

    yield put({ type: 'admin_category/fetchCategory' });
  } catch (error) {
    const message = error.response?.data?.message || 'Tạo danh mục thất bại';
    yield put(createCategoryFailed(message));
    showToast(message, { type: 'error' });
  }
}

function* handleUpdateCategory(action) {
  try {
    yield put(updateCategoryRequest());

    const { id, update } = action.payload;
    yield call(editCategory, id, update);

    yield put(updateCategorySuccess({ id }));
    showToast('Cập nhật danh mục thành công', { type: 'success' });

    yield put({ type: 'admin_category/fetchCategory' });
  } catch (error) {
    const message = error.response?.data?.message || 'Cập nhật dang mục thất bại';
    yield put(updateCategoryFailed(message));
    showToast(message, { type: 'error' });
  }
}

function* handleDeleteCategory(action) {
  try {
    yield put(deleteCategoryRequest());
    yield call(deleteCategory, action.payload);
    yield put(deleteCategorySuccess(action.payload));
  } catch (error) {
    const message = error.response?.data?.message || 'Khóa danh mục thất bại';
    yield put(deleteCategoryFailed(message));
    showToast(message, { type: 'error' });
  }
}

export default function* categorySaga() {
  yield takeLatest('admin_category/fetchCategory', handleFetchCategory);
  yield takeLatest('admin_category/createCategory', handleCreateCategory);
  yield takeLatest('admin_category/updateCategory', handleUpdateCategory);
  yield takeLatest('admin_category/deleteCategory', handleDeleteCategory);
}
