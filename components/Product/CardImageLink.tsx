'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CardImageLink({ id }: { id: number }) {
	const { push } = useRouter();
	return (
		<div
			className='relative w-auto h-[160px] cursor-pointer'
			onClick={() => push(`/products/${id}`)}>
			<Image
				alt={'Landing page Banner'}
				src={'/temp-product-img.png'}
				fill
				style={{ objectFit: 'cover', objectPosition: 'center' }}
				className='rounded-t-md'
			/>
		</div>
	);
}
