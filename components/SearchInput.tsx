"use client"
import { useSearchContext } from '@/context/SearchContext';
import { BiSearch } from 'react-icons/bi';

export default function SearchInput() {
	const { searchQuery, setSearch } = useSearchContext();

	const handleSearch = () => {
	  // Call setSearch to update the searchQuery in the context
	  setSearch(searchQuery);
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
        			onChange={(e) => setSearch(e.target.value)}
					className={`border py-2 px-4 w-full border-grey rounded-md rounded-l-none focus:outline-none`}
				/>
			</div>
			<button onClick={handleSearch} className='button-primary py-2 px-4 font-semibold'>Search</button>
		</div>
	);
}
