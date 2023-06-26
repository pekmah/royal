import ProductDetailMain from '@/components/ProductDetail/ProductDetailMain';
import ProductDetailDescription from '@/components/ProductDetail/ProductDetailDescription';
import ProductReviews from '@/components/ProductDetail/ProductReviews';

interface Props {
	params: { id: string };
}

export default function Page({ params }: Props) {
	return (
		<div className='w-full'>
			<ProductDetailMain />
			<div className={`w-full rounded-md mt-4 flex gap-6`}>
				<ProductDetailDescription />
				<ProductReviews />
			</div>
		</div>
	);
}
