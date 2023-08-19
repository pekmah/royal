"use client";

import ProductDetailMain from "@/components/ProductDetail/ProductDetailMain.js";
import ProductDetailDescription from "@/components/ProductDetail/ProductDetailDescription";
import ProductReviews from "@/components/ProductDetail/ProductReviews";
import { useQuery } from "react-query";
import getSingleProduct from "@/services/Product/getSingleProduct";
import Breadcrumb from "@/components/BreadCrumb";

interface Props {
    params: { id: string };
}

// TODO: Add loading skeletons to product detail page
export default function Page({ params }: Props) {
    const { isLoading, data } = useQuery(["product", params.id], () =>
        getSingleProduct(parseInt(params.id))
    );

    if (isLoading) {
        return (
            <div className="w-full rounded-md h-[500px] bg-grey animate-pulse" />
        );
    }

    if (!data && !isLoading) {
        return (
            <div
                className={`w-full rounded-md justify-center items-center bg-grey h-[500px] flex`}
            >
                Requested product was not found
            </div>
        );
    }

    return (
        <div className="w-full">
            <Breadcrumb replacePath={data.name} />
            <ProductDetailMain product={data} />
            <div
                className={`w-full rounded-md mt-4 flex flex-col md:flex-row gap-6`}
            >
                <ProductDetailDescription description={data.description} />
                <ProductReviews id={params.id} />
            </div>
        </div>
    );
}
