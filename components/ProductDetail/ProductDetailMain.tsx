import Image from "next/image";
import { Barlow } from "next/font/google";
import StarRating from "./StarRating";
import { BsCart2 } from "react-icons/bs";
import { ProductEntity } from "@/types/product/Product";
import ProductOptions from "./ProductOptions";

const barlowSemi = Barlow({
    style: "normal",
    weight: "600",
    subsets: ["latin"],
});

interface Props {
    product: ProductEntity;
}

export default function ProductDetailMain({ product }: Props) {
    const {
        name,
        average_rating,
        reviews,
        thumbnails,
        review_summary,
        total_reviews,
    } = product;
    const thumbnail =
        thumbnails && thumbnails?.length > 0
            ? thumbnails[0].thumbnail_code
            : null;

    return (
        <div
            className={`w-full rounded-md shadow-lg bg-white flex flex-col md:flex-row gap-6 p-4 mt-4`}
        >
            <div className="w-full md:w-[35%]">
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
                {/* TODO: Hide this as it's not applicable on the api yet */}
                {/* <div className={'py-4'}>
					<h3 className={`text-base ${barlowSemi.className}`}>
						Select Finish:
					</h3>
					<ColorSelector />
				</div> */}
            </div>
            <div
                className={"w-full mt-4 md:mt-0 md:w-[65%] max-h-max"}
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
                    className={`w-full flex justify-between items-center py-4 gap-8`}
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
