"use client"
import { useSearchContext } from '@/context/SearchContext';
import useAuth from '@/hooks/useAuth';
import { BiSearch } from 'react-icons/bi';
import {useState} from 'react'
import { useRouter } from 'next/navigation';

export default function SearchInput() {
	const { searchQuery, setSearch,setSearchQuery } = useSearchContext();
	// const [searchQuery, setSearchQuery] = useState('');
	const { search } = useAuth()
	const router = useRouter()

	const handleSearch = async () => {
		await search(searchQuery)
		router.refresh()
	  setSearch(searchQuery);
		// setSearchQuery('')
	};
  

	return (
		<div className='hidden md:flex w-full gap-4'>
			<div className='w-full flex items-center'>
				<label
					htmlFor='email'
					className={`border border-r-0 py-2 px-4 rounded-md rounded-r-none bg-white border-grey`}>
					<BiSearch size={'24px'} color='#DBDBDB' />
				</label>

				<input
					id={'search'}
					type={'text'}
					
					placeholder={'Search'}
					value={searchQuery}
        			onChange={(e) => setSearchQuery(e.target.value)}
					className={`border py-2 px-4 w-full border-grey rounded-md rounded-l-none focus:outline-none`}
				/>
			</div>
			<button onClick={handleSearch} className='button-primary py-2 px-4 font-semibold'>Search</button>
		</div>
	);
}
