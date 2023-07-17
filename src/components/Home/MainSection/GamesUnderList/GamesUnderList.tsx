import { FC } from 'react';
import cl from './GamesUnderList.module.scss';
import { IGame } from '../../../../models/IGame';
import GameUnderCard from '../GameUnderCard/GameUnderCard';

interface PropsGamesUnderList {
   searchedGames: IGame[]
}

const GamesUnderList: FC<PropsGamesUnderList> = ({ searchedGames }) => {

   return (
      <div className={cl.container}>
         <div className={cl.games__items}>
            {searchedGames.length
               ?
               searchedGames.map((game: IGame, index) =>
                  <GameUnderCard
                     key={game.id}
                     title={game.name}
                     price={game.price}
                     id={game.id}
                     imgUrl={game.image} />
               )
               :
               <div className={cl.text}>По вашему запросу игр не найдено</div>
            }
         </div>
      </div>
   )
}

export default GamesUnderList;