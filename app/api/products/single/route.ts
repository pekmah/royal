import { ProductEntity } from '@/types/product/Product';
import { getRequest } from '@/utils/request';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);

	const productId = searchParams.get('productId');

	try {
		const res = await getRequest<ProductEntity>(
			`/api/v1/core/products/${productId}`
		);
		return new Response(JSON.stringify(res.data));
	} catch (e: any) {
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
}
