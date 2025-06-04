import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from './slices/authSlice';
import authSaga from './sagas/authSaga';
import categorySaga from './sagas/manager/categorySaga';
import branchSaga from './sagas/manager/branchSaga';
import categoryReducer from './slices/manager/categorySlice';
import foodReducer from './slices/manager/foodSlice';
import foodSaga from '@/redux/sagas/manager/foodSaga';
import staffSaga from './sagas/manager/staffSaga';
import staffReducer from './slices/manager/staffSlice';
import branchReducer from './slices/manager/branchSlice';
import clientCategoryReducer from './slices/common/categorySlice';
import clientCategorySaga from '@/redux/sagas/common/clientCategorySaga';
import clientFoodReducer from './slices/common/foodSlice';
import clientFoodSaga from '@/redux/sagas/common/clientFoodSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin_category: categoryReducer,
    admin_food: foodReducer,
    admin_staff: staffReducer,
    admin_branch: branchReducer,
    client_category: clientCategoryReducer,
    client_food: clientFoodReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [
          'admin_category/createCategory',
          'admin_category/updateCategory',
          'admin_branch/createBranch',
          'admin_branch/updateBranch',
          'admin_food/createFood',
          'admin_food/updateFood',
          'admin_staff/createStaff',
          'admin_staff/updateStaff',
        ],
        ignoredPaths: ['payload'],
      },

    }).concat(sagaMiddleware),
});

sagaMiddleware.run(authSaga);
sagaMiddleware.run(categorySaga);
sagaMiddleware.run(foodSaga);
sagaMiddleware.run(staffSaga);
sagaMiddleware.run(branchSaga);
sagaMiddleware.run(clientCategorySaga);
sagaMiddleware.run(clientFoodSaga);
