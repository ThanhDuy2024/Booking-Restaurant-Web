import {
  deleteProfileFailed, deleteProfileRequest, deleteProfileSuccess,
  getProfileFailed,
  getProfileRequest,
  getProfileSuccess, updateProfileFailed, updateProfileRequest, updateProfileSuccess,
} from '@/redux/slices/manager/profileSlice';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { deleteProfile, editProfile, fetchProfile } from '@/services/api/manager/profileService';
import { showToast } from '@/lib/utils';

function* handleFetchProfile() {
  try {
    yield put(getProfileRequest());
    const res = yield call(fetchProfile);
    yield put(getProfileSuccess({ profile: res}));
  } catch (error) {
    const message = error.response?.data?.message || 'Lấy dữ liệu thất bại';
    yield put(getProfileFailed(message));
    showToast(message, { type: 'error' });
  }
}

function* handleUpdateProfile(action) {
  try {
    yield put(updateProfileRequest());

    const { id, update } = action.payload;
    yield call(editProfile, id, update);

    yield put(updateProfileSuccess({ id }));
    showToast('Cập nhật danh mục thành công', { type: 'success' });

    yield put({ type: 'admin_profile/fetchProfile' });
  } catch (error) {
    const message = error.response?.data?.message || 'Cập nhật dang mục thất bại';
    yield put(updateProfileFailed(message));
    showToast(message, { type: 'error' });
  }
}

function* handleDeleteProfile(action) {
  try {
    yield put(deleteProfileRequest());
    yield call(deleteProfile, action.payload);
    yield put(deleteProfileSuccess(action.payload));
  } catch (error) {
    const message = error.response?.data?.message || 'Khóa danh mục thất bại';
    yield put(deleteProfileFailed(message));
    showToast(message, { type: 'error' });
  }
}

export default function* profileSaga() {
  yield takeLatest('admin_profile/fetchProfile', handleFetchProfile);
  yield takeLatest('admin_profile/updateProfile', handleUpdateProfile);
  yield takeLatest('admin_profile/deleteProfile', handleDeleteProfile);
}
