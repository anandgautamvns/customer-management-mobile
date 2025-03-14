import { PayloadAction } from "@reduxjs/toolkit";
import { APIError } from "../type";

export type LoginPending = PayloadAction<Pick<RegistrationRequest, 'username' | 'password'>>
export type LoginSuccess = PayloadAction<RegistrationResponse>
export type LoginFailure = PayloadAction<APIError | null>

export type RegistrationPending = PayloadAction<RegistrationRequest>
export type RegistrationSuccess = PayloadAction<RegistrationResponse>
export type RegistrationFailure = PayloadAction<APIError | null>

export type LogoutPending = PayloadAction
export type LogoutSuccess = PayloadAction<LogoutResponse>
export type LogoutFailure = PayloadAction<APIError | null>

export type CheckAuthPending = PayloadAction
export type CheckAuthSuccess = PayloadAction<{token: string}>
export type CheckAuthFailure = PayloadAction<{token: string | null}>

export type ProfilePending = PayloadAction
export type ProfileSuccess = PayloadAction<User>
export type ProfileFailure = PayloadAction<APIError | null>

export type UpdateProfilePending = PayloadAction<Omit<User, 'id'>>
export type UpdateProfileSuccess = PayloadAction<User>
export type UpdateProfileFailure = PayloadAction<APIError | null>

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}
export interface RegistrationRequest { 
  username: string; 
  email: string; 
  first_name: string; 
  last_name: string; 
  password: string; 
  confirm_password: string; 
}

export interface RegistrationResponse {
  user: User;
  token: string;
}

export interface LogoutResponse {
  message: string;
  error: string;
}