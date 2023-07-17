import { FC } from 'react';
import cl from './Footer.module.scss';
import Logo from '../SmallCompanents/Logo/Logo';

const Footer: FC = () => {

   return (
      <footer className={cl.footer}>
         <div className={cl.container}>
            <div className={cl.footer__body}>
               <div className={cl.footer__logo}>
                  <Logo color='#fff' />
               </div>
               <ul className={cl.footer__links}>
                  <li className={cl.footer__link}>
                     <a href='##'>
                        <img src="../assets/img/footer-icons/Facebook.png" alt="facebook" />
                     </a>
                  </li>
                  <li className={cl.footer__link}>
                     <a href='##'>
                        <img src="../assets/img/footer-icons/instagram.png" alt="instagram" />
                     </a>
                  </li>
                  <li className={cl.footer__link}>
                     <a href='##'>
                        <img src="../assets/img/footer-icons/Twitter.png" alt="twitter" />
                     </a>
                  </li>
               </ul>
            </div>
         </div>
      </footer>
   )
}

export default Footer;