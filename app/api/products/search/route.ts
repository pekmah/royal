import {  SearchEntity } from '@/types/product/Product';
import { getRequest } from '@/utils/request';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);

	const search_query = searchParams.get('search_query');

	try {
		const searchUrl = `/api/v1/core/products/search/?search_query=${search_query}`;
		const response = await getRequest<SearchEntity>(searchUrl);
		const searchData = response.data;
		return new Response(JSON.stringify(searchData));
	} catch (e: any) {
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
}
