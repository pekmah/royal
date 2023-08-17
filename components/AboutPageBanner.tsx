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

export default function AboutPageBanner() {
	return (
		<div className={'w-full h-max block md:flex shadow-lg rounded-md'}>
			<div className='min-w-[711px] relative h-[375px]'>
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
					<span className='text-black'>About </span>
					<span className='text-blue'> Royal Mabati</span>
				</h2>
				<p className={`${barlow.className} text-[12px] text-center py-2 px-2`}>
					We are customer maniacs. In our years of existence, we have built our culture around attending to our customers to full satisfaction.
				</p>
			</div>
		</div>
	);
}
