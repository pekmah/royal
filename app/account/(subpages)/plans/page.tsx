"use client"

import RecievedQuotes from "@/components/Accounts/Plan/RecievedQuotes";

import UploadFiles from "@/components/Accounts/Plan/UploadFiles";

import UploadPlans from "@/components/Accounts/Plan/UploadPlans";
import useAuth from "@/hooks/useAuth";

import { Barlow } from "next/font/google";

import { ChangeEvent, useState } from "react"

import { BsUpload } from "react-icons/bs";
import { useQuery } from "react-query";

const barlowSemi = Barlow({
    style: 'normal',
    weight: '600',
    subsets: ['latin'],
});

const Plans = () => {
    const [togglePlans, setTogglePlans] = useState<boolean>(true)
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [closeUploadFiles, setCloseUploadFile] =  useState(false)
    const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files && files?.length > 0) {

            const file = files[0]

            setSelectedFile(file)

        }
        setCloseUploadFile(true)
    };
    //   console.log(selectedFile)

    return (

        <div className="p-4 w-full h-full">
            <nav className="w-full flex justify-between items-center">
                <ul className="flex gap-6">
                    <li onClick={() => setTogglePlans(true)} className={`${togglePlans ? "text-blue border-b-2 border-spacing-4 border-red " : "text-[#B3B3B3] "} py-2 ${barlowSemi.className} `}>Uploaded Plans(0)</li>
                    <li onClick={() => setTogglePlans(false)} className={`${togglePlans ? `text-[#B3B3B3] ` : " text-blue border-b-2 border-red border-spacing-4 "} py-2 ${barlowSemi.className} `}>Recieved Quotes(0)</li>

                </ul>

                <label className="button-primary py-2 cursor-pointer flex gap-2 items-center max-w-max  ">

                    <BsUpload size={25} />

                    <span>UploadPlan</span>

                    <input className="hidden" type="file" onChange={uploadFile} />

                </label>

            </nav>

            <hr className="text-grey w-full mb-4" />

            {selectedFile && closeUploadFiles && <UploadFiles selectedFile={selectedFile} closeUpload = {setCloseUploadFile} />}

            <div>
                {

                    togglePlans ? <UploadPlans status="pending" /> : <RecievedQuotes status="received" />

                }

            </div>

        </div>

    )

}







export default Plans