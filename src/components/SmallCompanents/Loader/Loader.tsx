import { FC } from 'react';
import cl from './Loader.module.scss'

const Loader: FC = () => {

   return (
      <div className={cl.loader}></div>
   )
}

export default Loader;