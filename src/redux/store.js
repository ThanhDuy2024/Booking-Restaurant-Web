import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from './slices/authSlice';
import authSaga from './sagas/authSaga';
import categorySaga from './sagas/manager/categorySaga';
import branchSaga from './sagas/manager/branchSaga';
import categoryReducer from './slices/manager/categorySlice';
import branchReducer from './slices/manager/branchSlice';


const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin_category: categoryReducer,
    admin_branch: branchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: ['admin_category/createCategory', 'admin_category/updateCategory','admin_branch/createBranch', 'admin_branch/updateBranch'],
        ignoredPaths: ['payload'],
      },

    }).concat(sagaMiddleware),
});

sagaMiddleware.run(authSaga);
sagaMiddleware.run(categorySaga);
sagaMiddleware.run(branchSaga);