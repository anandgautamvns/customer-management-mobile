import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  RegistrationRequest,
  RegistrationResponse,
  User,
} from "../redux-toolkit/auth/type";
import { APIResponse } from "../redux-toolkit/type";
import { axiosAPI, axiosAPIAuth } from "./api";

export const registrationAction = createAsyncThunk(
  "auth/registrationAction",
  async (request: RegistrationRequest, { rejectWithValue }) => {
    try {
      const response: APIResponse<RegistrationResponse> =
        await axiosAPIAuth.post("register/", request);

      const token = response.data.token;
      await AsyncStorage.setItem("token", token);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const loginAction = createAsyncThunk(
  "auth/loginAction",
  async (
    request: Pick<RegistrationRequest, "username" | "password">,
    { rejectWithValue }
  ) => {
    try {
      const response: APIResponse<RegistrationResponse> =
        await axiosAPIAuth.post("login/", request);

      const expiryTime = new Date().getTime() + 30 * 60 * 1000;
      const token = response.data.token;
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("expiryTime", expiryTime.toString());
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const logoutAction = createAsyncThunk(
  "auth/logoutAction",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      // await axiosAPIAuth.post("token/refresh/", { refresh: token });
      // const response: APIResponse<RegistrationResponse> =
      //   await axiosAPIAuth.post("logout/");
      const logoutAPI = new Promise((resolve, reject) => {
        if (token) {
          setTimeout(() => {
            resolve("logout success");
          }, 500);
        } else {
          reject("logout fail");
        }
      });

      await logoutAPI
        .then(async () => {
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("expiryTime");
        })
        .catch(async () => {
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("expiryTime");
        });
      // return response.data;
      return "logout success";
    } catch (error: any) {
      // You can handle errors as needed (e.g. return error.response.data)
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getProfileAction = createAsyncThunk(
  "auth/getProfileAction",
  async (_, { rejectWithValue }) => {
    try {
      const response: APIResponse<User> = await axiosAPI.get("profile/");
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const updateProfileAction = createAsyncThunk(
  "auth/updateProfileAction",
  async (request: Omit<User, "id">, { rejectWithValue }) => {
    try {
      const response: APIResponse<User> = await axiosAPI.patch(
        "profile/",
        request
      );
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);