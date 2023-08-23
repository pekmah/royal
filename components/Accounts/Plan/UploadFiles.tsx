"use client"
import pdf from '@/public/pdf.png'
import { Barlow } from 'next/font/google';
import React from 'react'
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5'
import Image from 'next/image';
import useAuth from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';

const barlowSemi = Barlow({
	style: 'normal',
	weight: '600',
	subsets: ['latin'],
});
const UploadFiles = ({selectedFile, closeUpload}:any) => {
  const session = useSession()
  // console.log(session)
  const { uploadImage } = useAuth();
  // console.log(selectedFile)
  if (session.status === 'unauthenticated'){
    toast.error('Please login to upload plan')
    return
  }
  const handleUpload = () => {
    if (selectedFile) {
      uploadImage(selectedFile);
      toast.success('Plan uploaded')
    }
    closeUpload(false)
  };
  return (
    <div className='bg-white h-full w-full'>
      {selectedFile && (
        <div>
         <div onClick={()=>closeUpload(false)} className='flex w-full cursor-pointer gap-2 items-center'>
         <IoArrowBackOutline size={25}/>
             <h3 className={`${barlowSemi.className} p-4 `} style={{whiteSpace:'nowrap'}}>{selectedFile.name}</h3>
         </div>
         <hr className="text-grey w-full mb-2" />
          <div className=''>
            <div className='relative w-[280px] h-[180px] bg-gray overflow-hidden rounded-2xl'>
              <Image fill priority className='object-cover' src={pdf} alt=''/>
            </div>
            <button onClick={handleUpload} style={{whiteSpace:'nowrap'}} className='button-primary border my-4 border-white rounded-md py-2.5 flex gap-2 items-center'>
              <span>Request Quote Plan</span>
              <IoArrowForwardOutline size={20}/>
            </button>
          </div>
        </div>
      )}
      
    </div>
  )
}

export default UploadFiles