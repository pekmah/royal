import useAuth from "@/hooks/useAuth"
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server"

import { NextApiRequest, NextApiResponse } from 'next';
import  {getUser}  from '@/hooks/useAuth';

export  const POST = async(req:Request,) => {
    try {
      const data = await req.json();
      console.log(data)
      const userData = await getUser();
      console.log(userData)
       // Retrieve user data from your auth system
      
    //   const isCurrentPasswordValid = await bcrypt.compare(data.current_pass, userData.password);
    //   if (!isCurrentPasswordValid) {
    //     return new NextResponse( 'Invalid current password', {status:401})
    //   }

      // Handle changing password and sending success response
      return new NextResponse( 'Password changed successfully', {status:200})
    //   return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error(error);
      return new NextResponse( 'Internal server error', {status:500})
    //   return res.status(500).json({ error: 'Internal server error' });
    }
  } 
