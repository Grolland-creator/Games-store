import { CartAction, CartActionEnum, CartState } from "./types";

const initialState: CartState = {
   numberCart: 0,
   cartItems: []
}

export default function cartReducer(state = initialState, action: CartAction): CartState {
   switch (action.type) {
      case CartActionEnum.ADD_TO_CART:
         return { ...state, numberCart: state.numberCart + 1, cartItems: [...state.cartItems, { price: action.price, name: action.name, amount: 1, imgUrl: action.imgUrl, id: action.id }] }

      case CartActionEnum.DELETE_FROM_CART:
         // Find and cut out the desired object
         const index = state.cartItems.findIndex((i) => i.name === action.name)
         const arr = [...state.cartItems]
         const number = arr[index].amount
         arr.splice(index, 1)
         return { ...state, numberCart: state.numberCart - number, cartItems: [...arr] }

      case CartActionEnum.ADD_TO_CART_DECREMENT:
         // Decrement Amount in the right Object
         const index1 = state.cartItems.findIndex((i) => i.name === action.name)
         const arr1 = [...state.cartItems]
         arr1[index1].amount = arr1[index1].amount - 1
         return { ...state, numberCart: state.numberCart - 1, cartItems: [...arr1] }

      case CartActionEnum.ADD_TO_CART_INCREMENT:
         // Increment Amount in the right object
         const index2 = state.cartItems.findIndex((i) => i.name === action.name)
         const arr2 = [...state.cartItems]
         arr2[index2].amount = arr2[index2].amount + 1
         return { ...state, numberCart: state.numberCart + 1, cartItems: [...arr2] }

      case CartActionEnum.DELETE_ALL_FROM_CART:
         return { ...state, numberCart: 0, cartItems: [] }

      default:
         return state;
   }
}