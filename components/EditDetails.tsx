"use client"
import { Barlow } from 'next/font/google';
import { useRouter } from 'next/navigation';
import React from 'react'
import {IoArrowBackOutline} from 'react-icons/io5'

const barlowSemi = Barlow({
	style: 'normal',
	weight: '600',
	subsets: ['latin'],
});

const EditDetails = () => {
    const router = useRouter()

  return (
    <div className='flex flex-col min-w-[50vw] flex-grow h-full bg-white shadow-md rounded-md max-w-full px-4'>
        <div onClick={()=>router.back()} className='flex w-full gap-2 items-center cursor-pointer'>
        <IoArrowBackOutline size={25}/>
            <h3 className={`${barlowSemi.className} p-4 `}>Personal Details</h3>
        </div>
        <hr className="text-grey w-full mb-4" />

        <form className='h-full w-full gap-4' >
            <div className=' flex gap-4 items-center w-full'>

                <div className=' flex w-full flex-col gap-2'>
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id='name' placeholder='Enter Your Full Name' className='border outline-none rounded-md border-grey px-4 py-2.5'/>
                </div>
                <div className=' flex w-full flex-col gap-2'>
                    <label htmlFor="email">Email</label>
                    <input type="text" id='email' placeholder='Enter Your Email' className='border outline-none rounded-md border-grey px-4 py-2.5' />
                </div>
            </div>
            <div className=' flex w-full flex-col gap-2 py-4'>
            <label htmlFor="phone">Phone</label>
            <input type="text" id='phone' placeholder='+254 703 567 890' className='border outline-none  rounded-md border-grey px-4 py-2.5' />
            </div>

            <div className='flex gap-4 pb-4'>
                <button className='button-secondary border border-red py-1.5 font-bold px-4'> Cancel</button>
                <button className="button-primary py-1.5 ">Save</button>
            </div>
        </form>

    </div>
  )
}

export default EditDetails
