import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/ui/sidebar';
import { TourButton } from '@/components/TourButton';
import { TourProvider } from '@/components/TourProvider';

export const metadata: Metadata = {
	title: 'CartAnalytics - SaaS Dashboard',
	description: 'Analyze abandoned carts and recover lost revenue with AI-powered insights',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className='antialiased'>
				<TourProvider>
					<Sidebar>{children}</Sidebar>
					<TourButton />
				</TourProvider>
			</body>
		</html>
	);
}
