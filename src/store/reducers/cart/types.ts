export interface CartState {
   numberCart: number;
   cartItems: CartItem[]
}

export interface CartItem {
   price: number,
   name: string,
   amount: number,
   imgUrl: string, 
   id: number
}

export enum CartActionEnum {
   ADD_TO_CART = "ADD_TO_CART",
   ADD_TO_CART_INCREMENT = "ADD_TO_CART_INCREMENT",
   ADD_TO_CART_DECREMENT = "ADD_TO_CART_DECREMENT",
   DELETE_FROM_CART = "DELETE_FROM_CART",
   DELETE_ALL_FROM_CART = "DELETE_All_FROM_CART",
}

export interface AddToCartAction {
   type: CartActionEnum.ADD_TO_CART;
   price: number,
   name: string,
   imgUrl: string,
   id: number
}
export interface DeleteFromCartAction {
   type: CartActionEnum.DELETE_FROM_CART;
   name: string
}
export interface DeleteAllFromCartAction {
   type: CartActionEnum.DELETE_ALL_FROM_CART;
}

export interface AddToCartIncrementAction {
   type: CartActionEnum.ADD_TO_CART_INCREMENT;
   name: string
}
export interface AddToCartDecrementAction {
   type: CartActionEnum.ADD_TO_CART_DECREMENT;
   name: string
}



export type CartAction =
   AddToCartIncrementAction | 
   AddToCartAction | 
   AddToCartDecrementAction | 
   DeleteFromCartAction | 
   DeleteAllFromCartAction
   
