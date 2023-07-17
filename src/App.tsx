import { FC, useEffect, useCallback } from 'react';
import './App.scss';
import Layout from "./components/Wrappers/Layout/Layout";
import Navbar from './components/Navbar/Navbar';
import AppRouter from './router/AppRouter';
import Content from './components/Wrappers/Content/Content';
import Footer from './components/Footer/Footer';
import { useActions } from './hooks/redux';
import UserService from './api/UserService';
import HeaderMargin from './components/Navbar/HeaderMargin/HeaderMargin';

const App: FC = () => {
   const { setUser, setIsAuth } = useActions();

   const setUserFromdb = useCallback(async () => {
      try {
         const username = localStorage.getItem('username')
         const response = await UserService.getUsers()
         const User = response.data.find(user => (user.username === username));
         if (User) {
            setUser(User)
            setIsAuth(true)
         } else {
            localStorage.removeItem('auth')
            localStorage.removeItem('username')
            setIsAuth(false)
         }
      } catch (e) {
         localStorage.removeItem('auth')
         localStorage.removeItem('username')
         setIsAuth(false)
      }
   }, [setUser, setIsAuth])
   
   useEffect(() => {
      if (localStorage.getItem('auth') && localStorage.getItem('username')) {
         setUserFromdb()
      }
   }, [setUserFromdb])

   return (
      <Layout>
         <HeaderMargin/>
         <Navbar />
         <Content>
            <AppRouter />
         </Content>
         <Footer />
      </Layout>
   );
};

export default App;
