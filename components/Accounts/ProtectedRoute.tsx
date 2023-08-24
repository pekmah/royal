"use client"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { ProductCardSkeleton } from '../Product/ProductCard'
const ProtectedRoute = ({children}:{children:React.ReactNode}) => {
const {status} = useSession()
const router = useRouter()
if (status === 'unauthenticated'){
    router.push('/')
}
if (status === 'loading'){
    <ProductCardSkeleton/>
}
return(
    <>{children}</>
)

}

export default ProtectedRoute