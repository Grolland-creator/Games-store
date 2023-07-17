import { FC } from 'react';
import cl from './About.module.scss';

const About: FC = () => {

   return (
      <div className={cl.wrapper}>
         <div className={cl.container}>
            <div className={cl.title}>
               <span>About us</span>
            </div>
            <div className={cl.text}>
               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel eos quo, veniam voluptate dolorem incidunt reprehenderit vero maiores nihil dignissimos numquam? Ducimus accusamus excepturi odit dolores autem pariatur commodi. Error iusto accusantium totam unde incidunt est nostrum, ducimus laborum saepe esse dolorum
            </div>
         </div>
      </div>
   )
}

export default About;