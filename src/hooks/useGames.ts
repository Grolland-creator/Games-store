import { useMemo } from "react";
import { IGame } from "../models/IGame";



export const useSortedGames = (games: IGame[], sort: string) => {
   const sortedGames = useMemo(() => {
      if (sort === 'name') {
         return [...games].sort((a, b) => a[sort].toString().localeCompare(b[sort].toString()))
      } else if (sort === 'price' || sort === 'rating' || sort === 'ageLimit') {
         return [...games].sort((a, b) => a[sort] - b[sort])
      }
      return games;
   }, [sort, games])

   return sortedGames;
}

export const useSearch = (games: IGame[], query: string) => {

   const searchedGames = () => {
      return games.filter(game => game.name.toLowerCase().includes(query.toLowerCase()))
   }

   return searchedGames();
}

export const useGames = (games: IGame[], sort: string, query: string) => {
   const sortedGames = useSortedGames(games, sort);

   const sortedAndSearchedGames = useMemo(() => {
      return sortedGames.filter(game => game.name.toLowerCase().includes(query.toLowerCase()))
   }, [query, sortedGames])

   return sortedAndSearchedGames;
}