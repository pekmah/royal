'use client';

import { ProductEntity, ProductSizes } from '@/types/product/Product';
import QuantityCount from './QuantityCount';
import { useState } from 'react';
import CostDisplay from './CostDisplay';
import SelectOption from '../SelectSize';
import SelectLength from '../SelectLength';

interface Props {
	product: ProductEntity;
}

export default function ProductOptions({ product }: Props) {
	const { pricing, length } = product;

	const [activeOption, setActiveOption] = useState<ProductSizes | null>(null);
	const [activeLength, setActiveLength] = useState<string | null>(null);
	const [quantity, setQuantity] = useState(1);

	return (
		<>
		<div className=' flex gap-4'>
			{pricing ? (
				<SelectOption<ProductSizes>
				label='Gauge Size'
				options={pricing}
				selectedOption={activeOption}
				onSelectOption={setActiveOption}
				getKey={(option) => option?.gauge_size || ''}
			/>
			) : null}
				{pricing ? (
				<SelectOption<ProductSizes>
				label='Measurement'
				options={pricing}
				selectedOption={activeOption}
				onSelectOption={setActiveOption}
				getKey={(option) => option?.gauge_size || ''}
			/>
			) : null}


		</div>
		<div className=' flex gap-4 pt-4'>
			{length.length > 0 && (
					<SelectLength
					label='Length'
					options={length}
					selectedOption={activeLength}
					onSelectOption={setActiveLength}
				/>
			)}
				{pricing ? (
				<SelectOption<ProductSizes>
				label='Width'
				options={pricing}
				selectedOption={activeOption}
				onSelectOption={setActiveOption}
				getKey={(option) => option?.width || ''}
			/>
			) : null}


		</div>
			<QuantityCount quantity={quantity} onQuantityChange={setQuantity} />
			<CostDisplay activeSize={activeOption} quantity={quantity} />
		</>
	);
}
