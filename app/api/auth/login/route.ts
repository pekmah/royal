import { postRequest } from '@/utils/request';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

export async function POST(request: Request) {
	const data = await request.json();
	try {
		const res = await postRequest('/api/v1/auth/user/login/', data);
		const response = new NextResponse(JSON.stringify(res.data));
		response.cookies.set('accessToken', `${res.data['access-token']}`);
		cookies().set('accessToken', `${res.data['access-token']}`)
		// console.log(cookies().set('accessToken', `${res.data['access-token']}`))
		return response;
	} catch (e: any) {
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
			
		});
	}
}
