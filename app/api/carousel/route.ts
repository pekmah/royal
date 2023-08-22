import { PaginatedResponse } from '@/types/api/Response';
import { CarouselEntity } from '@/types/carousel/Carousel';
import { getRequest } from '@/utils/request';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
	try {
		const res = await getRequest<PaginatedResponse<CarouselEntity>>(
			`/api/v1/core/carousels/?page=${page}`
		);
		console.log(res)
		return new Response(JSON.stringify(res.data));
	} catch (e: any) {
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
}