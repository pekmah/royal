import Image from 'next/image'
import React from 'react'
import pdf from '@/public/pdf.png'
import { IoArrowBackOutline } from 'react-icons/io5'
import { Barlow } from 'next/font/google';
import { AiOutlineFilePdf } from 'react-icons/ai';

const barlowSemi = Barlow({
    style: 'normal',
    weight: '600',
    subsets: ['latin'],
});

const ReceivedDetail = ({ name, close }: { name: string, close: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <div className='bg-white absolute  opacity-100 z-20 h-full w-[100vh]'>
            {name && (
                <div>
                    <div onClick={() => close(false)} className='flex w-full cursor-pointer gap-2 items-center'>
                        <IoArrowBackOutline size={25} />
                        <h3 className={`${barlowSemi.className} p-4 `} style={{ whiteSpace: 'nowrap' }}>View_Quote</h3>
                    </div>
                    <hr className="text-grey w-full mb-2" />
                    <div className=''>
                        <div className='relative w-[350px] h-[230px] bg-gray overflow-hidden rounded-2xl'>
                            <Image fill priority className='object-cover' src={pdf} alt='' />
                        </div>
                        <h3 className={`${barlowSemi.className} py-4`}>Sent Quote</h3>
                        <p>This is a quote from royal mabati team, it should guide on the number and  size you will need to cater for the plan</p>
                        <a download={name} style={{ whiteSpace: 'nowrap' }} className='button-primary cursor-pointer border my-4 border-white rounded-md py-2.5 flex gap-2 items-center'>
                            <AiOutlineFilePdf size={20} />
                            <span>{name}</span>
                        </a>
                    </div>
                </div>
            )}

        </div>
    )
}

export default ReceivedDetail