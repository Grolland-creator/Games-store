import { FC } from 'react';
import cl from './GameUnderCard.module.scss';
import { Link } from 'react-router-dom';

interface PropsGameUnderCard {
   title: string;
   price: number;
   imgUrl: string;
   id: number;
}

const GameUnderCard: FC<PropsGameUnderCard> = ({ title, price, id, imgUrl }) => {

   return (
      <Link to={`/products/${id}`} className={cl.itemProduct}>
         <div className={cl.itemProduct__image}>
            <img src={imgUrl} className={cl.itemProduct__img} alt={title} />
         </div>
         <div className={cl.itemProduct__body}>
            <h4 className={cl.itemProduct__title}>{title}</h4>
            <div className={cl.itemProduct__price}>{price} $</div>
         </div>
      </Link>
   )
}

export default GameUnderCard;