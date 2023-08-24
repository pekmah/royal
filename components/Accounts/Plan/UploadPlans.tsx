import React from 'react'
import PendingEmpty from './Empty'
import useAuth from '@/hooks/useAuth';
import { useQuery } from 'react-query';
import Shared from './Shared';

const UploadPlans = ({status}:{status:string}) => {
  const {fetchPhotosByStatus} = useAuth()
    const {data}  = useQuery(['photos', status], () => fetchPhotosByStatus(status));
   
  const text = "No Plans are here for you.Upload new plans or open the received quotes tab"
  return (
    <div className='w-full  relative'>
      {data && data.results.length > 0 ? (
        <Shared requests={data.results} />
      )  : <PendingEmpty text={text}/> }

    </div>
  )
}

export default UploadPlans