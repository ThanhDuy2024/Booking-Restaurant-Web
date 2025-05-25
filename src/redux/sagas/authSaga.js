import { call, put, takeLatest, delay } from 'redux-saga/effects';
import {
  loginRequest,
  loginSuccess,
  loginFailed,
  logoutSuccess,
  logoutFailed,
  logoutRequest,
  checkAuthRequest,
} from '../slices/authSlice';
import { showToast } from '@/lib/utils';
import { getMe, loginService, logoutService } from '@/services/api/authService';

function* handleLogin(action) {
  try {
    yield call(loginService, {
      email: action.payload.email,
      password: action.payload.password,
    });

    yield delay(2000);
    console.log('✅ Dispatch loginSuccess');

    const user = yield call(getMe);

    console.log('✅ Dispatch getMe');
    yield delay(1000);

    yield put(loginSuccess(user));
    showToast(message || 'Đăng nhập thành công');
  } catch (error) {
    console.log('❌ Login error:', error);
    yield delay(2000);
    const message = error.response?.data?.message || 'Đăng nhập thất bại';
    yield put(loginFailed(message));
    showToast(message, { type: 'error' });
  }
}


function* handleLogout() {
  try {
    const message = yield call(logoutService);
    yield delay(1000);
    yield put(logoutSuccess());
    showToast(message || 'Đăng xuất thành công');
  } catch (error) {
    yield put(logoutFailed('Đăng xuất thất bại!'));
    showToast('Đăng xuất thất bại', { type: 'error' });
  }
}

function* checkAuth() {
  try{
    const user = yield call(getMe);
    yield put(loginSuccess(user));
  } catch (error) {
    yield put(loginFailed('Không tìm thấy dữ liệu', error))
  }
}


export default function* watchAuthSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(logoutRequest.type, handleLogout);
  yield takeLatest(checkAuthRequest.type, checkAuth);
}
