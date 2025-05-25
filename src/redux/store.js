import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from './slices/authSlice';
import authSaga from './sagas/authSaga';
import categorySaga from './sagas/manager/categorySaga';
import categoryReducer from './slices/manager/categorySlice';


const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin_category: categoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(authSaga);
sagaMiddleware.run(categorySaga);