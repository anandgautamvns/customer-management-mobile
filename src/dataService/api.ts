import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from "expo-constants";
import Config from "react-native-config";

const { apiUrl } = Constants.expoConfig?.extra || {};
const apiUrl1 = Config.API_BASE_URL;

// Create an axios instance with the base URL.
export const api = axios.create({
  baseURL: `${apiUrl}api/`, // Replace with your API base URL
  // timeout: 10000,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

export const getAxiosWithoutToken = () => {
  api.interceptors.request.use(
    async (config) => {
      if (config.headers) {
        config.headers["Content-Type"] = `application/json`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => Promise.resolve(response),
    async (error) => {
      // On unauthorized, remove token (you can also dispatch logout here)
      if (error.response && error.response.status === 401) {
        await AsyncStorage.removeItem("token");
      }
      return Promise.reject(error);
    }
  );
  return api;
};

export const getAxiosToken = () => {
  api.interceptors.request.use(
    async (config) => {
      const token = await AsyncStorage.getItem("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers["Content-Type"] = `application/json`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => Promise.resolve(response),
    async (error) => {
      // On unauthorized, remove token (you can also dispatch logout here)
      if (error.response && error.response.status === 401) {
        await AsyncStorage.removeItem("token");
      }
      return Promise.reject(error);
    }
  );

  return api;
};
export const axiosAPIAuth = getAxiosWithoutToken();

export const axiosAPI = getAxiosToken();
