import { postRequest } from '@/utils/request';

export async function POST(request: Request) {
	const data = await request.json();
	try {
		const res = await postRequest('/api/v1/auth/user/login/', data);
		return new Response(JSON.stringify(res.data));
	} catch (e: any) {
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
}
