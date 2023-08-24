import rectangle from '@/public/Rectangle-8.png'
import React, { useState } from 'react'
import Empty from './Empty'
import { StaticImageData } from 'next/image'
import useAuth from '@/hooks/useAuth'
import { useQuery } from 'react-query'
import Recieved from './Recieved'

export interface RequestProps {
    id: number;
    image: StaticImageData;
    roof_plan_file_name: string;
    quote_file_code:string
    quote_file_name:string
    created_at?:string | number | Date
    button: string;
  }

  
const RecievedQuotes = ({status}:{status:string}) => {
  const {fetchPhotosByStatus} = useAuth()
    const {data}  = useQuery(['photos', status], () => fetchPhotosByStatus(status));
    // console.log(data.results.length)
    const text = 'There are quotes for you yet. Request a quote from the uploaded plans tab'
  return (
    <div>
        {data && data.results.length > 0  ? (
        <Recieved requests={data.results} />
      )  : <Empty text={text}/> }

    </div>
  )
}

export default RecievedQuotes