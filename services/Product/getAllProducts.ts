'use server';

import { PaginatedResponse } from '@/types/api/Response';
import { ProductEntity } from '@/types/product/Product';

export default async function getAllProducts(
	pageSize = 20,
	page = 1
): Promise<PaginatedResponse<ProductEntity>> {
	const res = await fetch(
		`${process.env.NEXTAUTH_URL}/api/products/all?page_size=${pageSize}&page=${page}`
	);
	return res.json();
}
