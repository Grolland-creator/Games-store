import { AuthActionEnum, SetAuthAction, SetAvatarAction, SetDescriptionAction, SetIsLoadingAction, SetSignInErrorAction, SetSignUpErrorAction, SetUserAction } from "./types";
import { IUser } from "../../../models/IUser";
import { AppDispatch } from "../../index";
import UserService from "../../../api/UserService";
import bcrypt from 'bcryptjs';

const saveToLocalStorage = (mockUser: IUser) => {
   localStorage.setItem('auth', 'true');
   localStorage.setItem('username', mockUser.username);
}


export const AuthActionCreators = {
   setUser: (user: IUser): SetUserAction => ({ type: AuthActionEnum.SET_USER, payload: user }),
   
   setDescription: (payload: string): SetDescriptionAction => ({ type: AuthActionEnum.SET_DESCRIPTION, payload }),
   
   setAvatar: (payload: string): SetAvatarAction => ({ type: AuthActionEnum.SET_AVATAR, payload }),
   
   setIsAuth: (auth: boolean): SetAuthAction => ({ type: AuthActionEnum.SET_AUTH, payload: auth }),
   
   setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type: AuthActionEnum.SET_IS_LOADING, payload }),
   
   setSignInError: (payload: string): SetSignInErrorAction => ({ type: AuthActionEnum.SET_SIGN_IN_ERROR, payload }),
   
   setSignUpError: (payload: string): SetSignUpErrorAction => ({ type: AuthActionEnum.SET_SIGN_UP_ERROR, payload }),
   
   login: (username: string, password: string, remember: boolean, navigate: Function) => async (dispatch: AppDispatch) => {
      try {
         dispatch(AuthActionCreators.setIsLoading(true));
         const response = await UserService.getUsers()
         const mockUser = response.data.find(user => (user.username === username || user.email === username) && bcrypt.compareSync(password, user.password));
         if (mockUser) {
            remember && saveToLocalStorage(mockUser)
            dispatch(AuthActionCreators.setUser(mockUser));
            dispatch(AuthActionCreators.setIsAuth(true))
            navigate('/')
         } else {
            dispatch(AuthActionCreators.setSignInError('Incorrect login or password'));
         }
         dispatch(AuthActionCreators.setIsLoading(false));

      } catch (e) {
         dispatch(AuthActionCreators.setSignInError('There was an error under the login'))
      }
   },
   
   registration: (username: string, password: string, email: string, remember: boolean, navigate: Function) => async (dispatch: AppDispatch) => {
      try {
         dispatch(AuthActionCreators.setIsLoading(true));
         const response = await UserService.getUsers()
         const arrUsers = response.data.filter(user => (user.username === username));
         const arrEmail = response.data.filter(user => (user.email === email));
         const hashPassword = bcrypt.hashSync(password, 7)
         if (arrUsers.length > 0) {
            dispatch(AuthActionCreators.setSignUpError('There is already an account with username, username should be unique'))
         } else if (arrEmail.length > 0) {
            dispatch(AuthActionCreators.setSignUpError('There is already an account with email data'))
         } else {
            const mockUser = { username, password: hashPassword, email, id: username, isAdmin: false }
            await UserService.addUser(mockUser)
            remember && saveToLocalStorage(mockUser)
            dispatch(AuthActionCreators.setUser(mockUser));
            dispatch(AuthActionCreators.setIsAuth(true))
            dispatch(AuthActionCreators.setIsLoading(false));
            navigate('/')
         }
      } catch (e) {
         dispatch(AuthActionCreators.setSignUpError('An error occurred during registration'))
      }
   },
   logout: () => async (dispatch: AppDispatch) => {
      localStorage.removeItem('auth')
      localStorage.removeItem('username')
      dispatch(AuthActionCreators.setUser({} as IUser));
      dispatch(AuthActionCreators.setIsAuth(false))
   }
}
