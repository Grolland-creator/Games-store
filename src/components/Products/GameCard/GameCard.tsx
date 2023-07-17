import { FC } from 'react';
import cl from './GameCard.module.scss';
import { Link } from 'react-router-dom';
import './GameGard.scss';
import { useActions, useAppSelector } from '../../../hooks/redux';
import { addToCart } from '../../../utils/addToCart';


interface PropsGameCard {
   title: string;
   price: number;
   imgUrl: string;
   id: number;
   ageLimit: number;
   genre?: string;
}

const GameCard: FC<PropsGameCard> = ({ title, price, ageLimit, imgUrl, id, genre }) => {
   const { AddToCart, AddToCartIncrement } = useActions()
   const { cartItems } = useAppSelector(state => state.cart)

   const onClickAddToCart = (e: any) => {
      if (cartItems.filter((item) => item.name === title).length) {
         addToCart(e.currentTarget, id, AddToCartIncrement, cl, title)
      } else {
         addToCart(e.currentTarget, id, AddToCart, cl, title, price, imgUrl)
      }
   }



   return (

      <article data-pid={id} className={cl.itemProduct}>
         <Link to={`/products/${id}`} className={cl.itemProduct__image}>
            <img src={imgUrl} className={cl.itemProduct__img} alt={title} />
         </Link>
         <div className={cl.itemProduct__body}>
            <div className={cl.itemProduct__content}>
               <h4 className={cl.itemProduct__title}><Link to={`/products/${id}`}>{title}</Link></h4>
               {genre && <div className={cl.itemProduct__genre}>Genre: {genre}</div>}
            </div>
            <div className={cl.itemProduct__prices}>
               <div className={cl.itemProduct__price}>{price} $</div>
               <p className={cl.itemProduct__ageLimit}>{ageLimit}+</p>
            </div>
            <div className={cl.actionsProduct__body}>
               <button
                  onClick={(e) => onClickAddToCart(e)}
                  className={[cl.actionsProduct__button, cl.btn, cl.btn_white].join(' ')}
               >
                  Add to cart
               </button>
            </div>
         </div>
      </article>
   )
}

export default GameCard;