import { AxiosError, AxiosResponse } from "axios";

export type APIResponse<T> = AxiosResponse<T>;

export type APIError = AxiosError;

export type PagableResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export interface PagableParams {
  search: string;
  ordering: string;
  page: number;
  page_size: number;
}
