import {
  createBranchFailed,
  createBranchRequest, createBranchSuccess, deleteBranchFailed, deleteBranchRequest, deleteBranchSuccess,
  getBranchFailed,
  getBranchRequest,
  getBranchSuccess, updateBranchFailed, updateBranchRequest, updateBranchSuccess,
} from '@/redux/slices/manager/branchSlice';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { createBranch, deleteBranch, editBranch, fetchBranch } from '@/services/api/manager/branchService';
import { showToast } from '@/lib/utils';

function* handleFetchBranch() {
  try {

    yield put(getBranchRequest());
    const { search, page } = yield select(state => state.admin_branch.query);
    const data = yield call(fetchBranch, search, page);
    const { branchList, pages } = data;
    yield put(getBranchSuccess({ branches: branchList, pages }));
  } catch (error) {
    const message = error.response?.data?.message || 'Lấy dữ liệu thất bại';
    yield put(getBranchFailed(message));
    showToast(message, { type: 'error' });
  }
}

function* handleCreateBranch(action) {
  try {
    yield put(createBranchRequest());
    const newBranch = yield call(createBranch, action.payload);
    yield put(createBranchSuccess(newBranch));
    showToast('Tạo danh mục thành công', { type: 'success' });

    yield put({ type: 'admin_Branch/fetchBranch' });
  } catch (error) {
    const message = error.response?.data?.message || 'Tạo danh mục thất bại';
    yield put(createBranchFailed(message));
    showToast(message, { type: 'error' });
  }
}

function* handleUpdateBranch(action) {
  try {
    yield put(updateBranchRequest());

    const { id, update } = action.payload;
    yield call(editBranch, id, update);

    yield put(updateBranchSuccess({ id }));
    showToast('Cập nhật danh mục thành công', { type: 'success' });

    yield put({ type: 'admin_Branch/fetchBranch' });
  } catch (error) {
    const message = error.response?.data?.message || 'Cập nhật dang mục thất bại';
    yield put(updateBranchFailed(message));
    showToast(message, { type: 'error' });
  }
}

function* handleDeleteBranch(action) {
  try {
    yield put(deleteBranchRequest());
    yield call(deleteBranch, action.payload);
    yield put(deleteBranchSuccess(action.payload));
  } catch (error) {
    const message = error.response?.data?.message || 'Khóa danh mục thất bại';
    yield put(deleteBranchFailed(message));
    showToast(message, { type: 'error' });
  }
}

export default function* BranchSaga() {
  yield takeLatest('admin_branch/fetchBranch', handleFetchBranch);
  yield takeLatest('admin_branch/createBranch', handleCreateBranch);
  yield takeLatest('admin_branch/updateBranch', handleUpdateBranch);
  yield takeLatest('admin_branch/deleteBranch', handleDeleteBranch);
}
