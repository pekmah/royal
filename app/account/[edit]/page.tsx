"use client"
import ChangePassword from '@/components/ChangePassword';
import EditDetails from '@/components/EditDetails';
import { usePathname } from 'next/navigation';


const Edit = () => {
   const pathname = usePathname()
  return (
    <div>

        {pathname === '/account/edit' && <EditDetails/>}
        {pathname === '/account/change-password' && <ChangePassword/>}
    </div>
    
  )
}

export default Edit