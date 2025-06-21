import { call, put, takeLatest, select } from 'redux-saga/effects';
import { showToast } from '@/lib/utils';
import {
  createStaffFailed,
  createStaffRequest, createStaffSuccess, deleteStaffFailed, deleteStaffRequest, deleteStaffSuccess,
  getStaffFailed,
  getStaffRequest,
  getStaffSuccess, updateStaffFailed, updateStaffRequest, updateStaffSuccess,
} from '@/redux/slices/manager/staffSlice';
import {
  createStaffAccount,
  deleteStaffAccount,
  editStaffAccount,
  fetchStaffAccount,
} from '@/services/api/manager/staffService';


function* handleFetchStaffAccount() {
  try {

    yield put(getStaffRequest());
    const { search, page } = yield select(state => state.admin_staff.query);
    const data = yield call(fetchStaffAccount, search, page);
    const { staffList, pages } = data;
    yield put(getStaffSuccess({ staffs: staffList, pages }));
  } catch (error) {
    const message = error || 'Lấy dữ liệu thất bại';
    yield put(getStaffFailed(message));
    showToast(message, { type: 'error' });
  }
}

function* handleCreateStaffAccount(action) {
  try {
    yield put(createStaffRequest());
    const newStaff = yield call(createStaffAccount, action.payload);
    yield put(createStaffSuccess(newStaff));
    showToast('Tạo danh mục thành công', { type: 'success' });

    yield put({ type: 'admin_staff/fetchStaffAccount' });
  } catch (error) {
    const message = error || 'Tạo danh mục thất bại';
    yield put(createStaffFailed(message));
    showToast(message, { type: 'error' });
  }
}

function* handleUpdateStaffAccount(action) {
  try {
    yield put(updateStaffRequest());

    const { id, update } = action.payload;
    yield call(editStaffAccount, id, update);

    yield put(updateStaffSuccess({ id }));
    showToast('Cập nhật danh mục thành công', { type: 'success' });

    yield put({ type: 'admin_staff/fetchStaff' });
  } catch (error) {
    const message = error || 'Cập nhật dang mục thất bại';
    yield put(updateStaffFailed(message));
    showToast(message, { type: 'error' });
  }
}

function* handleDeleteStaffAccount(action) {
  try {
    yield put(deleteStaffRequest());
    const {id} = action.payload;
    yield call(deleteStaffAccount, id);
    yield put(deleteStaffSuccess(action.payload));
  } catch (error) {
    const message = error || 'Khóa danh mục thất bại';
    yield put(deleteStaffFailed(message));
    showToast(message, { type: 'error' });
  }
}

export default function* categorySaga() {
  yield takeLatest('admin_staff/fetchStaff', handleFetchStaffAccount);
  yield takeLatest('admin_staff/createStaff', handleCreateStaffAccount);
  yield takeLatest('admin_staff/updateStaff', handleUpdateStaffAccount);
  yield takeLatest('admin_staff/deleteStaff', handleDeleteStaffAccount);
}
