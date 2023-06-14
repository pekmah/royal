import { postRequest } from '@/utils/request';

export async function POST(request: Request) {
	const data = await request.json();
	try {
		const res = await postRequest('/api/v1/auth/user/password/request/', {
			email: data.email,
		});

		if ((res.data as any).status !== 200) {
			throw new Error(
				JSON.stringify({
					response: { data: res.data, status: (res.data as any).status },
				})
			);
		}

		return new Response(JSON.stringify(res.data));
	} catch (err: any) {
		const e = JSON.parse(err.message);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
}
