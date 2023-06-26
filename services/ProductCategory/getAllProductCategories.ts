'use server';

import { PaginatedResponse } from '@/types/api/Response';
import { ProductCategoryEntity } from '@/types/product_category/ProductCategory';

export default async function getAllProductCategories(
	pageSize = 1000,
	page = 1
): Promise<PaginatedResponse<ProductCategoryEntity>> {
	const res = await fetch(
		`${process.env.NEXTAUTH_URL}/api/product_categories/all?page_size=${pageSize}&page=${page}`
	);
	return res.json();
}
