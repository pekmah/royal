import LandingPageBanner from '@/components/LandingPageBanner';
import ProductGrid from '@/components/Product/ProductGrid';
import getAllProducts from '@/services/Product/getAllProducts';

export default function Home() {
	return (
		<>
			<LandingPageBanner />
			<ProductGrid queryFn={getAllProducts} />
		</>
	);
}

export const fetchCache = 'force-no-store';
export const revalidate = 0;
