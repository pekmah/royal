'use client';

import ProductDetailMain from '@/components/ProductDetail/ProductDetailMain';
import ProductDetailDescription from '@/components/ProductDetail/ProductDetailDescription';
import ProductReviews from '@/components/ProductDetail/ProductReviews';
import { useQuery } from 'react-query';
import getSingleProduct from '@/services/Product/getSingleProduct';

interface Props {
	params: { id: string };
}

// TODO: Add loading skeletons to product detail page
export default function Page({ params }: Props) {
	const { isLoading, data } = useQuery(['product', params.id], () =>
		getSingleProduct(parseInt(params.id))
	);

	if (isLoading) {
		return (
			<div className='w-full rounded-md h-[500px] bg-gray animate-pulse' />
		);
	}

	if (!data && !isLoading) {
		return (
			<div
				className={`w-full rounded-md justify-center items-center bg-gray h-[500px] flex`}>
				Requested product was not found
			</div>
		);
	}

	return (
		<div className='w-full'>
			<ProductDetailMain product={data} />
			<div className={`w-full rounded-md mt-4 flex gap-6`}>
				<ProductDetailDescription description={data.description} />
				<ProductReviews reviews={data.reviews} />
			</div>
		</div>
	);
}
