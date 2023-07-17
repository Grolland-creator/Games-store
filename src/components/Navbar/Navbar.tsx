import { FC, useState } from 'react';
import cl from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';
import Logo from '../SmallCompanents/Logo/Logo';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { ShoppingCartOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import CartIcon from './CartIcon/CartIcon';

const Navbar: FC = () => {
   const { isAuth, user } = useAppSelector(state => state.auth)
   const [menuOpen, setMenuOpen] = useState<boolean>(false);

   return (
      <header className={cl.header}>
         <div className={cl.container}>
            <div className={cl.logoBlock}>
               <Logo />
            </div>
            {isAuth ?
               <>
                  <div className={`${cl.blockItems} ${menuOpen && cl.menuOpen}`}>
                     <NavLink
                        onClick={() => setMenuOpen(false)}
                        to="/"
                        className={cl.item + ' nav-link'}
                     >
                        Home
                     </NavLink>
                     <NavLink
                        onClick={() => setMenuOpen(false)}
                        to="/about"
                        className={cl.item + ' nav-link'}
                     >
                        About
                     </NavLink>
                     <NavLink
                        onClick={() => setMenuOpen(false)}
                        to="/products"
                        className={cl.item + ' nav-link'}
                     >
                        Products
                     </NavLink>
                  </div>
                  <div className={cl.blockLast}>
                     {user.isAdmin &&
                        <Link
                           to='/admin-page'
                           onClick={() => setMenuOpen(false)}
                           className={cl.settings}
                        >
                           <SettingOutlined />
                        </Link>
                     }
                     <Link to='/cart' onClick={() => setMenuOpen(false)}>
                        <CartIcon className="cart">
                           <ShoppingCartOutlined className={`cartHeaderIcon`} />
                        </CartIcon>
                     </Link>
                     <Link
                        to='/profile'
                        onClick={() => setMenuOpen(false)}
                     >
                        <Avatar src={user.avatar || './assets/img/defaultAvatar.jpg'} />
                     </Link>
                     <div
                        onClick={() => setMenuOpen(prev => !prev)}
                        className={`${cl.iconMenu} ${menuOpen && cl.menuOpen}`}>
                        <span></span>
                     </div>
                  </div>
               </>
               :
               <div className={cl.blockLast}>
                  <Link to='/signIn' className={[cl.signIn, cl.lastItem].join(' ')}>Sing in</Link>
                  <Link to='/signUp' className={[cl.signUp, cl.lastItem].join(' ')}>Sing up</Link>
               </div>
            }
         </div>
      </header>
   )
}

export default Navbar;