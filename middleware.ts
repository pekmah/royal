import { NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
	const cookies = request.cookies.get('accessToken');
	const response = NextResponse.next();
	if (cookies) {
		response.headers.set('Authorization', `Bearer ${cookies.value}`);
	}
	return response;
}
