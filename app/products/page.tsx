import ProductGrid from '@/components/Product/ProductGrid';
import getAllProducts from '@/services/Product/getAllProducts';

export default function Page() {
	return <ProductGrid queryFn={getAllProducts} />;
}
