import Image from 'next/image';
import ColorSelector from '../ColorSelector';
import { Barlow } from 'next/font/google';
import StarRating from '../StarRating';
import GaugeSelector from '../GaugeSelector';
import QuantityCount from '../QuantityCount';
import { BsCart2 } from 'react-icons/bs';

const barlowSemi = Barlow({
	style: 'normal',
	weight: '600',
	subsets: ['latin'],
});

export default function ProductDetailMain() {
	return (
		<div className={`w-full rounded-md shadow-lg bg-white flex gap-6 p-4`}>
			<div className='w-[35%]'>
				<div className='relative h-[240px]'>
					<Image
						alt={'Landing page Banner'}
						src={'/temp-product-img.png'}
						fill
						style={{ objectFit: 'cover', objectPosition: 'center' }}
						className='rounded-md'
					/>
				</div>
				<div className={'py-4'}>
					<h3 className={`text-base ${barlowSemi.className}`}>
						Select Finish:
					</h3>
					<ColorSelector />
				</div>
			</div>
			<div
				className={'w-[65%] max-h-max'}
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
				}}>
				<div className='w-full'>
					<h3 className={`text-lg ${barlowSemi.className}`}>
						Zee Tiles Matte on a Corrugated Finish...
					</h3>
					<div className='py-4'>
						<StarRating rating={4} reviewCount={50} />
					</div>
					<GaugeSelector />
					<QuantityCount />
					<div className='flex justify-between items-center'>
						<p className='font-semibold text-sm'>Cost :</p>
						<p className='font-semibold'>Ksh. 800</p>
					</div>
				</div>
				<div className={`w-full flex justify-between items-center py-4 gap-8`}>
					<button className='button-secondary font-medium text-sm border border-red w-full'>
						Buy Now
					</button>
					<button className='button-primary font-medium text-sm w-full flex items-center justify-center gap-6'>
						<BsCart2 size={'20'} />
						<span>Add to Cart</span>
					</button>
				</div>
			</div>
		</div>
	);
}
