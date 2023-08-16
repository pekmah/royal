import { Toaster } from 'react-hot-toast';
import './globals.css';
import { Inter } from 'next/font/google';
import AuthProvider from '@/components/Providers/AuthProvider';
import MainContainer from '@/components/PageSections/MainContainer';
import QueryProvider from '@/components/Providers/QueryProvider';
import CartContextProvider from '@/context/CartContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Royal Mabati',
	description: 'Ecommerce Platform for Royal Mabati',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<AuthProvider>
				<body className={`${inter.className}`} style={{ overflowX: 'hidden' }}>
					<QueryProvider>
						<CartContextProvider>
						<MainContainer>{children}</MainContainer>
						<Toaster position='bottom-right' reverseOrder={false} />
						</CartContextProvider>
					</QueryProvider>
				</body>
			</AuthProvider>
		</html>
	);
}
