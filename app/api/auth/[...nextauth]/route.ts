import parseServerErrors from '@/utils/parseServerErrors';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: '',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
				},
				password: {
					label: 'Password',
					type: 'password',
				},
			},
			async authorize(credentials, req) {
				try {
					const res = await fetch(
						`${process.env.NEXTAUTH_URL}/api/auth/login`,
						{
							body: JSON.stringify({
								email: credentials?.email,
								password: credentials?.password,
							}),
							method: 'POST',
						}
					);
					const resData = await res.json();
					if (res.status === 200) {
						return {
							accessToken: resData['access-token'],
							refreshToken: resData['refresh_token'],
							id: resData['access-token'],
						};
					} else {
						throw new Error(parseServerErrors(resData));
					}
				} catch (e: any) {
					throw new Error('Failed to authenticate: ' + e.message);
				}
			},
		}),
	],
	callbacks: {
		async signIn(data) {
			console.log('signin callback', data);
			return true;
		},
	},
});

export { handler as GET, handler as POST };
