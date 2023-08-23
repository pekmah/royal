'use server';

import { SearchEntity } from '@/types/product/Product';

export default async function getSearchedProduct(
	search_query: string
): Promise<SearchEntity> {
	const res = await fetch(
		`${process.env.NEXTAUTH_URL}/api/products/search?search_query=${search_query}`
	);
	return res.json();
}
