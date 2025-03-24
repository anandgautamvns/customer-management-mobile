import { all } from "redux-saga/effects";
import customerSaga from "./customer/saga";

export default function* rootSaga() {
  yield all([customerSaga()]);
}
