import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginfailed } from '../slices/authSlice';
import { Router } from 'next/router';
import { showToast } from '@/lib/utils';

function* handleLogin(action) {
  try {
    const response = yield call(login, action.payload);
    yield delay(2000);

    const { user, token } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    yield put(loginSuccess({ user, token }));
    showToast('Đăng nhập thành công!');

    switch (user.role) {
      case 'ADMIN':
        Router.push('/manager');
        break;
      case 'CLINIC':
        Router.push('/staff');
        break;
      default:
        Router.push('/');
    }
  } catch (e) {
    yield delay(2000);
    const message = error.response?.data?.message || 'Đăng nhập thất bại';
    yield put(loginFailure(message));
    showToast(message, { type: 'error' });
  }
}

export default function* watchAuthSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
}
