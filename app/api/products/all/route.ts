import { PaginatedResponse } from '@/types/api/Response';
import { ProductEntity } from '@/types/product/Product';
import { getRequest } from '@/utils/request';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);

	const page_size = searchParams.get('page_size');
	const page = searchParams.get('page');
	const category = searchParams.get('category');

	try {
		if (category) {
			const res = await getRequest<PaginatedResponse<ProductEntity>>(
				`/api/v1/core/products/category/${category}?page_size=${page_size}&page=${page}`
			);
			return new Response(JSON.stringify(res.data));
		} else {
			const res = await getRequest<PaginatedResponse<ProductEntity>>(
				`/api/v1/core/products?page_size=${page_size}&page=${page}`
			);
			return new Response(JSON.stringify(res.data));
		}
	} catch (e: any) {
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
}
