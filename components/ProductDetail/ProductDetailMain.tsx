import Image from "next/image";
import { useEffect } from 'react'
import { Barlow } from "next/font/google";
import StarRating from "./StarRating";
import { ProductEntity, ProductSizes } from "@/types/product/Product";
import ColorSelector from "./ColorSelector";
import { useState } from "react";
import SelectOption from "../SelectSize";
import { AiOutlineEye } from 'react-icons/ai'
import CostDisplay from './CostDisplay';
import SelectLength from '../SelectLength';
import { BsCart2 } from "react-icons/bs";
import QuantityCount from "./QuantityCount";
import { useCartContext } from "@/context/CartContext";

const barlowSemi = Barlow({
    style: "normal",
    weight: "600",
    subsets: ["latin"],
});

const barlowMedium = Barlow({
    style: "normal",
    weight: "500",
    subsets: ["latin"],
});

interface Props {
    product: ProductEntity;
}
interface Props {
    product: ProductEntity;
}

export default function ProductDetailMain({ product }: Props) {
    const {addToCart} = useCartContext()
    const {id, name, thumbnails, thumbnail_colors, pricing, length, review_summary, total_reviews, roof_details } = product;
    const [activeFinish, setActiveFinish] = useState(pricing ? pricing[0] : undefined);
    const [selectedColor, setSelectedColor] = useState<string | undefined>(thumbnail_colors ? thumbnail_colors[0] : undefined);

    const [activeGauge, setActiveGauge] = useState<ProductSizes | null>(null);
    const [activeWidth, setActiveWidth] = useState<ProductSizes | null>(null);
    const [activeLength, setActiveLength] = useState<number | null>(null);

    const [quantity, setQuantity] = useState(1);
    useEffect(() => {
        if (!length || length.length === 0) {
            setActiveLength(null);
        } else {
            setActiveLength(Number(length[0])); // Set the default length when available
        }
    }, [length]);
    const selectedPricing = pricing?.find(
        (p) =>
            p?.gauge_size === activeGauge?.gauge_size
             && p?.finish === activeFinish?.finish
    );

    const unitPrice = selectedPricing?.price || 0;
    const totalPrice = (activeLength || 0) * unitPrice * quantity;
    const isAddToCartDisabled = !selectedPricing || activeLength === null;
    const thumbnail = thumbnails && thumbnails?.length > 0
        ? thumbnails.find((t) => t.thumbnail_color === selectedColor)?.thumbnail_code ?? null
        : null;

        const handleAddToCart = () => {
            if (selectedPricing && activeLength !== null) {
                addToCart(product, id );
            }
        };
    
    return (
        <div
            className={`w-full rounded-md shadow-lg bg-white flex flex-col md:flex-row gap-6 p-4 mt-4`}
        >
            <div className="w-full flex-1">
                <div className="relative h-[240px]">
                    <Image
                        alt={"Product Thumbnail"}
                        src={
                            thumbnail
                                ? `${process.env.BASE_URL}/api/v1/core/products/thumbnail/${thumbnail}`
                                : "/temp-product-img.png"
                        }
                        fill
                        style={{ objectFit: "cover", objectPosition: "center" }}
                        className="rounded-md"
                    />
                    {roof_details.length > 0 && <div className={`absolute cursor-pointer top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue rounded-3xl bg-white/80 z-10 flex gap-2 items-center px-4 py-1.5 `}>
                        <AiOutlineEye size={25} />
                        <p className={`${barlowMedium.className}`}>View Roof</p>
                    </div>}
                </div>

                <div className="flex gap-10 items-center py-4 ">
                    {thumbnail_colors ? (
                        <div className={""}>
                            <h3 className={`text-base ${barlowSemi.className}`}>
                                Color:
                            </h3>
                            <ColorSelector
                                colors={thumbnail_colors}
                                onSelectColor={setSelectedColor}
                            />
                        </div>
                    ) : null}
                    {pricing && pricing[0]?.finish !== null && (
                        <SelectOption
                            label='Finish'
                            options={pricing!}
                            selectedOption={activeFinish}
                            onSelectOption={setActiveFinish}
                            getKey={(option) => option?.finish || ''}
                        />
                    )}
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
                    <h3 className={`text-lg ${barlowSemi.className} py-4`}>
                        {name}
                    </h3>
                    {
                        review_summary > 0 && total_reviews > 0 &&(

                            <div className="py-4">
                                <StarRating
                                    rating={review_summary ?? 0}
                                    reviewCount={total_reviews ?? 0}
                                />
                            </div>
                        )
                    }
                    <div className=' flex gap-4'>
                        {pricing && pricing[0]?.gauge_size !== null && (
                            <SelectOption<ProductSizes>
                                label='Gauge Size'
                                explanatoryText="Thicker gauges are stronger"
                                options={pricing!}
                                selectedOption={activeGauge}
                                onSelectOption={setActiveGauge}
                                getKey={(option) => option?.gauge_size || ''}
                            />
                        )}

                    </div>
                    <div className=' flex gap-4 pt-4'>
                        {length?.length > 0 && length !== null && (
                            <SelectLength
                                label='Length'
                                options={length}
                                selectedOption={activeLength}
                                onSelectOption={setActiveLength}
                            />
                        )}
                        {pricing && pricing[0]?.width !== null && (
                            <SelectOption<ProductSizes>
                                label='Width'
                                explanatoryText='Default Width is !000mm, Select Custom for more'
                                options={pricing!}
                                selectedOption={activeWidth}
                                onSelectOption={setActiveWidth}
                                getKey={(option) => option?.width || ''}
                            />
                        )}


                    </div>
                    <QuantityCount quantity={quantity} onQuantityChange={setQuantity} />
                    <div
                        className={`w-full flex flex-col sm:flex-row justify-between items-center py-4 gap-20`}
                    >
                        <CostDisplay activeSize={activeGauge} quantity={quantity} total={totalPrice} />
                        <button
                            className="button-primary disabled:text-red disabled:bg-[#FCC2C0] font-medium text-sm max-w-xs py-2 flex flex-1 items-center justify-center gap-6"
                            onClick={handleAddToCart}
                            disabled={isAddToCartDisabled}
                        >
                            <BsCart2 size={"20"} />
                            <span>Add to Cart</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
