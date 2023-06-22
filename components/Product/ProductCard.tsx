import Image from 'next/image';
import { Barlow } from 'next/font/google';

interface ProductCardProps {
	title: string;
	cost: string | number;
	prevCost?: string | number;
}

const barlow = Barlow({
	style: 'normal',
	weight: '400',
	subsets: ['latin'],
});

const barlowSemi = Barlow({
	style: 'normal',
	weight: '600',
	subsets: ['latin'],
});

export default function ProductCard({
	title,
	cost,
	prevCost,
}: ProductCardProps) {
	return (
		<div className='bg-white justify-center rounded-md shadow-lg'>
			<div className='relative w-auto h-[160px]'>
				<Image
					alt={'Landing page Banner'}
					src={'/temp-product-img.png'}
					fill
					style={{ objectFit: 'cover', objectPosition: 'center' }}
					className='rounded-t-md'
				/>
			</div>
			<div className='w-full p-4'>
				<p className={`text-lg ${barlow.className}`}>{title}</p>
				<div className={`flex gap-6 py-2 ${barlowSemi.className}`}>
					<span>Ksh. {cost}</span>
					{prevCost ? (
						<span className='text-red line-through'>Ksh. {prevCost}</span>
					) : null}
				</div>
				<button className='button-secondary w-full border-2 py-2 px-4 my-2 border-red'>
					Add to Cart
				</button>
			</div>
		</div>
	);
}
