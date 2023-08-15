import Image from "next/image";
import { Barlow } from "next/font/google";
import StarRating from "./StarRating";
import { BsCart2 } from "react-icons/bs";
import { ProductEntity } from "@/types/product/Product";
import ProductOptions from "./ProductOptions";
import ColorSelector from "./ColorSelector";
import SelectSize from "../SelectSize";
import { useState } from "react";
import SelectOption from "../SelectSize";

const barlowSemi = Barlow({
    style: "normal",
    weight: "600",
    subsets: ["latin"],
});

interface Props {
    product: ProductEntity;
}

export default function ProductDetailMain({ product }: Props) {
    const { name, thumbnails, thumbnail_colors, pricing, review_summary, total_reviews } = product;
    const [activeFinish, setActiveFinish] = useState(pricing ? pricing[0] : undefined);
    const thumbnail =
        thumbnails && thumbnails?.length > 0
            ? thumbnails[0].thumbnail_code
            : null;
    return (
        <div
            className={`w-full rounded-md shadow-lg bg-white flex flex-col md:flex-row gap-6 p-4 mt-4`}
        >
            <div className="w-full flex-1">
                <div className="relative h-[240px]">
                    <Image
                        alt={"Landing page Banner"}
                        src={
                            thumbnail
                                ? `${process.env.BASE_URL}/api/v1/core/products/thumbnail/${thumbnail}`
                                : "/temp-product-img.png"
                        }
                        fill
                        style={{ objectFit: "cover", objectPosition: "center" }}
                        className="rounded-md"
                    />
                </div>
             
                <div className="flex gap-10 items-center py-4 ">
                    {thumbnail_colors ? (
                        <div className={""}>
                            <h3 className={`text-base ${barlowSemi.className}`}>
                                Color:
                            </h3>
                            <ColorSelector colors={thumbnail_colors} />
                        </div>
                    ) : null}
                    {pricing ? (
				<SelectOption
					label='Finish'
					options={pricing}
					selectedOption={activeFinish}
				    onSelectOption={setActiveFinish}
                    getKey={(option) => option?.finish || ''}
				/>
			) : null}
                </div>
            </div>
            <div
                className={"w-full mt-4 md:mt-0 flex-1 max-h-max"}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <div className="w-full">
                    <h3 className={`text-lg ${barlowSemi.className}`}>
                        {name}
                    </h3>
                    <div className="py-4">
                        <StarRating
                            rating={review_summary ?? 0}
                            reviewCount={total_reviews ?? 0}
                        />
                    </div>
                    <ProductOptions product={product} />
                </div>
                <div
                    className={`w-full flex flex-col sm:flex-row justify-between items-center py-4 gap-8`}
                >
                    <button className="button-secondary font-medium text-sm border border-red w-full">
                        Buy Now
                    </button>
                    <button className="button-primary font-medium text-sm w-full flex items-center justify-center gap-6">
                        <BsCart2 size={"20"} />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
