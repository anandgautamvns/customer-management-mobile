import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import Constants from 'expo-constants';
import { RegistrationRequest, RegistrationResponse, UpdateProfilePending, User } from '../redux/auth/type';
import { APIError, APIResponse } from '../redux/type';
import { api, axiosAPI } from './api';

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
    // await api.post('token/refresh/', { refresh: token })
    // const response: APIResponse<RegistrationResponse> = await api.post('logout/',);
    // return response.data;
    const logoutAPI = new Promise((resolve, reject) => {
      if (token) {
        setTimeout(() => {
          resolve('logout success')
        }, 500);
      } else {
        reject('logout fail')
      }
    })
    const response = await logoutAPI;
    return response;
  } catch (error) {
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const response: APIResponse<User> = await axiosAPI.get('profile/',);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const updateProfile = async (request: Omit<User, 'id'>) => {
  try {
    const response: APIResponse<User> = await axiosAPI.patch('profile/', request);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};