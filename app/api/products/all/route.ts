import { PaginatedResponse } from "@/types/api/Response";
import { ProductEntity } from "@/types/product/Product";
import { getRequest } from "@/utils/request";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const page_size = searchParams.get("page_size");
    const page = searchParams.get("page");
    const category = searchParams.get("category");
    const maxPrice = searchParams.get("maxPrice");
    const minPrice = searchParams.get("minPrice");

    console.log(maxPrice, minPrice, category);
    const pricesValid =
        maxPrice &&
        minPrice &&
        !isNaN(parseInt(maxPrice)) &&
        !isNaN(parseInt(minPrice));

    try {
        if (pricesValid && category) {
            console.log("pricesValid");
            // {{baseUrl}}/api/v1/core/products/filter?page_size=10&page=1&category_id=7&min_price=110&max_price=549
            const res = await getRequest<PaginatedResponse<ProductEntity>>(
                `/api/v1/core/products/filter?page_size=${page_size}&page=${page}&category_id=${category}&min_price=${minPrice}&max_price=${maxPrice}`
            );
            return new Response(JSON.stringify(res.data));
        } else if (!pricesValid && category) {
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
