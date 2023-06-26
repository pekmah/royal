'use client';

import GaugeSelector from './GaugeSelector';
import { ProductEntity } from '@/types/product/Product';
import QuantityCount from './QuantityCount';
import { useState } from 'react';
import CostDisplay from './CostDisplay';

interface Props {
	product: ProductEntity;
}

export default function ProductOptions({ product }: Props) {
	const { sizes } = product;
	const [activeSize, setActiveSize] = useState(sizes ? sizes[0] : undefined);
	const [quantity, setQuantity] = useState(1);

	return (
		<>
			<GaugeSelector
				sizes={product.sizes}
				onActiveSizeChange={setActiveSize}
				activeSize={activeSize}
			/>
			<QuantityCount quantity={quantity} onQuantityChange={setQuantity} />
			<CostDisplay activeSize={activeSize} quantity={quantity} />
		</>
	);
}
