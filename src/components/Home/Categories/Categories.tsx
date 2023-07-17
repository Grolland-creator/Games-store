import { FC, PropsWithRef } from 'react';
import cl from './Categories.module.scss';
import CategoryList from './CategoryList/CategoryList';

const genres: string[] = ["Shooter", "Sandbox", "Simulator", "Action-adventure", "RPG", "Others genres"]

const Categories: FC<PropsWithRef<any>> = ({ myRef }) => {

   return (
      <div className={cl.wrapper}>
         <div className={cl.scroll} ref={myRef}></div>
         <div className={cl.container}>
            <h2 className={cl.title}>Categories</h2>
            <div className={cl.lists}>
               {genres.map((genre) =>
                  <CategoryList
                     key={Math.random()}
                     genre={genre}
                     genres={genres}
                  />
               )}
            </div>
         </div>
      </div>
   )
}

export default Categories;