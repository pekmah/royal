import { postRequest } from '@/utils/request';

export async function POST(request: Request) {
	const data = await request.json();
	try {
		const res = await postRequest('/api/v1/core/roof-plan/', data);
		// return new Response(JSON.stringify(res.data));
		console.log('sent')
	} catch (e: any) {
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
}
