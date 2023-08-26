import {AboutData} from '@/app/about/data';
import {Barlow} from 'next/font/google';
import Image from 'next/image';
import React from 'react'

const barlowSemi = Barlow({
    style: 'normal',
    weight: '600',
    subsets: ['latin'],
});
const AboutCorporate = () => {
    // console.log(AboutData)

    return (
        <div className='pt-6'>
            <h2 className={`${barlowSemi.className} flex-1 text-[20px] py-6 text-center`}>
                <span className='text-black'>Our </span>
                <span className='text-primary_red'> Corporate Social Responsibility</span>
            </h2>
            <p className='text-sm leading-[24px] text-lightgrey'>{AboutData.message}</p>
            <div className='py-8'>
                {AboutData.context.map(({id, image, subtitle, content}) => (
                    <div className='flex gap-8 even:flex-row-reverse w-full justify-between py-8' key={id}>
                        <div className='relative h-[370px] w-[580px] flex-1'>
                            <Image className='w-full object-cover' fill src={image} alt=''/>
                        </div>
                        <div className='flex-1'>
                            <h4 className={`${barlowSemi.className} py-4`}>{subtitle}</h4>
                            <p className='text-sm leading-[24px] text-lightgrey'>{content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AboutCorporate
