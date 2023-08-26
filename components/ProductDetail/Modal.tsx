import Image from 'next/image'
import React, {useState} from 'react'
import ColorSelector from './ColorSelector';
import {Barlow} from 'next/font/google';
import {MdOutlineCancel} from 'react-icons/md';
import {ProductCardSkeleton} from '../Product/ProductCard';

const barlowSemi = Barlow({
    style: "normal",
    weight: "600",
    subsets: ["latin"],
});

const Modal = ({roof, closeModal, color}: {
    roof: { roof_thumbnail: string, roof_detail_color: string }[],
    closeModal: React.Dispatch<React.SetStateAction<boolean>>,
    color: string[]
}) => {
    const [selectedColor, setSelectedColor] = useState<string | undefined>(color ? color[0] : undefined);

    const thumbnail = roof && roof?.length > 0
        ? roof.find((t) => t.roof_detail_color === selectedColor) ?? null
        : null;

    return (
        <div
            className='absolute inset-0 z-20 opacity-100 min-h-screen bg-slate-950 backdrop-blur backdrop-filter bg-opacity-50 w-full'>
            <div className='relative w-full h-full'>
                <div
                    className='w-[50vw] mx-auto bg-white absolute rounded-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100 h-[50vh]'>
                    <div className='flex w-full gap-4 overflow-hidden'>
                        {
                            roof.length > 0 ?
                                <div className="relative h-[50vh] w-[30vw] rounded-l-2xl overflow-hidden">
                                    <Image
                                        alt={"Product Thumbnail"}
                                        src={
                                            thumbnail
                                                ? `${process.env.BASE_URL}/${thumbnail.roof_thumbnail}`
                                                : "/temp-product-img.png"
                                        }
                                        fill
                                        style={{objectFit: "cover", objectPosition: "center"}}
                                        className="rounded-md"
                                    />


                                </div> : <ProductCardSkeleton/>
                        }
                        {roof ? (
                            <div className={"flex-1"}>
                                <h3 className={`text-base ${barlowSemi.className}`}>
                                    Color:
                                </h3>
                                <ColorSelector
                                    colors={color}
                                    onSelectColor={setSelectedColor}
                                />
                            </div>
                        ) : null}
                        <div onClick={() => closeModal(false)}
                             className='absolute transition-all ease-in top-4 hover:text-primary_red cursor-pointer text-blue right-4 z-10 opacity-100'>
                            <MdOutlineCancel size={30}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal