"use server";

import { PaginatedResponse } from "@/types/api/Response";
import { ProductEntity } from "@/types/product/Product";

export default async function getManyProducts(
    pageSize = 20,
    page = 1,
    category?: number,
    max?: number,
    min?: number
): Promise<PaginatedResponse<ProductEntity>> {
    const res = await fetch(
        `${
            process.env.NEXTAUTH_URL
        }/api/products/all?page_size=${pageSize}&page=${page}${
            category ? `&category=${category}` : ""
        }${min ? `&minPrice=${min}` : ""}${max ? `&maxPrice=${max}` : ""}`,
        { next: { revalidate: 30 } }
    );
    return res.json();
}
