"use server";

import { PaginatedResponse } from "@/types/api/Response";
import { ProductReview } from "@/types/product/Product";

export default async function getSingleProduct(
    pageSize = 20,
    page = 1,
    productId: number
): Promise<PaginatedResponse<ProductReview>> {
    const res = await fetch(
        `${process.env.NEXTAUTH_URL}/api/products/reviews?page_size=${pageSize}&page=${page}&productId=${productId}`
    );
    return res.json();
}
