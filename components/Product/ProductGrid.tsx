'use client';

import { useQuery, useQueryClient } from 'react-query';
import ProductCard, { ProductCardSkeleton } from './ProductCard';
import { PaginatedResponse } from '@/types/api/Response';
import { ProductEntity } from '@/types/product/Product';
import { useEffect, useState } from 'react';
import Pagination from '../Pagination';
import { usePathname, useSearchParams } from 'next/navigation';
import CircleLoader from '../Loaders/CircleLoader';
import Breadcrumb from '../BreadCrumb';

interface ProductGridProps {
	queryFn: (
		pageSize?: number,
		page?: number,
		category?: number
	) => Promise<PaginatedResponse<ProductEntity>>;
}

export default function ProductGrid({ queryFn }: ProductGridProps) {
	const [page, setPage] = useState(1);
	const [pageSize] = useState(20);
	const [count, setCount] = useState(0);

	const param = useSearchParams().get('category');
	const category = param ? parseInt(param) : undefined;

	const pathname = usePathname();

	const queryClient = useQueryClient();

	const { data, isLoading, isFetching } = useQuery(
		category ? ['products', category, page] : ['products', 'all', page],
		() => queryFn(pageSize, page, category),
		{
			keepPreviousData: true,
			onSuccess(data) {
				setCount(data.count);
			},
			onError(err) {
				console.error('err', err);
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
			{pathname.startsWith('/products') ? (
				<div className='w-full min-h-[30px] items-center flex justify-between'>
					<Breadcrumb />
					{isFetching ? <CircleLoader /> : null}
				</div>
			) : null}
			<div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-[#fbfbff] mt-6'>
				{isLoading
					? Array(4)
							.fill(0)
							.map((_, idx) => <ProductCardSkeleton key={idx} />)
					: null}

				{data?.results
					? data.results.map((product, idx) => (
							<ProductCard key={`${product.id}~${idx}`} product={product} />
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

export const fetchCache = 'force-no-store';
export const revalidate = 0;
