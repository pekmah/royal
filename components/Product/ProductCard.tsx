'use client';

import { Barlow } from 'next/font/google';
import CardImageLink from './CardImageLink';
import { ProductEntity, ProductSizes } from '@/types/product/Product';
import { useState } from 'react';
import { BsCart2 } from 'react-icons/bs';
import SelectOption from '../SelectSize';

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

export default function ProductCard({ product }: ProductCardProps) {
	const { id, name, pricing, thumbnails } = product;
	const [activeGauge, setActiveGauge] = useState<ProductSizes | null>(null);

	return (
		<div className='bg-white justify-between h-full rounded-md shadow-lg flex-col'>
			<div className='h-fit'>
				<CardImageLink
					name={product.name}
					id={id}
					thumbnail={
						thumbnails && thumbnails?.length > 0
							? thumbnails[0].thumbnail_code
							: ''
					}
				/>
			</div>
			<div
				className='w-full p-4'
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					height: 'calc(100% - 160px)',
				}}>
				<div className='w-full'>
					<p className={`w-full mb-2 ${barlow.className}`}>{name}</p>
					<div className='w-full hidden'>
						{pricing ? (
							<SelectOption<ProductSizes>
							label='Gauge Size'
							options={pricing}
							selectedOption={activeGauge}
							onSelectOption={setActiveGauge}
							getKey={(option) => option?.gauge_size || ''}
						/>
						) : null}
					</div>
				</div>

				<div className='h-fit w-full mt-2'>
					<div className={`flex justify-between py-1 ${barlowSemi.className}`}>
						{activeGauge?.discounted && activeGauge?.percentage_discount ? (
							<>
								<span>
									Ksh.{' '}
									{activeGauge.price *
										((100 - activeGauge?.percentage_discount) / 100)}
								</span>
								<span className='text-red line-through'>
									Ksh. {activeGauge?.price ?? '-'}
								</span>
							</>
						) : (
							<span>Ksh. {activeGauge?.price ?? '-'}</span>
						)}
					</div>
					<button className='button-secondary w-full flex justify-evenly border text-sm py-2 px-4 my-2 border-red'>
						<BsCart2 size={'16'} color={'#DC2A25'} />
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	);
}

export const ProductCardSkeleton = () => {
	return (
		<div className='justify-center rounded-md shadow-lg animate-pulse h-[240px] bg-gray' />
	);
};
