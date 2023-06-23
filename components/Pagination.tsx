import { FC } from 'react';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';

type PaginationProps = {
	currentPage: number;
	onPageChange: (page: number) => void;
	count: number;
	pageSize: number;
	itemCount: number;
	canNext: boolean;
};

const Pagination: FC<PaginationProps> = ({
	currentPage,
	onPageChange,
	count,
	pageSize,
	itemCount,
}) => {
	const totalPages = Math.ceil(count / pageSize);

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

	const handlePageClick = (page: number) => {
		onPageChange(page);
	};

	const renderPageLinks = () => {
		const links = [];

		for (let page = 1; page <= totalPages; page++) {
			links.push(
				<button
					key={page}
					onClick={() => handlePageClick(page)}
					className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
						page === currentPage
							? 'bg-indigo-600 text-blue bg-gray'
							: 'text-gray-900 hover:bg-gray-50'
					}`}>
					{page}
				</button>
			);
		}

		return links;
	};

	console.log(currentPage, totalPages);

	return (
		<div className='flex shadow-lg rounded-b-md w-full items-center justify-between border-t border-gray bg-white px-4 py-3 sm:px-6'>
			<div className='flex flex-1 justify-between sm:hidden'>
				<button
					onClick={handlePreviousPage}
					className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 ${
						currentPage === 1
							? 'opacity-50 cursor-not-allowed'
							: 'hover:bg-gray-50'
					}`}>
					Previous
				</button>
				<button
					onClick={handleNextPage}
					className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 ${
						currentPage === totalPages
							? 'opacity-50 cursor-not-allowed'
							: 'hover:bg-gray-50'
					}`}>
					Next
				</button>
			</div>
			<div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
				<div>
					<p className='text-sm text-gray-700'>
						Showing <span className='font-medium'>1</span> to{' '}
						<span className='font-medium'>{itemCount}</span> of{' '}
						<span className='font-medium'>{count}</span> results
					</p>
				</div>
				<div>
					<nav
						className='isolate inline-flex -space-x-px rounded-md shadow-sm'
						aria-label='Pagination'>
						<button
							onClick={handlePreviousPage}
							className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${
								currentPage === 1
									? 'opacity-50 cursor-not-allowed'
									: 'hover:bg-gray-50 focus:outline-offset-0'
							}`}>
							<span className='sr-only'>Previous</span>
							<AiOutlineLeft className='h-5 w-5' aria-hidden='true' />
						</button>
						{renderPageLinks()}
						<button
							onClick={handleNextPage}
							className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${
								currentPage === totalPages
									? 'opacity-50 cursor-not-allowed'
									: 'hover:bg-gray-50 focus:outline-offset-0'
							}`}>
							<span className='sr-only'>Next</span>
							<AiOutlineRight className='h-5 w-5' aria-hidden='true' />
						</button>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default Pagination;
