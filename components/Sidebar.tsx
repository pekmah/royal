'use client';

import { usePathname } from 'next/navigation';
import Accordion from './Accordion';
import { Barlow } from 'next/font/google';
import MultiRangeSlider from './MultiRangeSlider';

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

export default function Sidebar() {
	const path = usePathname();
	return path.startsWith('/auth') ? null : (
		<div className={`rounded-md shadow-lg ${barlow.className} bg-white `}>
			<div className='p-4'>
				<h3 className={barlowSemi.className}>Category</h3>
			</div>
			<hr className='text-gray w-full mb-4' />
			<div className='text-sm'>
				<Accordion
					id={'Sheets'}
					heading='Sheets'
					content={[
						{
							title: 'Corrugate',
						},
						{ title: 'Tiled' },
					]}
				/>
				<div>
					<p className='mb-1 ml-4 py-1'>Trusses</p>
					<p className='mb-1 ml-4 py-1'>Nails</p>
					<p className='mb-1 ml-4 py-1'>Rafts</p>
					<p className='mb-1 ml-4 py-1'>Gutters</p>
				</div>
			</div>
			<hr className='text-gray w-full mb-4' />
			<div className='flex justify-between px-6'>
				<h3 className={barlowSemi.className}>Price</h3>
				<button className='text-red text-sm'>Apply</button>
			</div>
			<MultiRangeSlider
				min={0}
				max={1000}
				onChange={({ min, max }: { min: number; max: number }) =>
					console.log(`min = ${min}, max = ${max}`)
				}
			/>
		</div>
	);
}
