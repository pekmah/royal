'use client';

import { ProductSizes } from '@/types/product/Product';
import { Dispatch, SetStateAction } from 'react';

interface Props {
	pricing: (ProductSizes | null)[] | null | undefined;
	activeSize: ProductSizes | null | undefined;
	onActiveSizeChange: Dispatch<SetStateAction<ProductSizes | null | undefined>>;
}

export default function GaugeSelector({
	pricing,
	activeSize,
	onActiveSizeChange,
}: Props) {
	if (!pricing || (pricing && pricing.length === 0)) return null;
	return (
		<div className='w-full flex justify-between items-center'>
			<p className='font-semibold text-sm'>Size</p>
			<div className='flex gap-2'>
				{pricing?.map((size, idx) => (
					<button
						key={`${size?.id}~${idx}`}
						onClick={() => onActiveSizeChange(size)}
						className={`px-2 py-1 ${
							activeSize?.id === size?.id
								? 'bg-red text-white'
								: 'border border-gray text-black'
						}  text-[10px] rounded-md font-semibold`}>
						{size?.gauge_size}
					</button>
				))}
			</div>
		</div>
	);
}
