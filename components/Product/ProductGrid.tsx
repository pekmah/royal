'use client';

import { useQuery, useQueryClient } from 'react-query';
import ProductCard, { ProductCardSkeleton } from './ProductCard';
import { PaginatedResponse } from '@/types/api/Response';
import { ProductEntity } from '@/types/product/Product';
import { useEffect, useState } from 'react';
import Pagination from '../Pagination';

interface ProductGridProps {
	queryFn: (
		pageSize?: number,
		page?: number
	) => Promise<PaginatedResponse<ProductEntity>>;
}

export default function ProductGrid({ queryFn }: ProductGridProps) {
	const [page, setPage] = useState(1);
	const [pageSize] = useState(20);
	const [count, setCount] = useState(0);

	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery(
		['products', page],
		() => queryFn(pageSize, page),
		{
			keepPreviousData: true,
			onSuccess(data) {
				setCount(data.count);
			},
		}
	);

	useEffect(() => {
		if (data?.next) {
			queryClient.prefetchQuery(['products', page + 1], () =>
				queryFn(pageSize, page + 1)
			);
		}
	}, [data, page, queryClient, pageSize, queryFn]);

	return (
		<div className='w-full'>
			<div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-[#fbfbff] mt-6'>
				{isLoading
					? Array(4)
							.fill(0)
							.map((_, idx) => <ProductCardSkeleton key={idx} />)
					: null}

				{data?.results
					? data.results.map(({ name, id, sizes }, idx) => (
							<ProductCard
								key={`${id}~${idx}`}
								cost={sizes ? sizes[0]?.price : 0}
								title={name}
							/>
					  ))
					: null}
			</div>

			{data?.results ? (
				<div className='w-full flex justify-center py-8'>
					<Pagination
						currentPage={page}
						onPageChange={setPage}
						count={count}
						pageSize={pageSize}
						itemCount={data.results.length}
					/>
				</div>
			) : null}
		</div>
	);
}
