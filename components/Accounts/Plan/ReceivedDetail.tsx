import Image from 'next/image'
import React, { useState } from 'react'
import pdf from '@/public/pdf.png'
import { IoArrowBackOutline } from 'react-icons/io5'
import { Barlow } from 'next/font/google';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { useQuery } from 'react-query';
import useAuth from '@/hooks/useAuth';

const barlowSemi = Barlow({
    style: 'normal',
    weight: '600',
    subsets: ['latin'],
});

const ReceivedDetail = ({ name, close, quote_file }: { name: string, close: React.Dispatch<React.SetStateAction<boolean>>, quote_file:string }) => {
    const {fetchQuoteFile}  = useAuth()
    // const {data} = useQuery(["quote_file"], () =>fetchQuoteFile(quote_file) )
    const [isDownloading, setIsDownloading] = useState(false);
    const handleDownload = async () => {
        if (!isDownloading) {
            setIsDownloading(true);
            try {
                // Fetch the file using the fetchQuoteFile function
                const fileData = await fetchQuoteFile(quote_file);
    
                // Create a Blob from the fetched data
                const blob = new Blob([fileData], { type: 'application/pdf' });
    
                // Create a URL for the Blob
                const url = window.URL.createObjectURL(blob);
    
                // Create a temporary anchor element for downloading
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = name;
                document.body.appendChild(a);
    
                // Simulate a click on the anchor element to trigger the download
                a.click();
    
                // Clean up
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            } catch (error) {
                console.error('Download error:', error);
            } finally {
                setIsDownloading(false);
            }
        }
    };  
  return(
        <div className=' bg-white absolute inset-0 -top-[78%] md:-top-16 -left-6 px-4 opacity-100 z-20 min-h-[73vh] max-h-full w-[65vw] md:w-[71vw]'>
            {name && (
                <div>
                    <div onClick={() => close(false)} className='flex w-full cursor-pointer gap-2 items-center'>
                        <IoArrowBackOutline size={25} />
                        <h3 className={`${barlowSemi.className} p-4 `} style={{ whiteSpace: 'nowrap' }}>View_Quote</h3>
                    </div>
                    <hr className="text-grey w-full mb-2" />
                    <div className='max-w-sm md:max-w-lg'>
                        <div className='relative w-[12.25rem] h-[9.5rem] md:w-[15.625rem] md:h-[12.5rem] bg-gray overflow-hidden rounded-2xl'>
                            <Image fill priority className='object-cover' src={pdf} alt='' />
                        </div>
                        <h3 className={`${barlowSemi.className} py-4`}>Sent Quote</h3>
                        <p className='text-sm md:text-base'>This is a quote from royal mabati team, it should guide on the number and  size you will need to cater for the plan</p>
                        <div onClick={handleDownload} className='button-primary text-xs md:text-sm md:max-w-max max-w-sm cursor-pointer border my-4 border-white rounded-md py-2.5 flex gap-2 items-center'>
                            <AiOutlineFilePdf size={20} />
                            <span>Download Quote</span>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default ReceivedDetail