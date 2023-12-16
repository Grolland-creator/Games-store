import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import ProductsPage from '../pages/ProductsPage';
import AboutPage from '../pages/AboutPage';
import { useAppSelector } from '../hooks/redux';
import SignUp from '../pages/SignUpPage';
import SignIn from '../pages/SignInPage';
import CartPage from '../pages/CartPage';
import ProfilePage from '../pages/ProfilePage';
import ProductsItemPage from '../pages/ProductsItemPage';
import AdminPage from '../pages/AdminPage';
import HomePage from '../pages/HomePage';

const AppRouter: FC = () => {
   const { isAuth, user } = useAppSelector(state => state.auth);

   return (
      isAuth ?
         <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='*' element={<ErrorPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/products/:id' element={<ProductsItemPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            {user.isAdmin && <Route path='/admin-page' element={<AdminPage />} />}
         </Routes>
         :
         <Routes>
            <Route path='/signUp' element={<SignUp />} />
            <Route path='/signIn' element={<SignIn />} />
            <Route path='*' element={<SignIn/>} />
         </Routes>
   )
}

export default AppRouter;