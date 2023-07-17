import { FC, useRef } from 'react';
import MainSection from './MainSection/MainSection';
import Categories from './Categories/Categories';

const Home: FC = () => {
   const myRef = useRef(null)

   return (
      <div>
         <MainSection myRef={myRef}/>
         <Categories myRef={myRef}/>
      </div>
   )
}

export default Home;