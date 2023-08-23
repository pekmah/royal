import parseServerErrors from '@/utils/parseServerErrors';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import Cookies from 'js-cookie';

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
		async jwt({ token, user }) {
			return { ...token, ...user };
		  },
		session: async ({ session, token, user }:{session:any, token:any, user:any}) => {
			// console.log({ session, token, user });
			if (session) {
			  // Save the session token as a cookie
			  session.user = token.sub;
			  Cookies.set('accessToken', token.sub, {
				expires: new Date(session.expires * 1000), // Set the cookie expiration based on session expiration
			  });
			//   console.log(token.sub)
			  return session;
			} else {
			  return null;
			}
		  },
	},
});

export { handler as GET, handler as POST };
