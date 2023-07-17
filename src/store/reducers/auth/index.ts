import { AuthAction, AuthActionEnum, AuthState } from "./types";
import { IUser } from "../../../models/IUser";


const initialState: AuthState = {
   isAuth: false,
   signInError: '',
   signUpError: '',
   isLoading: false,
   user: {} as IUser
}

export default function authReducer(state = initialState, action: AuthAction): AuthState {
   switch (action.type) {
      case AuthActionEnum.SET_AUTH:
         return { ...state, isAuth: action.payload, isLoading: false }

      case AuthActionEnum.SET_USER:
         return { ...state, user: action.payload }

      case AuthActionEnum.SET_DESCRIPTION:
         return { ...state, user: { ...state.user, description: action.payload } }

      case AuthActionEnum.SET_AVATAR:
         return { ...state, user: { ...state.user, avatar: action.payload } }

      case AuthActionEnum.SET_SIGN_UP_ERROR:
         return { ...state, signUpError: action.payload, isLoading: false }

      case AuthActionEnum.SET_SIGN_IN_ERROR:
         return { ...state, signInError: action.payload, isLoading: false }

      case AuthActionEnum.SET_IS_LOADING:
         return { ...state, isLoading: action.payload }
         
      default:
         return state;
   }
}
