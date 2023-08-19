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

const ChangePassword = () => {
    const router = useRouter()
  return (
    <div className='flex flex-col min-w-[50vw] flex-grow h-full bg-white shadow-md rounded-md max-w-full px-4'>
        <div onClick={()=>router.back()} className='flex w-full cursor-pointer gap-2 items-center'>
        <IoArrowBackOutline size={25}/>
            <h3 className={`${barlowSemi.className} p-4 `}>Personal Details</h3>
        </div>
        <hr className="text-grey w-full mb-4" />

        <form className='h-full w-full gap-4' >
            <div className=' flex w-full flex-col gap-2'>
            <label htmlFor="c-password">Current Password</label>
            <input type="password" id='c-password' placeholder='Enter current password' className='border outline-none  rounded-md border-grey px-4 py-2.5' />
            </div>
            <div className=' flex gap-4 items-center w-full py-4'>

                <div className=' flex w-full flex-col gap-2'>
                    <label htmlFor="newPassword">Confirm Password</label>
                    <input type="password" id='newPassword' placeholder='Enter new password' className='border outline-none rounded-md border-grey px-4 py-2.5'/>
                </div>
                <div className=' flex w-full flex-col gap-2'>
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" id='password' placeholder='Enter new password' className='border outline-none rounded-md border-grey px-4 py-2.5' />
                </div>
            </div>

            <div className='flex gap-4 pb-4'>
                <button className='button-secondary border border-red py-1.5 font-bold px-4'> Cancel</button>
                <button className="button-primary py-1.5 ">Save</button>
            </div>
        </form>

    </div>
  )
}

export default ChangePassword
