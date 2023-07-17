import { IUser } from "../../../models/IUser";

export interface AuthState {
   isAuth: boolean;
   user: IUser;
   isLoading: boolean;
   signInError: string;
   signUpError: string;
}

export enum AuthActionEnum {
   SET_AUTH = "SET_AUTH",
   SET_SIGN_IN_ERROR = "SET_SIGN_IN_ERROR",
   SET_SIGN_UP_ERROR = "SET_SIGN_UP_ERROR",
   SET_USER = "SET_USER",
   SET_IS_LOADING = "SET_IS_LOADING",
   SET_DESCRIPTION = "SET_DESCRIPTION",
   SET_AVATAR = "SET_AVATAR",
}

export interface SetAuthAction {
   type: AuthActionEnum.SET_AUTH;
   payload: boolean;
}
export interface SetSignInErrorAction {
   type: AuthActionEnum.SET_SIGN_IN_ERROR;
   payload: string;
}
export interface SetSignUpErrorAction {
   type: AuthActionEnum.SET_SIGN_UP_ERROR;
   payload: string;
}
export interface SetUserAction {
   type: AuthActionEnum.SET_USER;
   payload: IUser;
}
export interface SetAvatarAction {
   type: AuthActionEnum.SET_AVATAR;
   payload: string;
}
export interface SetDescriptionAction {
   type: AuthActionEnum.SET_DESCRIPTION;
   payload: string;
}
export interface SetIsLoadingAction {
   type: AuthActionEnum.SET_IS_LOADING;
   payload: boolean;
}

export type AuthAction =
   SetAuthAction |
   SetUserAction |
   SetSignInErrorAction |
   SetSignUpErrorAction |
   SetIsLoadingAction |
   SetDescriptionAction |
   SetAvatarAction
