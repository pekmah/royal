"use client"
import { useSession } from 'next-auth/react'
import React from 'react'

const page = () => {
  const session = useSession()
  console.log(session.data?.user?.name)
  return (
    <div>page</div>
  )
}

export default page