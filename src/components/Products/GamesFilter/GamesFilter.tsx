import { FC } from 'react';
import { Input, Select } from 'antd';
import cl from './GamesFilter.module.scss';

interface PropsGamesFilter {
   filter: Filter;
   setFilter: Function;
}
interface Filter {
   sort: string;
   query: string;
}

const GamesFilter: FC<PropsGamesFilter> = ({ filter, setFilter }) => {

   return (
      <div className={cl.gamesFilter}>
         <div className={cl.input}>
            <Input
               value={filter.query}
               onChange={e => setFilter({ ...filter, query: e.target.value })}
               placeholder="search..."
            />
         </div>
         <div className={cl.select}>
            <Select
               placeholder="Sorting"
               optionFilterProp="children"
               value={filter.sort}
               onChange={selectedSort => setFilter({ ...filter, sort: selectedSort })}
               options={[
                  { value: '', label: 'Sorting' , disabled: true},
                  { value: 'name', label: 'By name' },
                  { value: 'price', label: 'By price' },
                  { value: 'rating', label: 'By rating' },
                  { value: 'ageLimit', label: 'By age limitation' }
               ]}
            />
         </div>
      </div>
   )
}

export default GamesFilter;