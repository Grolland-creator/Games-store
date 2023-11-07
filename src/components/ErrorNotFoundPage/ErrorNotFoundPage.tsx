import { FC } from 'react';
import cl from './ErrorNotFoundPage.module.scss'
import { useNavigate } from 'react-router-dom';

const ErrorNotFoundPage: FC = () => {
   const navigate = useNavigate()
   return (
      <div className={cl.block}>
         <h1 className={cl.title}>This page was not found</h1>
         <p className={cl.text}>
            It seems that you have switched to a page which does not exist or it is not available to you, check the url address of the page you need
         </p>
         <button
            onClick={(e) => navigate(-1)}
            className={cl.button}
         >
            Go to the previous page
         </button>
      </div>
   )
}

export default ErrorNotFoundPage;