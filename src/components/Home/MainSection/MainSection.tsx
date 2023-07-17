import { FC, useState, useEffect, useCallback } from 'react';
import cl from './MainSection.module.scss';
import Logo from '../../SmallCompanents/Logo/Logo';
import { Input } from 'antd';
import { IGame } from '../../../models/IGame';
import { useSearch } from '../../../hooks/useGames';
import GameService from '../../../api/GameService';
import GamesUnderList from './GamesUnderList/GamesUnderList';

interface PropsMainSection {
   myRef: any;
}

const MainSection: FC<PropsMainSection> = ({ myRef }) => {
   const [query, setQuery] = useState<string>('');
   const [games, setGames] = useState<IGame[]>([])
   const [focus, setFocus] = useState<boolean>();
   const searchedGames = useSearch(games, query)
   const searchedGamesToProps = searchedGames.filter((game, index) => index < 15)


   const onClickScroll = useCallback(() => {
      window.scrollTo({ top: myRef.current.getBoundingClientRect().y - 50 + window.scrollY, behavior: 'smooth' })
   }, [myRef])

   useEffect(() => {
      const fetchGames = async () => {
         const response = await GameService.getGames(1000);
         setGames([...response.data])
      }
      fetchGames()
   }, [])

   return (
      <div className={cl.wrapper}>
         <div className={cl.container}>
            <div className={cl.blockText}>
               <h1 className={cl.logo}>
                  <Logo fontSize={document.documentElement.clientWidth > 479 ? '70px' : '40px' } />
               </h1>
               <div className={cl.text}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis ut tempore nemo quod molestias consequuntur doloremque quos nulla, qui distinctio.
               </div>
            </div>
            <div className={cl.inputBlock}>
               <div className={cl.inputText}>Global search for games by name:</div>
               <Input
                  className={cl.input}
                  value={query}
                  onChange={e => {
                     setQuery(e.target.value)
                  }}
                  onFocus={() => {
                     setFocus(true)
                  }}
                  onBlur={() => {
                     setTimeout(() => setFocus(false), 100)
                  }}
                  placeholder="search..."
               />
               {query && focus &&
                  <GamesUnderList searchedGames={searchedGamesToProps} />
               }
            </div>
            <div className={cl.scrollDown} onClick={() => onClickScroll()}>
               <button className={cl.scrollDownImage}>
                  <img src="../assets/img/scroll.png" alt="Arrows for scroll" />
               </button>
            </div>
         </div>
      </div>
   )
}

export default MainSection;