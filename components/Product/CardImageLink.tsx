'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Props {
	id: number;
	name: string;
	thumbnail?: string;
}

const imageLoader = ({ src }: { src: string }) => {
	if (src.length === 0) return '/temp-product-img.png';
	return `${process.env.BASE_URL}/api/v1/core/products/thumbnail/${src}`;
};

export default function CardImageLink({ id, thumbnail, name }: Props) {
	const { push } = useRouter();

	return (
		<div
			className='relative w-auto h-[160px] cursor-pointer'
			onClick={() => push(`/products/${id}`)}>
			<Image
				alt={`Thumbnail for ${name}`}
				loader={imageLoader}
				src={thumbnail ?? ''}
				fill
				style={{ objectFit: 'cover', objectPosition: 'center' }}
				className='rounded-t-md'
			/>
		</div>
	);
}
