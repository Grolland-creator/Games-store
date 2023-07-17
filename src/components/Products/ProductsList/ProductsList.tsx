import { FC } from 'react';
import GameCard from '../GameCard/GameCard';
import { IGame } from '../../../models/IGame';
import cl from './ProductsList.module.scss'

interface PropsProductsList {
   games: IGame[]
}

const ProductsList: FC<PropsProductsList> = ({ games }) => {

   return (
      <div className={cl.container}>
         <div className={cl.products__items}>
            {games.map((game: IGame) =>
               <GameCard
                  key={game.id}
                  title={game.name}
                  ageLimit={game.ageLimit}
                  price={game.price}
                  id={game.id}
                  imgUrl={game.image}
               />)
            }
         </div>
      </div>
   )
}

export default ProductsList;