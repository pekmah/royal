'use server';

import { PaginatedResponse } from '@/types/api/Response';
import { ProductEntity } from '@/types/product/Product';

export default async function getManyProducts(
	pageSize = 20,
	page = 1,
	category?: number,
	options?: RequestInit
): Promise<PaginatedResponse<ProductEntity>> {
	const res = await fetch(
		`${
			process.env.NEXTAUTH_URL
		}/api/products/all?page_size=${pageSize}&page=${page}${
			category ? `&category=${category}` : ''
		}`,
		{ next: { revalidate: 60 } }
	);
	return res.json();
}
