import { PayloadAction } from "@reduxjs/toolkit";
import { APIError, PagableParams, PagableResponse } from "../type";

export type GetCustomerPending = PayloadAction<CustomerRequest>
export type GetCustomerSuccess = PayloadAction<CustomerResponse>
export type GetCustomerFailure = PayloadAction<APIError | null>

export type CreateCustomerPending = PayloadAction<Omit<CreateCustomerRequest, 'id'>>
export type CreateCustomerSuccess = PayloadAction<CustomerEntity>
export type CreateCustomerFailure = PayloadAction<APIError | null>

export type GetCustomerByIdPending = PayloadAction<{id: string}>
export type GetCustomerByIdSuccess = PayloadAction<CustomerEntity>
export type GetCustomerByIdFailure = PayloadAction<APIError | null>

export type UpdateCustomerPending = PayloadAction<CreateCustomerRequest>
export type UpdateCustomerSuccess = PayloadAction<CustomerEntity>
export type UpdateCustomerFailure = PayloadAction<APIError | null>

export type UpdateAllCustomerPending = PayloadAction
export type UpdateAllCustomerSuccess = PayloadAction<CustomerEntity>
export type UpdateAllCustomerFailure = PayloadAction<APIError | null>

export type DeleteCustomerPending = PayloadAction<{id: string}>
export type DeleteCustomerSuccess = PayloadAction<CustomerEntity>
export type DeleteCustomerFailure = PayloadAction<APIError | null>

export type DeleteAllCustomerPending = PayloadAction
export type DeleteAllCustomerSuccess = PayloadAction<CustomerEntity>
export type DeleteAllCustomerFailure = PayloadAction<APIError | null>

export interface CustomerState {
  data: CustomerResponse,
  loading: boolean;
  error: APIError | null;
  customerInfo: CustomerEntity | null;
}

export interface CustomerEntity {
  id: string;
  first_name: string;
  last_name: string;
  dob: string;
  phone_number: string;
  age: number;
  email: string;
  gender: string;
  is_employee: boolean;
  created_at: string;
  modified_at: string;
}

export interface CreateCustomerRequest {
  id: string;
  first_name: string;
  last_name: string;
  dob: string;
  phone_number: string;
  email: string;
  gender: string;
  is_employee: boolean,
}

export type CustomerRequest = PagableParams
export type CustomerResponse = PagableResponse<CustomerEntity>
