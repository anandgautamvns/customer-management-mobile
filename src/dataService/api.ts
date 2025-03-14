import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import Constants from 'expo-constants';
import { RegistrationRequest, RegistrationResponse, UpdateProfilePending, User } from '../redux/auth/type';
import { APIError, APIResponse } from '../redux/type';

const { apiUrl } = Constants.expoConfig?.extra || {}
const apiUrl1 = Config.API_BASE_URL;
console.log('API URL-api:', { apiUrl, apiUrl1, Config });

// Create an axios instance with the base URL.
const api = axios.create({
  baseURL: `${apiUrl}api/`, // Replace with your API base URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

const getAxiosToken = () => {
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

// Registration API call: sends a POST request to /register with user data.
export const registrationUser = async (request: RegistrationRequest) => {
  try {
    const response: APIResponse<RegistrationResponse> = await api.post('register/', request);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

// Login API call: sends a POST request to /login with user credentials.
export const loginUser = async (request: Pick<RegistrationRequest, 'username' | 'password'>) => {
  try {
    const response: APIResponse<RegistrationResponse> = await api.post('login/', request);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Logout API call: removes token from local storage and, if needed, notifies the server.
export const logoutUser = async () => {
  try {
    
    const token = await AsyncStorage.getItem('token');
    await api.post('token/refresh/', {refresh: token})
    const response: APIResponse<RegistrationResponse> = await api.post('logout/',);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProfile = async () => {
  const axiosAPI = getAxiosToken()
  try {
    const response: APIResponse<User> = await axiosAPI.get('profile/',);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const updateProfile = async (request: Omit<User, 'id'>) => {
  const axiosAPI = getAxiosToken()
  try {
    const response: APIResponse<User> = await axiosAPI.patch('profile/', request);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
