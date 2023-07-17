import { FC } from 'react';
import cl from './Cart.module.scss';
import { useActions, useAppSelector } from '../../hooks/redux';
import { message } from 'antd';
import ModalBuyCart from './ModalBuyCart/ModalBuyCart';
import { Link } from 'react-router-dom';

const Cart: FC = () => {
   const { cartItems } = useAppSelector(state => state.cart)
   const { AddToCartIncrement, DeleteFromCart, AddToCartDecrement } = useActions()
   const [messageApi, contextHolder] = message.useMessage();


   const totalCount = cartItems.reduce((acc, item) => acc + item.amount, 0)
   const totalPrice = Math.round(cartItems.reduce((acc, item) => acc + Math.round(item.price * item.amount * 100) / 100, 0) * 100) / 100

   return (
      <div className={cl.container}>
         {contextHolder}
         <div className={cl.title}>Cart of games</div>
         <div className={cl.body}>
            {cartItems.map((item) =>
               <div key={Math.random()} className={cl.item}>
                  <div className={cl.form}>
                     <Link className={cl.form__image} to={`/products/${item.id}`}>
                        <img
                           src={item.imgUrl}
                           className={cl.form__img}
                           alt={`${item.name}`}
                        />
                     </Link>
                     <h3 className={cl.form__name}>
                        <Link to={`/products/${item.id}`}>{item.name}</Link>
                     </h3>
                     <div className={cl.prices}>
                        <div className={cl.form__price}>
                           <span>Price for one game: </span>
                           <span>{item.price} $</span>
                        </div>
                        <div className={cl.general__count}>
                           <span>Total price: </span>
                           <span>{Math.round(item.price * item.amount * 100) / 100} $</span>
                        </div>
                     </div>
                     <div className={cl.count}>
                        {item.amount > 1 &&
                           <button
                              onClick={() => AddToCartDecrement(item.name)}
                              className={cl.decrementCount}
                           >
                              -
                           </button>
                        }
                        <div className={cl.gameCount}>
                           {item.amount}
                        </div>
                        <button onClick={() => AddToCartIncrement(item.name)}
                           className={cl.incrementCount}
                        >
                           +
                        </button>
                     </div>
                     <button
                        onClick={() => DeleteFromCart(item.name)}
                        className={cl.close}
                     >
                        +
                     </button>
                  </div>
               </div>
            )}
            {cartItems.reduce((acc, item) => acc + item.price, 0)
               ?
               <div className={cl.footer}>
                  <div className={cl.footer__left}>
                     Total: {totalCount}
                  </div>
                  <ModalBuyCart messageApi={messageApi} totalPrice={totalPrice} />
                  <div className={cl.footer__right}>
                     Total price: {totalPrice} $
                  </div>
               </div>
               :
               <div className={cl.empty}>The cart is empty</div>
            }
         </div>
      </div>
   )
}

export default Cart;