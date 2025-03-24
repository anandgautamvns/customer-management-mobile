import { createSlice } from "@reduxjs/toolkit";
import {
  getProfileAction,
  loginAction,
  logoutAction,
  registrationAction,
  updateProfileAction,
} from "../../dataService/authApi";
import { AppState } from "../store";
import {
  AuthState,
  CheckAuthFailure,
  CheckAuthPending,
  CheckAuthSuccess,
} from "./type";

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkAuthPending(state, action: CheckAuthPending) {
      state.token = null;
    },
    checkAuthSuccess(state, action: CheckAuthSuccess) {
      state.token = action.payload.token;
    },
    checkAuthFailure(state, action: CheckAuthFailure) {
      state.token = action.payload.token;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registrationAction.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(registrationAction.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          user: action.payload.user,
          token: action.payload.token,
        };
      })
      .addCase(registrationAction.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          user: null,
          error: action.payload,
        };
      })

      .addCase(loginAction.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          user: action.payload.user,
          token: action.payload.token,
        };
      })
      .addCase(loginAction.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          user: null,
          error: action.payload,
        };
      })

      .addCase(logoutAction.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          user: null,
          token: null,
        };
      })
      .addCase(logoutAction.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          user: null,
          token: null,
          error: action.payload,
        };
      })

      .addCase(getProfileAction.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(getProfileAction.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          user: action.payload,
        };
      })
      .addCase(getProfileAction.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          user: null,
          error: action.payload,
        };
      })

      .addCase(updateProfileAction.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(updateProfileAction.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          user: action.payload,
        };
      })
      .addCase(updateProfileAction.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          user: null,
          error: action.payload,
        };
      });
  },
});

export const authSelectors = {
  selectAuth: (state: AppState) => state.auth,
};

export default authSlice;
