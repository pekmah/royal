import axios from 'axios';
import { UserEntity } from '../../../../types/user/User';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Perform the API request to get user details
    const response = await axios.get<UserEntity>(`${process.env.BASE_URL}/api/v1/auth/user/`);

    // Return the response data
    console.log(response)
    return new NextResponse(JSON.stringify(response.data));
  } catch (e: any) {
    return new NextResponse(JSON.stringify(e.response.data), {
      status: e.response.status,
    });
  }
}