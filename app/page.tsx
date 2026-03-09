'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		suburb: '',
		service: '',
		message: ''
	})
	const [submitted, setSubmitted] = useState(false)
	const [sending, setSending] = useState(false)
	const [error, setError] = useState('')

	function handleChange(
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		setSending(true)
		setError('')

		try {
			const res = await fetch('/api/quote', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData)
			})

			if (!res.ok) throw new Error('Failed to send. Please try calling us.')

			setSubmitted(true)
		} catch {
			setError('Something went wrong. Please call us directly.')
		} finally {
			setSending(false)
		}
	}

	return (
		<div className="min-h-screen bg-white">
			{/* Header */}
			<header className="bg-green-700 text-white">
				<div className="mx-auto flex max-w-lg items-center justify-between px-5 py-4">
					<Image
						src="/SaveGreen_logo_4.png"
						alt="SaveGreen Cleaning Solutions"
						width={120}
						height={40}
						priority
					/>
					<a
						href="tel:0421565952"
						className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-green-700 shadow transition hover:bg-green-50 active:scale-95"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="h-5 w-5"
						>
							<path
								fillRule="evenodd"
								d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
								clipRule="evenodd"
							/>
						</svg>
						Call Now
					</a>
				</div>
			</header>

			{/* Hero Section */}
			<section className="bg-gradient-to-b from-green-700 to-green-600 px-5 pb-10 pt-6 text-center text-white">
				<h1 className="text-3xl font-extrabold leading-tight tracking-tight">
					SaveGreen
					<br />
					<span className="text-green-200">Cleaning Solutions</span>
				</h1>
				<p className="mx-auto mt-3 max-w-md text-base text-green-100">
					Professional, reliable &amp; affordable cleaning services.
					<br />
					Your satisfaction is our guarantee.
				</p>

				{/* CTA Buttons */}
				<div className="mx-auto mt-6 flex max-w-sm flex-col gap-3 sm:flex-row">
					<a
						href="tel:0421565952"
						className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-lg font-bold text-green-700 shadow-lg transition hover:bg-green-50 active:scale-95"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="h-6 w-6"
						>
							<path
								fillRule="evenodd"
								d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
								clipRule="evenodd"
							/>
						</svg>
						Call 0421 565 952
					</a>
					<a
						href="#quote"
						className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-900 px-6 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-green-800 active:scale-95"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="h-6 w-6"
						>
							<path d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
						</svg>
						Get Free Quote
					</a>
				</div>
			</section>

			{/* Services Snapshot */}
			<section className="mx-auto max-w-lg px-5 py-8">
				<h2 className="mb-5 text-center text-xl font-bold text-gray-900">
					Our Services
				</h2>
				<div className="grid grid-cols-2 gap-3">
					{[
						{ icon: '🏠', label: 'Home Cleaning' },
						{ icon: '🏢', label: 'Office Cleaning' },
						{ icon: '✨', label: 'End of Lease' },
						{ icon: '🪟', label: 'Window Cleaning' },
						{ icon: '🧹', label: 'Deep Cleaning' },
						{ icon: '🛋️', label: 'Carpet & Upholstery' }
					].map((service) => (
						<div
							key={service.label}
							className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-800 shadow-sm"
						>
							<span className="text-xl">{service.icon}</span>
							{service.label}
						</div>
					))}
				</div>
			</section>

			{/* Quote Form */}
			<section id="quote" className="bg-gray-50 px-5 py-10">
				<div className="mx-auto max-w-lg">
					<h2 className="mb-2 text-center text-xl font-bold text-gray-900">
						Get a Free Quote
					</h2>
					<p className="mb-6 text-center text-sm text-gray-500">
						Fill in your details and we&apos;ll get back to you within 24 hours.
					</p>

					{submitted ? (
						<div className="rounded-xl bg-green-50 border border-green-200 p-8 text-center">
							<div className="mb-3 text-4xl">✅</div>
							<h3 className="text-lg font-bold text-green-800">Thank you!</h3>
							<p className="mt-2 text-sm text-green-700">
								We&apos;ve received your quote request.
								<br />
								We&apos;ll get back to you within 24 hours.
							</p>
							<a
								href="tel:0421565952"
								className="mt-4 inline-block text-sm font-semibold text-green-700 underline"
							>
								Or call us now: 0421 565 952
							</a>
						</div>
					) : (
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label
									htmlFor="name"
									className="mb-1 block text-sm font-medium text-gray-700"
								>
									Your Name <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									id="name"
									name="name"
									required
									value={formData.name}
									onChange={handleChange}
									placeholder="John Smith"
									className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none"
								/>
							</div>

							<div>
								<label
									htmlFor="email"
									className="mb-1 block text-sm font-medium text-gray-700"
								>
									Email Address <span className="text-red-500">*</span>
								</label>
								<input
									type="email"
									id="email"
									name="email"
									required
									value={formData.email}
									onChange={handleChange}
									placeholder="john@example.com"
									className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none"
								/>
							</div>

							<div>
								<label
									htmlFor="phone"
									className="mb-1 block text-sm font-medium text-gray-700"
								>
									Phone Number <span className="text-red-500">*</span>
								</label>
								<input
									type="tel"
									id="phone"
									name="phone"
									required
									value={formData.phone}
									onChange={handleChange}
									placeholder="04XX XXX XXX"
									className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none"
								/>
							</div>

							<div>
								<label
									htmlFor="suburb"
									className="mb-1 block text-sm font-medium text-gray-700"
								>
									Suburb
								</label>
								<input
									type="text"
									id="suburb"
									name="suburb"
									value={formData.suburb}
									onChange={handleChange}
									placeholder="e.g. Melbourne CBD"
									className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none"
								/>
							</div>

							<div>
								<label
									htmlFor="service"
									className="mb-1 block text-sm font-medium text-gray-700"
								>
									Service Required
								</label>
								<select
									id="service"
									name="service"
									value={formData.service}
									onChange={handleChange}
									className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none"
								>
									<option value="">Select a service...</option>
									<option value="home">Home Cleaning</option>
									<option value="office">Office Cleaning</option>
									<option value="end-of-lease">End of Lease Cleaning</option>
									<option value="window">Window Cleaning</option>
									<option value="deep">Deep Cleaning</option>
									<option value="carpet">Carpet &amp; Upholstery</option>
									<option value="other">Other</option>
								</select>
							</div>

							<div>
								<label
									htmlFor="message"
									className="mb-1 block text-sm font-medium text-gray-700"
								>
									Additional Details
								</label>
								<textarea
									id="message"
									name="message"
									rows={3}
									value={formData.message}
									onChange={handleChange}
									placeholder="Tell us about the job (property size, frequency, special requests...)"
									className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none"
								/>
							</div>

							{error && <p className="text-sm text-red-600">{error}</p>}

							<button
								type="submit"
								disabled={sending}
								className="w-full rounded-xl bg-green-700 px-6 py-4 text-base font-bold text-white shadow-lg transition hover:bg-green-600 active:scale-[0.98] disabled:opacity-60"
							>
								{sending ? 'Sending...' : 'Request Free Quote'}
							</button>
						</form>
					)}
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-green-800 px-5 py-8 text-center text-white">
				<p className="text-lg font-bold">SaveGreen Cleaning Solutions</p>
				<a
					href="tel:0421565952"
					className="mt-2 inline-block text-green-200 underline"
				>
					0421 565 952
				</a>
				<p className="mt-4 text-xs text-green-300">
					&copy; {new Date().getFullYear()} SaveGreen Cleaning Solutions. All
					rights reserved.
				</p>
			</footer>
		</div>
	)
}
