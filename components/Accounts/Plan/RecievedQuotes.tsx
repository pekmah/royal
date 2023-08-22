import rectangle from '@/public/Rectangle-8.png'
import React, { useState } from 'react'
import Empty from './Empty'
import Shared from './Shared'
import { StaticImageData } from 'next/image'

export interface RequestProps {
    id: number;
    image: StaticImageData;
    plan: string;
    button: string;
  }

  const requestsData: RequestProps[] = [
    {
      id: 1,
      image: rectangle,
      plan: 'My plan.pdf',
      button: 'Request a Quote',
    },
    {
      id: 2,
      image: rectangle,
      plan: 'My plan.pdf',
      button: 'Request a Quote',
    },
    {
      id: 3,
      image: rectangle,
      plan: 'My plan.pdf',
      button: 'Request a Quote',
    },
  ];
const RecievedQuotes = () => {
    const text = 'There are quotes for you yet. Request a quote from the uploaded plans tab'
  return (
    <div>
        {requestsData.length > 0 ? (
        <Shared requests={requestsData} />
      )  : <Empty text={text}/> }

    </div>
  )
}

export default RecievedQuotes