import Image from 'next/image';
import { Barlow } from 'next/font/google';
import ColorSelector from '@/components/ColorSelector';
import StarRating from '@/components/StarRating';
import GaugeSelector from '@/components/GaugeSelector';
import QuantityCount from '@/components/QuantityCount';
import { BsCart2 } from 'react-icons/bs';

const barlowSemi = Barlow({
	style: 'normal',
	weight: '600',
	subsets: ['latin'],
});

interface Props {
	params: { id: string };
}

export default function Page({ params }: Props) {
	return (
		<div className='w-full'>
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
					<div
						className={`w-full flex justify-between items-center py-4 gap-8`}>
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
			<div className={`w-full rounded-md mt-4 flex gap-6`}>
				<div className='bg-white rounded-md shadow-lg w-[50%]'>
					<h3 className={`${barlowSemi.className} p-4`}>Product Details</h3>
					<hr className='text-gray w-full mb-4' />
					<div className='px-4 text-sm'>
						<p className='mb-4'>
							Zee tiles matte triple refined vegetable oil made from pure
							vegetable oil. It is cholesterol free that is great for your whole
							cookery requirements. For a happy, healthy living. fortified with
							vitamins A & D, good for your vision.
						</p>
						<h5 className='mb-4 font-semibold'>Details</h5>
						<ul className='mb-4 list-disc px-8'>
							<li>Triple refined vegetable</li>
							<li>Made from pure vegetable</li>
							<li>It is cholesterol free</li>
							<li>Your whole cookery requirements</li>
							<li>For a happy, healthy living</li>
						</ul>
						<h5 className='mb-4 font-semibold'>Our Guarantee</h5>
						<ul className='mb-4 list-disc px-8'>
							<li>Triple refined vegetable</li>
							<li>Made from pure vegetable</li>
							<li>It is cholesterol free</li>
							<li>Your whole cookery requirements</li>
							<li>For a happy, healthy living</li>
						</ul>
					</div>
				</div>
				<div className='bg-white rounded-md shadow-lg w-[50%]'>
					<div className='flex justify-between w-full p-4 items-center'>
						<h3 className={`${barlowSemi.className}`}>Customer Reviews</h3>
						<p className='font-medium text-sm underline text-red'>
							See all (50)
						</p>
					</div>
					<hr className='text-gray w-full mb-4' />
					<div className='max-h-[500px] overflow-y-scroll'>
						<div className='px-4 border-b border-gray mb-4'>
							<div className='flex items-center gap-2'>
								<div className='flex justify-center font-semibold items-center bg-gray rounded-full p-4'>
									EJ
								</div>
								<div className='flex-col text-sm justify-between'>
									<p className='flex items-center'>
										<span className='font-semibold'>El Jackson</span>
										<span className='mx-4 rounded-full bg-fadegray p-1' />
										<span className='text-red text-[12px]'>
											Verified Purchase
										</span>
									</p>
									<p className='text-[12px]'>12th May 2023</p>
								</div>
							</div>
							<div className='py-4'>
								<StarRating rating={4} />
								<p className='text-sm py-4'>
									Made from pure vegetable oil. For a happy, healthy living.
									fortified with vitamins A & D, good for your vision.
								</p>
							</div>
						</div>
						<div className='px-4 border-b border-gray mb-4'>
							<div className='flex items-center gap-2'>
								<div className='flex justify-center font-semibold items-center bg-gray rounded-full p-4'>
									CW
								</div>
								<div className='flex-col text-sm justify-between'>
									<p className='flex items-center'>
										<span className='font-semibold'>Chris Wayne</span>
										<span className='mx-4 rounded-full bg-fadegray p-1' />
										<span className='text-red text-[12px]'>
											Verified Purchase
										</span>
									</p>
									<p className='text-[12px]'>10th May 2023</p>
								</div>
							</div>
							<div className='py-4'>
								<StarRating rating={5} />
								<p className='text-sm py-4'>
									Made from pure vegetable oil. For a happy, healthy living.
									fortified with vitamins A & D, good for your vision.
								</p>
							</div>
						</div>
						<div className='px-4 border-b border-gray mb-4'>
							<div className='flex items-center gap-2'>
								<div className='flex justify-center font-semibold items-center bg-gray rounded-full p-4'>
									E J
								</div>
								<div className='flex-col text-sm justify-between'>
									<p className='flex items-center'>
										<span className='font-semibold'>El Jackson</span>
										<span className='mx-4 rounded-full bg-fadegray p-1' />
										<span className='text-red text-[12px]'>
											Verified Purchase
										</span>
									</p>
									<p className='text-[12px]'>12th May 2023</p>
								</div>
							</div>
							<div className='py-4'>
								<StarRating rating={4} />
								<p className='text-sm py-4'>
									Made from pure vegetable oil. For a happy, healthy living.
									fortified with vitamins A & D, good for your vision.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
