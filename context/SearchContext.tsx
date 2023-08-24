    "use client"
    import React, {createContext, useContext, useState} from 'react';

    interface SearchProps{
        searchQuery:string
        setSearchQuery:React.Dispatch<React.SetStateAction<string>>
        setSearch: (query:string) => void
        isSidebarOpen:boolean
        setIsSidebarOpen:React.Dispatch<React.SetStateAction<boolean>>
    }
    export const SearchContext = createContext({} as SearchProps);
    export const useSearchContext = () => useContext(SearchContext);


    const SearchContextProvider = ({children}:{children:React.ReactNode}) => {
        
        const [searchQuery, setSearchQuery] = useState('');
        const [isSidebarOpen, setIsSidebarOpen] = useState(true);

        const setSearch = (query:string) => {
        setSearchQuery(query);
        };

        return (
            <SearchContext.Provider
            value={{ searchQuery, setSearch, setSearchQuery, isSidebarOpen, setIsSidebarOpen }}>
                {children}
            </SearchContext.Provider>
        );
    };

    export default SearchContextProvider;
