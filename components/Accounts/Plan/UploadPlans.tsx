import React from 'react'
import PendingEmpty from './Empty'

const UploadPlans = () => {
  const text = "No Plans are here for you.Upload new plans or open the received quotes tab"
  return (
    <div className='w-full  relative'>
      <PendingEmpty text={text}/>
    </div>
  )
}

export default UploadPlans