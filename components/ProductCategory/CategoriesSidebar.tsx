'use client';

import getAllProductCategories from '@/services/ProductCategory/getAllProductCategories';
import { ProductCategoryEntity } from '@/types/product_category/ProductCategory';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';

export default function CategoriesSidebar() {
	const { data, isLoading } = useQuery(['categories'], () =>
		getAllProductCategories()
	);
	const { push } = useRouter();

	return (
		<div className='text-sm w-full mb-4'>
			{isLoading && !data
				? Array(8)
						.fill(0)
						.map((v, idx) => (
							<div
								key={idx}
								className={'w-full my-4 h-6 bg-gray animate-pulse'}
							/>
						))
				: null}
			{data && data.results ? (
				[{ id: -1, name: 'All' } as ProductCategoryEntity, ...data.results].map(
					({ id, name, thumbnail, thumbnail_code }) => (
						<button
							onClick={() => push(`/products?category=${id}`)}
							className={
								'w-full justify-start flex items-center gap-2 px-4 py-2 hover:bg-gray hover:text-blue'
							}
							key={id}>
							{thumbnail ? (
								<span>
									<Image
										src={`${process.env.BASE_URL}/api/v1/core/category/thumbnails/${thumbnail_code}`}
										width={24}
										height={24}
										alt={`Thumbnail for ${name} category.`}
									/>
								</span>
							) : null}
							{name}
						</button>
					)
				)
			) : !isLoading && !data ? (
				<p className='text-sm'>Failed to load categories</p>
			) : null}
		</div>
	);
}
