"use client"
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import { Barlow } from 'next/font/google';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { IoArrowBackOutline } from 'react-icons/io5'

const barlowSemi = Barlow({
    style: 'normal',
    weight: '600',
    subsets: ['latin'],
});

const ChangePassword = ({ initialPass }: { initialPass: string }) => {
    // console.log(initialPass)
    const router = useRouter()
    const { changePassword} = useAuth()
    const [current_pass, setCurrent_pass] = useState('')
    const [new_pass, setNew_pass] = useState('')
    const [confirm_new_pass, setConfirm_new_pass] = useState('')

  

    const passwordChange = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if (current_pass === '' || new_pass === '' || confirm_new_pass=='' ) {
            toast.error("Fill all fields!")
            return
        }
    
        if (new_pass !== confirm_new_pass) {
            toast.error("Password do not match")
            return;
          }
    
        if (confirm_new_pass.length < 6) {
            toast.error("Password must be at least 6 characters long")
            return
        }
        
        try {
            const data = {
                current_pass,
                new_pass,
                confirm_new_pass
            }
    
            const checkResponse = await axios.post('/api/user/password_change', data);

          console.log(checkResponse)
            await changePassword(data, initialPass)
        }catch(e){
            throw e
        }
    }

    return (
        <div className='flex flex-col min-w-[50vw] flex-grow h-full bg-white shadow-md rounded-md max-w-full px-4'>
            <div onClick={() => router.back()} className='flex w-full cursor-pointer gap-2 items-center'>
      <IoArrowBackOutline size={25} />
                <h3 className={`${barlowSemi.className} p-4 `}>Personal Details</h3>
            </div>
            <hr className="text-grey w-full mb-4" />

            <form onSubmit={passwordChange} className='h-full w-full gap-4' >
                <div className=' flex w-full flex-col gap-2'>
                    <label htmlFor="c-password">Current Password</label>
                    <input
                        type="password"
                        id='c-password'
                        value={current_pass}
                        onChange={(e)=>setCurrent_pass(e.target.value)}
                        placeholder='Enter current password'
                        className='border outline-none  rounded-md border-grey px-4 py-2.5' />
                </div>
                <div className=' flex gap-4 items-center w-full py-4'>

                    <div className=' flex w-full flex-col gap-2'>
                        <label htmlFor="newPassword">Confirm Password</label>
                        <input
                            type="password"
                            id='newPassword'
                            value={new_pass}
                            onChange={(e)=>setNew_pass(e.target.value)}
                            placeholder='Enter new password'
                            className='border outline-none rounded-md border-grey px-4 py-2.5' />
                    </div>
                    <div className=' flex w-full flex-col gap-2'>
                        <label htmlFor="password">Confirm Password</label>
                        <input
                            type="password"
                            id='password'
                            value={confirm_new_pass}
                            onChange={(e)=>setConfirm_new_pass(e.target.value)}
                            placeholder='Enter new password'
                            className='border outline-none rounded-md border-grey px-4 py-2.5' />
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
