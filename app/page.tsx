import LandingPageBanner from '@/components/LandingPageBanner';
import ProductGrid from '@/components/Product/ProductGrid';
import getManyProducts from '@/services/Product/getManyProducts';

export default function Home() {
	return (
		<>
			<LandingPageBanner />
			<ProductGrid queryFn={getManyProducts} />
		</>
	);
}
