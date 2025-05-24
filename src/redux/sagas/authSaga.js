import { call, put, takeLatest, delay } from 'redux-saga/effects';
import {
  loginRequest,
  loginSuccess,
  loginFailed,
  logoutSuccess,
  logoutFailed,
  logoutRequest,
} from '../slices/authSlice';
import { showToast } from '@/lib/utils';
import { loginService, logoutService } from '@/services/api/authService';

function* handleLogin(action) {
  try {
    const response = yield call(loginService, {
      email: action.payload.email,
      password: action.payload.password,
    });

    console.log('✅ Login response:', response);
    const { role, message } = response;

    yield delay(2000);
    console.log('✅ Dispatch loginSuccess');

    yield put(loginSuccess({role}));
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


export default function* watchAuthSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(logoutRequest.type, handleLogout);
}
