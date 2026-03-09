import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	async redirects() {
		return [
			{
				// QR code on flyers/cards/magnets points to /scan permanently.
				// Change "destination" anytime to redirect QR traffic elsewhere.
				source: '/scan',
				destination: '/',
				permanent: false // 307 — keeps it "dynamic" so browsers don't cache it
			}
		]
	}
}

export default nextConfig
