"use client"
import axios from 'axios'
import { Barlow } from 'next/font/google';
import React, { useState, ChangeEvent } from 'react'
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5'
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const barlowSemi = Barlow({
	style: 'normal',
	weight: '600',
	subsets: ['latin'],
});
const UploadFiles = ({selectedFile}:any) => {
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)
  console.log(selectedFile)
  const handleUpload = async () => {
    console.log('clicked');
    
    const data = new FormData();
for (let i = 0; i < selectedFile.length; i++) {
  data.append("files", selectedFile[i], selectedFile[i].name);
}
    
    console.log(data); // Make sure data has the expected content
    
    try {
      const response = await axios.post('/api/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      console.log('File uploaded:', response.data);
  
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  return (
    <div className='bg-white h-full w-full'>
      {selectedFile && (
        <div>
         <div onClick={()=>router.back()} className='flex w-full cursor-pointer gap-2 items-center'>
         <IoArrowBackOutline size={25}/>
             <h3 className={`${barlowSemi.className} p-4 `}>{selectedFile.name}</h3>
         </div>
         <hr className="text-grey w-full mb-2" />
          <div className=''>
            <div className='relative w-[300px] h-[180px] bg-gray rounded-2xl'>
              <Image fill priority className='object-cover' src={''} alt=''/>
            </div>
            <button onClick={handleUpload} className='button-primary border my-4 border-white rounded-md py-2.5 flex gap-2 items-center'>
              <span>Request Quote Plan</span>
              <IoArrowForwardOutline size={25}/>
            </button>
          </div>
        </div>
      )}
      
    </div>
  )
}

export default UploadFiles