import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { CheckAuthFailure, CheckAuthPending, CheckAuthSuccess, LoginFailure, LoginPending, LoginSuccess, LogoutFailure, LogoutPending, LogoutSuccess, ProfileFailure, ProfilePending, ProfileSuccess, RegistrationFailure, RegistrationPending, RegistrationSuccess, UpdateProfileFailure, UpdateProfilePending, UpdateProfileSuccess, User } from './type';
import { APIError } from '../type';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: APIError | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login Actions
    loginPending(state, action: LoginPending) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: LoginSuccess) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
    },
    loginFailure(state, action: LoginFailure) {
      state.loading = false;
      state.error = action.payload;
    },

    // Registration Actions
    registrationPending(state, action: RegistrationPending) {
      const payload = action.payload;
      const type = action.type
      state.loading = true;
      state.error = null;
    },
    registrationSuccess(state, action: RegistrationSuccess) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
    },
    registrationFailure(state, action: RegistrationFailure) {
      state.loading = false;
      state.error = action.payload;
    },

    // Check Authentication (triggered on app startup)
    checkAuthPending(state, action: CheckAuthPending) {
      state.token = null;
    },
    checkAuthSuccess(state, action: CheckAuthSuccess) {
      state.token = action.payload.token;
    },
    checkAuthFailure(state, action: CheckAuthFailure) {
      state.token = action.payload.token;
    },

    // Logout Actions
    logoutPending(state, action: LogoutPending) {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess(state, action: LogoutSuccess) {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
    },
    logoutFailure(state, action: LogoutFailure) {
      state.loading = false;
      state.error = action.payload;
    },

     // Registration Actions
    getProfilePending(state, action: ProfilePending) {
      state.loading = true;
      state.error = null;
    },
    getProfileSuccess(state, action: ProfileSuccess) {
      state.user = action.payload;
      state.loading = false;
    },
    getProfileFailure(state, action: ProfileFailure) {
      state.loading = false;
      state.error = action.payload;
    },

    // Update Profile
    updateProfileRequest(state, action: UpdateProfilePending) {
      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess(state, action: UpdateProfileSuccess) {
      state.user = action.payload;
      state.loading = false;
    },
    updateProfileFailure(state, action: UpdateProfileFailure) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginPending,
  loginSuccess,
  loginFailure,
  registrationPending,
  registrationSuccess,
  registrationFailure,
  logoutPending,
  logoutSuccess,
  logoutFailure,
  checkAuthPending,
  checkAuthSuccess,
  checkAuthFailure,
  getProfilePending,
  getProfileSuccess,
  getProfileFailure,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
} = authSlice.actions;

export const authSelectors = {
  selectAuth: (state: AppState) => state.auth
}

export default authSlice;