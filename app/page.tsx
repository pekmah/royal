import ProductCard from '@/components/Product/ProductCard';
import Image from 'next/image';

const products = Array.from({ length: 15 }, (_, index) => {
	const id = index + 1;
	const title = `Zee Tiles Matte 28${id}`;
	const cost = Math.floor(Math.random() * 1001) + 500;

	let prevCost;
	if (id === 2 || id === 5 || id === 8) {
		prevCost = cost + Math.floor(Math.random() * 501) + 500;
	}

	return {
		id,
		title,
		cost,
		prevCost,
	};
});

export default function Home() {
	return (
		<div>
			<div className='w-full relative h-[480px] border border-l-0 border-gray shadow-lg'>
				<Image
					alt={'Landing page Banner'}
					src={'/landing-banner.png'}
					fill
					style={{ objectFit: 'cover', objectPosition: 'center' }}
				/>
			</div>
			<div className='w-full grid grid-cols-3 gap-6 bg-[#fbfbff] mt-6'>
				{products.map(({ cost, id, prevCost, title }, idx) => (
					<ProductCard
						key={`${id}~${idx}`}
						cost={cost}
						title={title}
						prevCost={prevCost}
					/>
				))}
			</div>
		</div>
	);
}
