import {AuthActionCreators} from "./auth/action-creators";
import { CartActionCreators } from "./cart/action-creators";

export const allActionCreators = {
    ...AuthActionCreators,
    ...CartActionCreators
}
