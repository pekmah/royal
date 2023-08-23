"use client"

import React, {createContext, useContext, useState} from 'react';

interface SearchProps{
    searchQuery:string
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
        value={{ searchQuery, setSearch }}>
            {children}
        </SearchContext.Provider>
    );
};

export default SearchContextProvider;
