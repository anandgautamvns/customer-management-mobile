import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import {
  CreateCustomerFailure,
  CreateCustomerPending,
  CreateCustomerSuccess,
  CustomerState,
  DeleteAllCustomerFailure,
  DeleteAllCustomerPending,
  DeleteAllCustomerSuccess,
  DeleteCustomerFailure,
  DeleteCustomerPending,
  DeleteCustomerSuccess,
  GetCustomerByIdFailure,
  GetCustomerByIdPending,
  GetCustomerByIdSuccess,
  GetCustomerFailure,
  GetCustomerPending,
  GetCustomerSuccess,
  UpdateAllCustomerFailure,
  UpdateAllCustomerPending,
  UpdateAllCustomerSuccess,
  UpdateCustomerFailure,
  UpdateCustomerPending,
  UpdateCustomerSuccess,
} from "./type";

const initialState: CustomerState = {
  data: {
    count: 0,
    next: null,
    previous: null,
    results: []
  },
  customerInfo: null,
  loading: false,
  error: null,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    createCustomerPending(state, action: CreateCustomerPending) {
      return {
        ...state,
        loading: true
      }
    },
    createCustomerSuccess(state, action: CreateCustomerSuccess) {
      return {
        ...state,
        loading: false,
        customerInfo: action.payload
      }
    },
    createCustomerFailure(state, action: CreateCustomerFailure) {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    },

    getCustomerPending(state, action: GetCustomerPending) {
      return {
        ...state,
        loading: true
      }
    },
    getCustomerSuccess(state, action: GetCustomerSuccess) {
      return {
        ...state,
        loading: false,
        data: action.payload
      }
    },
    getCustomerFailure(state, action: GetCustomerFailure) {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    },

    getCustomerByIdPending(state, action: GetCustomerByIdPending) {
      return {
        ...state,
        loading: true
      }
    },
    getCustomerByIdSuccess(state, action: GetCustomerByIdSuccess) {
      return {
        ...state,
        loading: false,
        customerInfo: action.payload
      }
    },
    getCustomerByIdFailure(state, action: GetCustomerByIdFailure) {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    },

    updateCustomerPending(state, action: UpdateCustomerPending) {
      return {
        ...state,
        loading: true
      }
    },
    updateCustomerSuccess(state, action: UpdateCustomerSuccess) {
      return {
        ...state,
        loading: false,
        customerInfo: action.payload
      }
    },
    updateCustomerFailure(state, action: UpdateCustomerFailure) {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    },

    updateAllCustomerPending(state, action: UpdateAllCustomerPending) {
      return {
        ...state,
        loading: true
      }
    },
    updateAllCustomerSuccess(state, action: UpdateAllCustomerSuccess) {
      return {
        ...state,
        loading: false,
        customerInfo: action.payload
      }
    },
    updateAllCustomerFailure(state, action: UpdateAllCustomerFailure) {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    },

    deleteCustomerPending(state, action: DeleteCustomerPending) {
      return {
        ...state,
        loading: true
      }
    },
    deleteCustomerSuccess(state, action: DeleteCustomerSuccess) {
      return {
        ...state,
        loading: false,
        customerInfo: action.payload
      }
    },
    deleteCustomerFailure(state, action: DeleteCustomerFailure) {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    },

    deleteAllCustomerPending(state, action: DeleteAllCustomerPending) {
      return {
        ...state,
        loading: true
      }
    },
    deleteAllCustomerSuccess(state, action: DeleteAllCustomerSuccess) {
      return {
        ...state,
        loading: false,
        customerInfo: action.payload
      }
    },
    deleteAllCustomerFailure(state, action: DeleteAllCustomerFailure) {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    },

  },
});

export const customerSelectors = {
  selectCustomer: (state: AppState) => state.customer
}

export default customerSlice;