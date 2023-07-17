import { FC, PropsWithChildren } from 'react';
import { useAppSelector } from '../../../hooks/redux';
import cl from './CartIcon.module.scss';

interface PropsCartIcon {
   className: string;
}

const CartIcon: FC<PropsWithChildren<PropsCartIcon>> = ({ className, children }) => {
   const { numberCart } = useAppSelector(state => state.cart)

   return (
      <div className={[cl.container, cl[className]].join(' ')}>
         {numberCart ? <span className={cl.numberCart}>{numberCart}</span> : ''}
         {children}
      </div>
   )
}

export default CartIcon;