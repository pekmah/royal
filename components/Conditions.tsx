"use client"
import {TermsCondition} from '@/data/AboutMockData';
import {Barlow} from 'next/font/google';
import React, {useState} from 'react'
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';

const barlowSemi = Barlow({
    style: 'normal',
    weight: '600',
    subsets: ['latin'],
});
const barlowMedium = Barlow({
    style: 'normal',
    weight: '500',
    subsets: ['latin'],
});

const barlowSmall = Barlow({
    style: 'normal',
    weight: '400',
    subsets: ['latin'],
});

const TermsConditions = () => {
    const [showTerms, setShowTerms] = useState<number | null>(null)
    const handleShowAnswers = (id: number) => {
        setShowTerms(id === showTerms ? null : id)
    }

    const termsElements = TermsCondition.map(({id, heading, terms}) => (
        <div key={id} className=' px-4 py-3'>
            <div onClick={() => handleShowAnswers(id)}
                 className=' flex items-center gap-4 justify-between border-grey-500/30 py-2'>
                <h2 className={`${barlowMedium.className}`}>{heading}</h2>
                {
                    showTerms === id ? <IoIosArrowUp className=" text-xl text-primary_red cursor-pointer  "/> :
                        <IoIosArrowDown className=" text-xl text-primary_red cursor-pointer "/>
                }


            </div>
            {
                showTerms === id &&
                (<div className="overflow-y-auto  duration-500 ease-in">
                    <p className={` ${barlowSmall.className} text-lightgrey leading-[24px]`}>{terms}</p>
                </div>)

            }
        </div>
    ))
    return (
        <div>
            <h2 className={`${barlowSemi.className} flex-1 text-[20px] bg-[#F3F3F3] py-6 text-center`}>
                <span className='text-black'>Our </span>
                <span className='text-primary_red'> Corporate Social Responsibility</span>
            </h2>
            <div className='grid grid-cols-1 gap-4'>
                {termsElements}
            </div>

        </div>
    )
}

export default TermsConditions
