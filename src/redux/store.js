import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from './slices/authSlice';
import authSaga from './sagas/authSaga';
import categorySaga from './sagas/manager/categorySaga';
import categoryReducer from './slices/manager/categorySlice';
import foodReducer from './slices/manager/foodSlice';
import foodSaga from '@/redux/sagas/manager/foodSaga';


const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin_category: categoryReducer,
    admin_food: foodReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [
          'admin_category/createCategory',
          'admin_category/updateCategory',
          'admin_food/createFood',
          'admin_food/updateFood',
        ],
        ignoredPaths: ['payload'],
      },

    }).concat(sagaMiddleware),
});

sagaMiddleware.run(authSaga);
sagaMiddleware.run(categorySaga);
sagaMiddleware.run(foodSaga);