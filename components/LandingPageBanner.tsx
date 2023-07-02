import { Barlow } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const barlowSemi = Barlow({
	style: 'normal',
	weight: '600',
	subsets: ['latin'],
});

const barlow = Barlow({
	style: 'normal',
	weight: '400',
	subsets: ['latin'],
});

export default function LandingPageBanner() {
	return (
		<div className={'w-full h-max flex shadow-lg rounded-md'}>
			<div className='min-w-[340px] relative h-[229px]'>
				<Image
					alt={'Landing page Banner'}
					src={'/landing-banner-2.png'}
					fill
					priority
					style={{ objectFit: 'cover', objectPosition: 'center' }}
				/>
			</div>
			<div
				style={{
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					paddingLeft: '8px',
					paddingRight: '8px',
				}}>
				<h2 className={`${barlowSemi.className} text-[32px] py-2`}>
					<span className='text-black'>Get your</span>
					<span className='text-blue'> Royal Mabati</span>
				</h2>
				<p className={`${barlow.className} text-[12px] text-center py-2 px-2`}>
					When it comes to roofing, Royal Mabati ® has the experience & know how
					to make it both durable and beautiful. Roman longtile, Box, Bricktile,
					Corrugated, Eurotile Profile and Commercial IT 5 Available
				</p>
				<div className='py-2'>
					<Link
						className='button-primary py-[6px] px-[14px] text-[12px]'
						href={'/products'}>
						Buy Now
					</Link>
				</div>
			</div>
		</div>
	);
}
