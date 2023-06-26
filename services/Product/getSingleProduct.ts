'use server';

import { ProductEntity } from '@/types/product/Product';

export default async function getSingleProduct(
	productId: number
): Promise<ProductEntity> {
	const res = await fetch(
		`${process.env.NEXTAUTH_URL}/api/products/single?productId=${productId}`
	);
	return res.json();
}
