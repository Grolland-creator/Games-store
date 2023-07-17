import { FC } from 'react';
import cl from './Logo.module.scss'
import { Link } from 'react-router-dom';

interface logoProps {
   color?: string;
   fontSize?: string;
}

const Logo: FC<logoProps> = ({ color, fontSize }) => {

   return (
      <Link to="/">
         <div
            style={{ color: `${color || '#000'}`, fontSize: `${fontSize || '18px'}` }}
            className={cl.logo}
         >
            Games shop
         </div>
      </Link>
   )
}

export default Logo;