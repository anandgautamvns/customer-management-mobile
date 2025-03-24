import {
  CreateCustomerRequest,
  CustomerEntity,
  CustomerRequest,
  CustomerResponse,
} from "../redux-toolkit/customer/type";
import { APIResponse } from "../redux-toolkit/type";
import { axiosAPI } from "./api";

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
