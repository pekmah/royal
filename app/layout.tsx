import { Toaster } from 'react-hot-toast';
import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import AuthProvider from '@/components/Provider';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import Container from '@/components/MainContainer';

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
					<Header />
					<main className={`w-screen p-8 flex gap-8 bg-[#fbfbff]`}>
						<Sidebar />
						<Container>{children}</Container>
					</main>
					<Footer />
					<Toaster position='bottom-right' reverseOrder={false} />
				</body>
			</AuthProvider>
		</html>
	);
}
