import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: 'SaveGreen Cleaning Solutions',
	description:
		'Professional, reliable & affordable cleaning services. Home, office, end of lease, and more.',
	icons: {
		icon: '/SaveGreen_Logo_real.png',
		apple: '/SaveGreen_Logo_real.png'
	},
	openGraph: {
		title: 'SaveGreen Cleaning Solutions',
		description:
			'Professional, reliable & affordable cleaning services. Home, office, end of lease, and more.',
		images: [{ url: '/SaveGreen_Logo_real.png' }],
		type: 'website'
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				suppressHydrationWarning
			>
				{children}
			</body>
		</html>
	)
}
