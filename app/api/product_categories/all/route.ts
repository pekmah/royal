import { PaginatedResponse } from '@/types/api/Response';
import { ProductCategoryEntity } from '@/types/product_category/ProductCategory';
import { getRequest } from '@/utils/request';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);

	const page_size = searchParams.get('page_size');
	const page = searchParams.get('page');

	try {
		const res = await getRequest<PaginatedResponse<ProductCategoryEntity>>(
			`/api/v1/core/categories?page=${page}&page_size=${page_size}`
		);
		return new Response(JSON.stringify(res.data));
	} catch (e: any) {
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
}
