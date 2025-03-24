import AsyncStorage from "@react-native-async-storage/async-storage";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  getProfile,
  loginUser,
  logoutUser,
  registrationUser,
  updateProfile,
} from "../../dataService/authApi";

import {
  checkAuthFailure,
  checkAuthPending,
  checkAuthSuccess,
  getProfileFailure,
  getProfilePending,
  getProfileSuccess,
  loginFailure,
  loginPending,
  loginSuccess,
  logoutFailure,
  logoutPending,
  logoutSuccess,
  registrationFailure,
  registrationPending,
  registrationSuccess,
  updateProfileFailure,
  updateProfileRequest,
  updateProfileSuccess,
} from "../auth/reducer";
import {
  LoginPending,
  LogoutResponse,
  RegistrationPending,
  RegistrationResponse,
  UpdateProfilePending,
  User,
} from "./type";

export function* handleLogin(action: LoginPending) {
  try {
    const expiryTime = new Date().getTime() + 30 * 60 * 1000;
    const response: RegistrationResponse = yield call(
      loginUser,
      action.payload
    );
    const { user, token } = response;
    yield call(AsyncStorage.setItem, "token", token);
    yield call(AsyncStorage.setItem, "expiryTime", expiryTime.toString());
    yield put(loginSuccess({ user, token }));
  } catch (error: any) {
    yield put(loginFailure(error));
  }
}

export function* handleRegistration(action: RegistrationPending) {
  try {
    const response: RegistrationResponse = yield call(
      registrationUser,
      action.payload
    );
    const { user, token } = response;
    yield call(AsyncStorage.setItem, "token", token);
    yield put(registrationSuccess({ user, token }));
  } catch (error: any) {
    yield put(registrationFailure(error));
  }
}

export function* handleLogout() {
  try {
    const response: LogoutResponse = yield call(logoutUser);
    const { message, error } = response;
    yield call(AsyncStorage.removeItem, "token");
    yield put(logoutSuccess({ message, error }));
  } catch (error: any) {
    yield put(logoutFailure(error));
  }
}

export function* handleCheckAuth() {
  try {
    const token: string = yield call(AsyncStorage.getItem, "token");
    yield put(checkAuthSuccess({ token }));
  } catch (error: any) {
    const token: string | null = yield call(AsyncStorage.removeItem, "token");
    yield put(checkAuthFailure({ token }));
  }
}

export function* handleProfile() {
  try {
    const response: User = yield call(getProfile);
    yield put(getProfileSuccess(response));
  } catch (error: any) {
    yield put(getProfileFailure(error));
  }
}

export function* handleUpdateProfile(action: UpdateProfilePending) {
  try {
    const response: User = yield call(updateProfile, action.payload);
    yield put(updateProfileSuccess(response));
  } catch (error: any) {
    yield put(updateProfileFailure(error));
  }
}

export default function* authSaga() {
  yield takeLatest(loginPending, handleLogin);
  yield takeLatest(registrationPending.type, handleRegistration);
  yield takeLatest(logoutPending.type, handleLogout);
  yield takeLatest(checkAuthPending.type, handleCheckAuth);
  yield takeLatest(getProfilePending.type, handleProfile);
  yield takeLatest(updateProfileRequest.type, handleUpdateProfile);
}
