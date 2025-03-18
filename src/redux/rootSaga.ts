import { all } from 'redux-saga/effects';
import authSaga from '../redux/auth/saga';
import customerSaga from './customer/saga';

export default function* rootSaga() {
  yield all([authSaga(), customerSaga()]);
}