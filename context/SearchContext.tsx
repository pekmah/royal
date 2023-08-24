    "use client"


import useAuth from '@/hooks/useAuth';
    import React, {createContext, useContext, useState} from 'react';
import { useQuery } from 'react-query';
    // import { useQuery } from 'react-query';

    interface SearchProps{
        searchQuery:string
        setSearchQuery:React.Dispatch<React.SetStateAction<string>>
        setSearch: (query:string) => void
    }
    export const SearchContext = createContext({} as SearchProps);
    export const useSearchContext = () => useContext(SearchContext);


    const SearchContextProvider = ({children}:{children:React.ReactNode}) => {
        
        const [searchQuery, setSearchQuery] = useState('');
       
    

        const setSearch = (query:string) => {
        setSearchQuery(query);
        };

        return (
            <SearchContext.Provider
            value={{ searchQuery, setSearch, setSearchQuery }}>
                {children}
            </SearchContext.Provider>
        );
    };

    export default SearchContextProvider;
