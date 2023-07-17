import { FC, PropsWithChildren } from 'react';
import cl from './Layout.module.scss';

const Layout: FC<PropsWithChildren> = ({children}) => {

   return (
      <div className={cl.wrapper}>
         {children}
      </div>
   )
}

export default Layout;