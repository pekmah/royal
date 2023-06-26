import StarRating from '../StarRating';
import { Barlow } from 'next/font/google';

const barlowSemi = Barlow({
	style: 'normal',
	weight: '600',
	subsets: ['latin'],
});

export default function ProductReviews() {
	return (
		<div className='bg-white rounded-md shadow-lg w-[50%]'>
			<div className='flex justify-between w-full p-4 items-center'>
				<h3 className={`${barlowSemi.className}`}>Customer Reviews</h3>
				<p className='font-medium text-sm underline text-red'>See all (50)</p>
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
								<span className='text-red text-[12px]'>Verified Purchase</span>
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
								<span className='text-red text-[12px]'>Verified Purchase</span>
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
								<span className='text-red text-[12px]'>Verified Purchase</span>
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
	);
}
