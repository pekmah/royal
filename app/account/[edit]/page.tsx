"use client"
import useAuth from '@/hooks/useAuth';
import { UserEntity } from '@/types/user/User';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import ChangePassword from '@/components/Accounts/Details/ChangePassword';
import EditDetails from '@/components/Accounts/Details/EditDetails';
import { usePathname } from 'next/navigation';


const Edit = () => {
  const pathname = usePathname()
  const { getUser } = useAuth()
  const [data, setData] = useState<UserEntity | null>(null)
  const { data: session } = useSession()
  const accessToken = session?.user


  // console.log(accessToken)
  useEffect(() => {
    const fetchUser = async () => {
      if (accessToken) {
        const userData = await getUser()
        setData(userData)
      }
    }
    fetchUser()
  }, [accessToken, data])

  return (
    <div>
      {pathname === '/account/edit' && data ? (
        <EditDetails userEmail={data.email}
          firstName={data.first_name}
          lastName={data.last_name}
          phoneNumber={data.phone_number} />
      ) : null}
      {pathname === '/account/change-password' &&  data ? <ChangePassword initialPass = {data.password} /> : null}
    </div>

  )
}

export default Edit