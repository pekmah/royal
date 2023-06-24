'use client';

import { getRequest } from '@/utils/request';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
	id: number;
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
export default function CardImageLink({ id, thumbnail }: Props) {
	const { push } = useRouter();
	const [imageUrl, setImageUrl] = useState('');

	useEffect(() => {
		if (thumbnail) {
			getRequest(`/api/v1/core/products/thumbnail/${thumbnail}`, {
				responseType: 'blob',
			}).then((res) => {
				const blob = res.data as Blob;
				blobToDataURL(blob).then((val) => {
					setImageUrl(val as string);
				});
			});
		}
	}, [thumbnail]);

	return (
		<div
			className='relative w-auto h-[160px] cursor-pointer'
			onClick={() => push(`/products/${id}`)}>
			<Image
				alt={'Product Image'}
				src={imageUrl ? imageUrl : '/temp-product-img.png'}
				fill
				style={{ objectFit: 'cover', objectPosition: 'center' }}
				className='rounded-t-md'
			/>
		</div>
	);
}
