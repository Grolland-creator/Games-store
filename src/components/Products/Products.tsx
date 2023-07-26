import { FC, useEffect, useState } from 'react';
import GameService from '../../api/GameService';
import { IGame } from '../../models/IGame';
import { useFetching } from '../../hooks/useFetching';
import ProductsList from './ProductsList/ProductsList';
import Loader from '../SmallCompanents/Loader/Loader';
import cl from './Products.module.scss';
import { getPageCount } from '../../utils/pages'
import { Pagination, Select } from 'antd';
import { useGames } from '../../hooks/useGames';
import GamesFilter from './GamesFilter/GamesFilter';

const selectOptions = [
   {
      value: '#',
      label: 'The number of elements on the page',
      disabled: true,
   },
   {
      value: '2',
      label: '2',
   },
   {
      value: '4',
      label: '4',
   },
   {
      value: '6',
      label: '6',
   },
   {
      value: '10',
      label: '10',
   },
   {
      value: '1000',
      label: 'Show all',
   },
]

const Products: FC = () => {
   const [games, setGames] = useState<IGame[]>([])
   const [filter, setFilter] = useState({ sort: '', query: '' })
   const sortedAndSearchedGames = useGames(games, filter.sort, filter.query);
   const [limit, setLimit] = useState<number>(5)
   const [page, setPage] = useState<number>(1)
   const [totalPages, setTotalPages] = useState(0);
   const [fetchGames, GamesLoading, GamesError] = useFetching(async (limit: number, page: number) => {
      const response = await GameService.getGames(limit, page);
      setGames(
         [
            ...response.data
         ])
      const totalCount = response.headers['x-total-count']
      setTotalPages(getPageCount(totalCount, limit));
   })

   const paginationOnChange = (page: number) => {
      setPage(page)
   }
   const filterOnChange = (limit: number) => {
      setLimit(limit)
   }

   useEffect(() => {
      fetchGames(limit, page)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [limit, page])


   return (
      <div className={cl.products}>
         <h1 className={cl.products__title}>Products</h1>
         <div className={cl.products__body}>
            <aside className={cl.saidbar}>
               <h2 className={cl.saidbar__title}>Filtration</h2>
               <div className={cl.gamesFilter}>
                  <GamesFilter
                     filter={filter}
                     setFilter={setFilter}
                  />
               </div>
               <div>
                  <Select
                     placeholder="The number of elements on the page"
                     optionFilterProp="children"
                     onChange={filterOnChange}
                     filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                     }
                     options={selectOptions}
                  />
               </div>
            </aside>
            <div className={cl.games}>
               {GamesError &&
                  <div style={{ color: 'red', fontSize: '20px' }}>
                     An error occurred when receiving a list of games: {GamesError}
                  </div>
               }
               {GamesLoading &&
                  <div className={cl.loader}>
                     <Loader />
                  </div>
               }
               <div className={cl.products__list}>
                  {sortedAndSearchedGames.length ?
                     <ProductsList games={sortedAndSearchedGames} />
                     : !GamesLoading ?
                        <div className={cl.noFound}>No games were found</div>
                        : ''
                  }
               </div>
               {limit < 100 &&
                  !GamesLoading &&
                  <div className={cl.pagination}>
                     <Pagination
                        onChange={paginationOnChange}
                        pageSize={limit}
                        total={totalPages * limit}
                        current={page} />
                  </div>
               }
            </div>
         </div>
      </div>
   )
}

export default Products;