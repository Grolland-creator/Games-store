import { FC, useEffect, useState } from 'react';
import cl from './CategoryList.module.scss';
import GameService from '../../../../api/GameService';
import { IGame } from '../../../../models/IGame';
import GameCard from '../../../Products/GameCard/GameCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, A11y } from 'swiper';
import './CategoryList.scss';

import 'swiper/css';
import 'swiper/css/scrollbar';

interface PropsCategory {
   genre: string;
   genres: string[];
}

const CategoryList: FC<PropsCategory> = ({ genre, genres }) => {
   const [games, setGames] = useState<IGame[]>([])



   useEffect(() => {
      const fetchGames = async () => {
         const response = await GameService.getGames(1000);
         if (genre === "Others genres") {
            const filteredGames = response.data.filter((g) => !genres.some((genre) => g.genre === genre))
            setGames(filteredGames)
         } else {
            const filteredGames = response.data.filter((g) => g.genre === genre)
            setGames(filteredGames)
         }
      }
      fetchGames()
   }, [genre, genres])


   return (
      games.length
         ?
         <div className={cl.container}>
            <h3 className={cl.title}>{genre}</h3>
            <div className={cl.swiper}>
               <Swiper
                  // install Swiper modules
                  modules={[Scrollbar, A11y]}
                  scrollbar={{ draggable: true }}
                  slidesPerView={document.documentElement.clientWidth > 768 ? 4 : document.documentElement.clientWidth > 560 ? 3 : document.documentElement.clientWidth > 380 ? 2 : 1}
               >
                  {games.map((game: IGame) =>
                     <SwiperSlide key={game.id}>
                        <div className={cl.card}>
                           <GameCard
                              title={game.name}
                              genre={genre === "Others genres" ? game.genre : ''}
                              ageLimit={game.ageLimit}
                              price={game.price}
                              id={game.id}
                              imgUrl={game.image}
                           />
                        </div>
                     </SwiperSlide>
                  )}
               </Swiper>
            </div>
         </div>
         :
         <div></div>
   )
}

export default CategoryList;