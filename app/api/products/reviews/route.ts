import { PaginatedResponse } from "@/types/api/Response";
import { ProductReview } from "@/types/product/Product";
import { getRequest } from "@/utils/request";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const page_size = searchParams.get("page_size");
    const page = searchParams.get("page");
    const productId = searchParams.get("productId");

    try {
        const res = await getRequest<PaginatedResponse<ProductReview>>(
            `/api/v1/core/reviews/product/${productId}?page_size=${page_size}&page=${page}`
        );
        return new Response(JSON.stringify(res.data));
    } catch (e: any) {
        return new Response(JSON.stringify(e.response.data), {
            status: e.response.status,
        });
    }
}
