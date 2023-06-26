'use client';

import { getRequest } from '@/utils/request';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
	id: number;
	name: string;
	thumbnail?: string;
}

const blobToDataURL = (blob: Blob) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			resolve(reader.result);
		};
		reader.onerror = reject;
		reader.readAsDataURL(blob);
	});
};

// TODO: blur images until image load
export default function CardImageLink({ id, thumbnail, name }: Props) {
	const { push } = useRouter();

	return (
		<div
			className='relative w-auto h-[160px] cursor-pointer'
			onClick={() => push(`/products/${id}`)}>
			<Image
				alt={`Thumbnail for ${name}`}
				src={
					thumbnail
						? `${process.env.BASE_URL}/api/v1/core/products/thumbnail/${thumbnail}`
						: '/temp-product-img.png'
				}
				fill
				style={{ objectFit: 'cover', objectPosition: 'center' }}
				className='rounded-t-md'
			/>
		</div>
	);
}
