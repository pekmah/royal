import { Toaster } from 'react-hot-toast';
import './globals.css';
import { Inter } from 'next/font/google';
import AuthProvider from '@/components/Provider';
import Footer from '@/components/PageSections/Footer';
import MainContainer from '@/components/PageSections/MainContainer';

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
					<MainContainer>{children}</MainContainer>
					<Footer />
					<Toaster position='bottom-right' reverseOrder={false} />
				</body>
			</AuthProvider>
		</html>
	);
}
