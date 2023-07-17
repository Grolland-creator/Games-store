import { AddToCartAction, AddToCartDecrementAction, AddToCartIncrementAction, CartActionEnum, DeleteAllFromCartAction, DeleteFromCartAction } from "./types";



export const CartActionCreators = {
   AddToCart: (name: string, price: number, imgUrl: string, id: number): AddToCartAction => ({ type: CartActionEnum.ADD_TO_CART, price, name, imgUrl, id }),
   
   AddToCartIncrement: (name: string): AddToCartIncrementAction => ({ type: CartActionEnum.ADD_TO_CART_INCREMENT, name }),
   
   AddToCartDecrement: (name: string): AddToCartDecrementAction => ({ type: CartActionEnum.ADD_TO_CART_DECREMENT, name }),
   
   DeleteFromCart: (name: string): DeleteFromCartAction => ({ type: CartActionEnum.DELETE_FROM_CART, name }),
   
   DeleteAllFromCart: (): DeleteAllFromCartAction => ({ type: CartActionEnum.DELETE_ALL_FROM_CART }),
}