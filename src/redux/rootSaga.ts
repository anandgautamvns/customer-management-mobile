import { all } from 'redux-saga/effects';
import authSaga from '../redux/auth/saga';

export default function* rootSaga() {
  yield all([authSaga()]);
}