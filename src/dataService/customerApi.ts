import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CreateCustomerRequest,
  CustomerEntity,
  CustomerRequest,
  CustomerResponse,
} from "../redux-toolkit/customer/type";
import { APIResponse } from "../redux-toolkit/type";
import { axiosAPI } from "./api";

export const createCustomerAction = createAsyncThunk(
  "customer/createCustomerAction",
  async (request: Omit<CreateCustomerRequest, "id">, { rejectWithValue }) => {
    try {
      const response: APIResponse<CustomerEntity> = await axiosAPI.post(
        "customers/",
        request
      );
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const getCustomersAction = createAsyncThunk(
  "customer/getCustomersAction",
  async (request: CustomerRequest, { rejectWithValue }) => {
    try {
      const response: APIResponse<CustomerResponse> = await axiosAPI.get(
        "customers/",
        {
          params: request,
        }
      );
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const getCustomerByIdAction = createAsyncThunk(
  "customer/getCustomerByIdAction",
  async (request: { id: string }, { rejectWithValue }) => {
    try {
      const response: APIResponse<CustomerEntity> = await axiosAPI.get(
        `customer/${request.id}/`
      );
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const updateCustomerAction = createAsyncThunk(
  "auth/updateCustomerAction",
  async (request: CreateCustomerRequest, { rejectWithValue }) => {
    try {
      const response: APIResponse<CustomerEntity> = await axiosAPI.patch(
        `customer/${request.id}/`,
        request
      );
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCustomerAction = createAsyncThunk(
  "auth/deleteCustomerAction",
  async (request: { id: string }, { rejectWithValue }) => {
    try {
      const response: APIResponse<CustomerEntity> = await axiosAPI.delete(
        `customer/${request.id}`
      );
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const deleteAllCustomerAction = createAsyncThunk(
  "auth/deleteAllCustomerAction",
  async (_, { rejectWithValue }) => {
    try {
      const response: APIResponse<CustomerEntity> = await axiosAPI.delete(
        "customers/deleteAll/"
      );
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const createCustomerApi = async (
  request: Omit<CreateCustomerRequest, "id">
) => {
  try {
    const response: APIResponse<CustomerEntity> = await axiosAPI.post(
      "customers/",
      request
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getCustomerApi = async (request: CustomerRequest) => {
  const params = request;
  try {
    const response: APIResponse<CustomerResponse> = await axiosAPI.get(
      "customers/",
      {
        params: request,
      }
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getCustomerByIdApi = async (request: { id: string }) => {
  try {
    const response: APIResponse<CustomerEntity> = await axiosAPI.get(
      `customer/${request.id}/`
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const updateCustomerApi = async (request: CreateCustomerRequest) => {
  try {
    const response: APIResponse<CustomerEntity> = await axiosAPI.patch(
      `customer/${request.id}/`,
      request
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteCustomerApi = async (request: { id: string }) => {
  try {
    const response: APIResponse<CustomerEntity> = await axiosAPI.delete(
      `customer/${request.id}`
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteAllCustomerApi = async () => {
  try {
    const response: APIResponse<CustomerEntity> = await axiosAPI.delete(
      "customers/deleteAll/"
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
