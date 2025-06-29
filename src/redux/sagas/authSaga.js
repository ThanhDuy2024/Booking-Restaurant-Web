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
import { getMe, loginService, authService, logout } from '@/services/api/authService';

function* handleLogin(action) {
  try {
    yield call(loginService, {
      email: action.payload.email,
      password: action.payload.password,
    });

    yield delay(3000);
    const user = yield call(getMe);
    yield delay(1000);

    yield put(loginSuccess(user));
    const message = 'Đăng nhập thành công';
    showToast(message);
  } catch (error) {
    console.log('❌ Login error:', error);
    yield delay(2000);
    const message = error|| 'Đăng nhập thất bại';
    yield put(loginFailed(message));
    showToast(message, { type: 'error' });
  }
}


function* handleLogout() {
  try {
    const message = yield call(logout);
    yield delay(1000);
    yield put(logoutSuccess());
    showToast(message || 'Đăng xuất thành công');
    yield put(checkAuthRequest());
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
    console.log('❌ Login error:', error);
  }
}


export default function* watchAuthSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(logoutRequest.type, handleLogout);
  yield takeLatest(checkAuthRequest.type, checkAuth);
}
