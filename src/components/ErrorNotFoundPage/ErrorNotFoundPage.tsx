import { FC } from 'react';
import cl from './ErrorNotFoundPage.module.scss'
import { useNavigate } from 'react-router-dom';

const ErrorNotFoundPage: FC = () => {
   const navigate = useNavigate()
   return (
      <div className={cl.block}>
         <h1 className={cl.title}>Данная страница не найдена</h1>
         <p className={cl.text}>
            Похоже что вы перешли на страницу которой не существует или она вам не доступна, проверьте url адресс нужной вам страницы
         </p>
         <button
            onClick={(e) => navigate(-1)}
            className={cl.button}
         >
            Перейти на предыдущею страницу
         </button>
      </div>
   )
}

export default ErrorNotFoundPage;