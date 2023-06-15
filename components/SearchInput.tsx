import { BiSearch } from 'react-icons/bi';

export default function SearchInput() {
	return (
		<>
			<label
				htmlFor='email'
				className={`border border-r-0 py-2 px-4 border-gray`}>
				<BiSearch size={'24px'} color='#DBDBDB' />
			</label>
			<input
				id={'search'}
				type={'text'}
				placeholder={'Search'}
				className={`border py-2 px-4 w-full border-gray focus:outline-none`}
			/>
		</>
	);
}
