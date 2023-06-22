import Image from 'next/image';

export default function Home() {
	return (
		<div>
			<div className='w-full relative h-[480px] border border-l-0 border-gray'>
				<Image
					alt={'Landing page Banner'}
					src={'/landing-banner.png'}
					fill
					style={{ objectFit: 'cover', objectPosition: 'center' }}
				/>
			</div>
		</div>
	);
}
