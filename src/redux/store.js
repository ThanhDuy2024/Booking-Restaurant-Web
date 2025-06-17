import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

//Reducer
import authReducer from './slices/authSlice';
import categoryReducer from './slices/manager/categorySlice';
import foodReducer from './slices/manager/foodSlice';
import staffReducer from './slices/manager/staffSlice';
import branchReducer from './slices/manager/branchSlice';
import clientCategoryReducer from './slices/common/categorySlice';
import clientFoodReducer from './slices/common/foodSlice';
import modalSliceReducer from './slices/modalSlice';
import clientBranchReducer from './slices/common/branchSlice';
import staffOrderReducer from './slices/staff/orderSlice';
import staffBookingReducer from './slices/staff/bookingSlice';

//Saga
import authSaga from './sagas/authSaga';
import categorySaga from './sagas/manager/categorySaga';
import branchSaga from './sagas/manager/branchSaga';
import foodSaga from '@/redux/sagas/manager/foodSaga';
import staffSaga from './sagas/manager/staffSaga';
import clientCategorySaga from '@/redux/sagas/common/clientCategorySaga';
import clientFoodSaga from '@/redux/sagas/common/clientFoodSaga';
import clientBranchSaga from './sagas/common/clientBranchSaga';
import staffOrderSaga from '@/redux/sagas/staff/orderSaga';
import staffBookingSaga from '@/redux/sagas/staff/bookingSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    modal: modalSliceReducer,
    auth: authReducer,
    admin_category: categoryReducer,
    admin_food: foodReducer,
    admin_staff: staffReducer,
    admin_branch: branchReducer,
    client_category: clientCategoryReducer,
    client_branch: clientBranchReducer,
    client_food: clientFoodReducer,
    staff_order: staffOrderReducer,
    staff_booking: staffBookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
        // ignoredActions: [
        //   'admin_category/createCategory',
        //   'admin_category/updateCategory',
        //   'admin_branch/createBranch',
        //   'admin_branch/updateBranch',
        //   'admin_branch/updateBranchRequest',
        //   'admin_food/createFood',
        //   'admin_food/updateFood',
        //   'admin_staff/createStaff',
        //   'admin_staff/updateStaff',
        // ],
        // ignoredPaths: ['payload'],

    }).concat(sagaMiddleware),
});

sagaMiddleware.run(authSaga);
sagaMiddleware.run(categorySaga);
sagaMiddleware.run(foodSaga);
sagaMiddleware.run(staffSaga);
sagaMiddleware.run(branchSaga);
sagaMiddleware.run(clientCategorySaga);
sagaMiddleware.run(clientFoodSaga);
sagaMiddleware.run(clientBranchSaga);
sagaMiddleware.run(staffOrderSaga);
sagaMiddleware.run(staffBookingSaga);
