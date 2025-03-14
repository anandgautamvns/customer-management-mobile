import { AxiosError, AxiosResponse } from "axios"

export type APIResponse<T> = AxiosResponse<T> 

export type APIError = AxiosError