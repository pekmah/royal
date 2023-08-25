"use client"

import { Barlow } from 'next/font/google';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import useAuth from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';


const barlowSemi = Barlow({
    style: 'normal',
    weight: '600',
    subsets: ['latin'],
});
interface detailsProps {
    userEmail: string
    firstName: string
    lastName: string
    phoneNumber: string
}

const EditDetails = ({ userEmail, firstName, lastName, phoneNumber }: detailsProps) => {
    const router = useRouter()
    const { updateUserDetails } = useAuth()

    const [first_name, _setFirst_name] = useState(firstName)
    const [last_name, _setLast_name] = useState(lastName)
    const fullNames = `${first_name} ${last_name}`
    const [fullName, setFullName] = useState(fullNames)
    const [email, setEmail] = useState(userEmail)
    const [phone, setPhone] = useState(phoneNumber)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const part = fullName.split(' ')

        try {
            const data = {
                first_name: part[0],
                last_name: part[1],
                email,
                phone
            }
            await updateUserDetails(data);
        } catch (e: any) {
            throw e
        }
    }

    const handleCancel = () => {
        setFullName(fullNames)
        setEmail(userEmail)
        setPhone(phoneNumber)




    }
    return (
        <div className='flex flex-col min-w-[50vw] flex-grow h-full bg-white shadow-md rounded-md max-w-full px-4'>
            <div onClick={() => router.push('/account')} className='flex w-full gap-2 items-center cursor-pointer'>
                <IoArrowBackOutline size={25} />
                <h3 className={`${barlowSemi.className} p-4 `}>Personal Details</h3>
            </div>
            <hr className="text-grey w-full mb-4" />

            <form onSubmit={handleSubmit} className='h-full w-full gap-4' >
                <div className=' flex-col md:flex gap-4 items-center w-full'>

                    <div className=' flex w-full flex-col gap-2'>
                        <label htmlFor="name">Full Name</label>
                        <input type="text"
                            id='name'
                            className='border outline-none rounded-md border-grey px-4 py-2.5'
                            onChange={(e) => setFullName(e.target.value)}
                            value={fullName} />
                    </div>
                    <div className=' flex w-full flex-col gap-2'>
                        <label htmlFor="email">Email</label>
                        <input type="text"
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter Your Email'
                            className='border outline-none rounded-md border-grey px-4 py-2.5' />
                    </div>
                </div>
                <div className=' flex w-full flex-col gap-2 py-4'>
                    <label htmlFor="phone">Phone</label>
                    <input type="text"
                        id='phone'
                        value={phone}
                        placeholder='+254 703 567 890'
                        onChange={(e) => setPhone(e.target.value)}
                        className='border outline-none  rounded-md border-grey px-4 py-2.5' />
                </div>

                <div className='flex gap-4 pb-4'>
                    <button type='button' onClick={handleCancel} className='button-secondary border border-red py-1.5 font-bold px-4'> Cancel</button>
                    <button className="button-primary py-1.5 ">Save</button>
                </div>
            </form>

        </div>
    )
}

export default EditDetails
