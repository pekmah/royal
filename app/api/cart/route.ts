import { PaginatedResponse } from "@/types/api/Response";
import { ProductCart } from "@/types/product/Product";
import { getRequest } from "@/utils/request";
import { NextResponse } from "next/server";

export const GET = async (req:Request) =>{
    const { searchParams } = new URL(req.url);

    const page_size = searchParams.get("page_size");
    const page = searchParams.get("page");
    console.log(page)

    try{
        const res = await getRequest<PaginatedResponse<ProductCart>>(
            `/api/v1/cart/carts/?page_size=${page_size}&page=${page}`
        );
        console.log(res)
        return new Response(JSON.stringify(res.data));
    }catch(e:any){
        return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
    }
}