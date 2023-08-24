    "use client"
import useAuth from '@/hooks/useAuth';
import { ProductEntity } from '@/types/product/Product';
    import React, {createContext, useContext, useState} from 'react';
    interface SearchProps{
        searchQuery:string
        setSearchQuery:React.Dispatch<React.SetStateAction<string>>
        setSearch: (query:string) => void
        isSidebarOpen:boolean
        setIsSidebarOpen:React.Dispatch<React.SetStateAction<boolean>>
        searchCount:number
        setSearchCount:React.Dispatch<React.SetStateAction<number>>
        Search:ProductEntity[]
        handleSearch:()=> void
        setSearches:React.Dispatch<React.SetStateAction<ProductEntity[]>>

    }
    export const SearchContext = createContext({} as SearchProps);
    export const useSearchContext = () => useContext(SearchContext);


    const SearchContextProvider = ({children}:{children:React.ReactNode}) => {
        const { search } = useAuth()
        const [searchQuery, setSearchQuery] = useState('');
        const [isSidebarOpen, setIsSidebarOpen] = useState(true);
        const [searchCount, setSearchCount] = useState(0);
	    const [Search, setSearches] = useState<ProductEntity[]>([])

        const setSearch = (query:string) => {
        setSearchQuery(query);
        };
        // console.log(Search)

      
	

	const handleSearch = async () => {
		try {
		  const searchData = await search(searchQuery);
		  setSearch(searchQuery);
		  setSearchCount(searchData?.length || 0);
		  setSearches(searchData)
		} catch (error) {
		  console.error('Error searching:', error);
		}
	  };
console.log
        return (
            <SearchContext.Provider
            value={{ searchQuery, setSearch, setSearchQuery, isSidebarOpen, setIsSidebarOpen, handleSearch, searchCount, setSearchCount, setSearches, Search }}>
                {children}
            </SearchContext.Provider>
        );
    };

    export default SearchContextProvider;
