import { call, put, takeLatest } from 'redux-saga/effects';
import { CreateCustomerPending, CustomerEntity, CustomerResponse, DeleteCustomerPending, GetCustomerByIdPending, GetCustomerPending, UpdateCustomerPending } from './type';
import { createCustomerApi, deleteAllCustomerApi, deleteCustomerApi, getCustomerApi, getCustomerByIdApi, updateCustomerApi } from '../../dataService/customerApi';
import { actions } from '../rootReducer';

const {
  createCustomerPending,
  createCustomerSuccess,
  createCustomerFailure, 
  getCustomerSuccess, 
  getCustomerPending,
  getCustomerFailure,
  getCustomerByIdPending, 
  getCustomerByIdSuccess, 
  getCustomerByIdFailure,
  updateCustomerPending,
  updateCustomerSuccess,
  updateCustomerFailure,
  deleteCustomerPending,
  deleteCustomerSuccess,
  deleteCustomerFailure,
  deleteAllCustomerPending,
  deleteAllCustomerSuccess,
  deleteAllCustomerFailure
} = actions.customer

export function* createCustomer(action: CreateCustomerPending) {
  try {
    const response: CustomerEntity = yield call(createCustomerApi, action.payload);
    yield put(createCustomerSuccess(response));
  } catch (error: any) {
    yield put(createCustomerFailure(error));
  }
}

export function* getCustomer(action: GetCustomerPending) {
  try {
    const response: CustomerResponse = yield call(getCustomerApi, action.payload);
    yield put(getCustomerSuccess(response));
  } catch (error: any) {
    yield put(getCustomerFailure(error));
  }
}

export function* getCustomerById(action: GetCustomerByIdPending) {
  try {
    const response: CustomerEntity = yield call(getCustomerByIdApi, action.payload);
    yield put(getCustomerByIdSuccess(response));
  } catch (error: any) {
    yield put(getCustomerByIdFailure(error));
  }
}

export function* updateCustomer(action: UpdateCustomerPending) {
  try {
    const response: CustomerEntity = yield call(updateCustomerApi, action.payload);
    yield put(updateCustomerSuccess(response));
  } catch (error: any) {
    yield put(updateCustomerFailure(error));
  }
}

export function* deleteCustomer(action: DeleteCustomerPending) {
  try {
    const response: CustomerEntity = yield call(deleteCustomerApi, action.payload);
    yield put(deleteCustomerSuccess(response));
  } catch (error: any) {
    yield put(deleteCustomerFailure(error));
  }
}

export function* deleteAllCustomer() {
  try {
    const response: CustomerEntity = yield call(deleteAllCustomerApi);
    yield put(deleteAllCustomerSuccess(response));
  } catch (error: any) {
    yield put(deleteAllCustomerFailure(error));
  }
}

export default function* customerSaga() {
  yield takeLatest(createCustomerPending.type, createCustomer);
  yield takeLatest(getCustomerPending.type, getCustomer);
  yield takeLatest(getCustomerByIdPending.type, getCustomerById);
  yield takeLatest(updateCustomerPending.type, updateCustomer);
  yield takeLatest(updateCustomerPending.type, deleteCustomer);
  yield takeLatest(deleteAllCustomerPending.type, deleteAllCustomer);
}