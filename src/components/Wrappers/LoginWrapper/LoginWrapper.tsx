import { FC, PropsWithChildren } from 'react';
import cl from './LoginWrapper.module.scss';

const LoginWrapper: FC<PropsWithChildren> = ({ children }) => {

   return (
      <div className={cl.wrapper}>
         {children}
      </div>
   )
}

export default LoginWrapper;