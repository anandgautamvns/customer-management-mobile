import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import Constants from 'expo-constants';

const { apiUrl } = Constants.expoConfig?.extra || {}
const apiUrl1 = Config.API_BASE_URL;

// Create an axios instance with the base URL.
export const api = axios.create({
  baseURL: `${apiUrl}api/`, // Replace with your API base URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

export const getAxiosToken = () => {
  api.interceptors.request.use(
    async (config) => {
      const token = await AsyncStorage.getItem('token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      // On unauthorized, remove token (you can also dispatch logout here)
      if (error.response && error.response.status === 401) {
        await AsyncStorage.removeItem('token');
      }
      return Promise.reject(error);
    }
  );

  return api
}

export const axiosAPI = getAxiosToken()
