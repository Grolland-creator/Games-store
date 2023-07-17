import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/index";
import { bindActionCreators } from "redux";
import { allActionCreators } from "../store/reducers/action-creators";

export const useActions = () => {
   const dispatch = useDispatch();
   return bindActionCreators(allActionCreators, dispatch);
}

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;