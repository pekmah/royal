"us";

import { PaginatedResponse } from '@/types/api/Response'
import { ProductCart } from '@/types/product/Product'
import { getAccessToken } from '@/utils/tokenCookie';

export const getCartItems = async (
    pageSize = 10,
    page = 1) : Promise<PaginatedResponse<ProductCart>> => {
        // const authToken = getAccessToken()
        // console.log(authToken)
        console.log(process.env.NEXTAUTH_URL)
        const res = await fetch(
            `${process.env.NEXTAUTH_URL}/api/cart?page_size=${pageSize}&page=${page}`,
            {
                // headers:{
                //      Authorization: `Bearer ${authToken}`
                // }
            }
        );
        if (res.status === 400) {
            const error = await res.json();
            throw new Error(error.message);
        }
        return await res.json();
}