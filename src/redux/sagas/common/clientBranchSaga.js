import { call, put, takeLatest, select } from 'redux-saga/effects';
import { getBranchFailed, getBranchRequest, getBranchSuccess } from '@/redux/slices/common/branchSlice';
import { getBranch } from '@/services/api/client/clientApi';

function* handleFetchBranch() {
  try{
    yield put(getBranchRequest());

    const response =  yield call(getBranch);
    yield put(getBranchSuccess({branches: response.data}));
  } catch (error) {
    const message = error.response?.data?.message || 'Lấy dữ liệu thất bại';
    yield put(getBranchFailed(message));
    showToast(message, {type: 'error'});
  }
}

export default function* clientBranchSaga() {
  yield takeLatest('client_branch/fetchBranch', handleFetchBranch);
}