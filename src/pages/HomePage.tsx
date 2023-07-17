import { FC, useEffect } from 'react';
import Home from '../components/Home/Home';

const HomePage: FC = () => {

   useEffect(() => {
      localStorage.removeItem('navigate')
   })
   return (
     <Home/>
   )
}

export default HomePage;