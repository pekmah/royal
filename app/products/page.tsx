import ProductGrid from '@/components/Product/ProductGrid';
import getManyProducts from '@/services/Product/getManyProducts';

export default function Page() {
	return <ProductGrid queryFn={getManyProducts} />;
}
