import Image from 'next/image';

export default function LandingPageBanner() {
	return (
		<div className='w-full relative h-[480px] border border-l-0 border-gray shadow-lg'>
			<Image
				alt={'Landing page Banner'}
				src={'/roof-banner.jpg'}
				fill
				priority
				style={{ objectFit: 'cover', objectPosition: 'center' }}
			/>
		</div>
	);
}
