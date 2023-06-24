'use client';

import { Barlow } from 'next/font/google';
import CardImageLink from './CardImageLink';
import { ProductEntity } from '@/types/product/Product';
import { useEffect, useState } from 'react';

interface ProductCardProps {
	product: ProductEntity;
}

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

// TODO: Prefetch the images, construct and cache the image urls
export default function ProductCard({ product }: ProductCardProps) {
	const { id, name, sizes, thumbnails } = product;
	const [activeSize, setActiveSize] = useState(sizes ? sizes[0] : undefined);
	const [activeThumbnail, setActiveThumbnail] = useState<string | undefined>();

	useEffect(() => {
		const found = thumbnails?.find((v) => v.id === activeSize?.id);
		if (found) {
			setActiveThumbnail(found.thumbnail_code);
		}
	}, [activeSize, thumbnails]);

	return (
		<div className='bg-white justify-center rounded-md shadow-lg'>
			<CardImageLink id={id} thumbnail={activeThumbnail} />
			<div className='w-full p-4'>
				<p className={`mb-2 ${barlow.className}`}>{name}</p>
				<div className='w-full flex justify-between items-center'>
					<p className={`text-sm font-semibold`}>Sizes</p>
					<div className='flex gap-2'>
						{sizes?.map((size, idx) => (
							<div
								key={`${size?.id}~${idx}`}
								onClick={() => setActiveSize(size)}
								className={`px-2 py-1 ${
									activeSize?.id === size?.id
										? 'bg-red text-white'
										: 'border border-gray text-black'
								}  text-[10px] rounded-md font-semibold cursor-pointer`}>
								{size?.size}
							</div>
						))}
					</div>
				</div>
				<div className={`flex justify-between py-2 ${barlowSemi.className}`}>
					{activeSize?.discounted && activeSize?.percentage_discount ? (
						<>
							<span>
								Ksh.{' '}
								{activeSize.price *
									((100 - activeSize?.percentage_discount) / 100)}
							</span>
							<span className='text-red line-through'>
								Ksh. {activeSize?.price ?? '-'}
							</span>
						</>
					) : (
						<span>Ksh. {activeSize?.price ?? '-'}</span>
					)}
				</div>
				<button className='button-secondary w-full border-2 py-2 px-4 my-2 border-red'>
					Add to Cart
				</button>
			</div>
		</div>
	);
}

export const ProductCardSkeleton = () => {
	return (
		<div className='justify-center rounded-md shadow-lg animate-pulse h-[240px] bg-gray'></div>
	);
};
