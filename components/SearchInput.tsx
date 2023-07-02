import { BiSearch } from 'react-icons/bi';

export default function SearchInput() {
	return (
		<div className='flex w-full gap-4'>
			<div className='w-full flex items-center'>
				<label
					htmlFor='email'
					className={`border border-r-0 py-2 px-4 rounded-md rounded-r-none bg-white border-gray`}>
					<BiSearch size={'24px'} color='#DBDBDB' />
				</label>

				<input
					id={'search'}
					type={'text'}
					placeholder={'Search'}
					className={`border py-2 px-4 w-full border-gray rounded-md rounded-l-none focus:outline-none`}
				/>
			</div>
			<button className='button-primary py-2 px-4 font-semibold'>Search</button>
		</div>
	);
}
