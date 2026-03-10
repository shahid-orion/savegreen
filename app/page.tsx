'use client'

import Image from 'next/image'
import { useState } from 'react'
import {
	FiPhone,
	FiMail,
	FiMapPin,
	FiCheckCircle,
	FiSend
} from 'react-icons/fi'
import {
	MdCleaningServices,
	MdOutlineCorporateFare,
	MdOutlineAutoAwesome,
	MdOutlineWindow
} from 'react-icons/md'
import { GiVacuumCleaner } from 'react-icons/gi'
import { TbSofa } from 'react-icons/tb'

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

	const services = [
		{
			icon: <MdCleaningServices className="text-2xl text-green-600" />,
			label: 'Home Cleaning'
		},
		{
			icon: <MdOutlineCorporateFare className="text-2xl text-green-600" />,
			label: 'Office Cleaning'
		},
		{
			icon: <MdOutlineAutoAwesome className="text-2xl text-green-600" />,
			label: 'End of Lease'
		},
		{
			icon: <MdOutlineWindow className="text-2xl text-green-600" />,
			label: 'Window Cleaning'
		},
		{
			icon: <GiVacuumCleaner className="text-2xl text-green-600" />,
			label: 'Deep Cleaning'
		},
		{
			icon: <TbSofa className="text-2xl text-green-600" />,
			label: 'Carpet & Upholstery'
		}
	]

	return (
		<div className="min-h-screen bg-white">
			{/* Sticky Header */}
			<header className="sticky top-0 z-50 border-b border-green-800/10 bg-white/95 backdrop-blur-md">
				<div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
					<Image
						src="/SaveGreen_Logo_real.png"
						alt="SaveGreen Cleaning Solutions"
						width={48}
						height={48}
						priority
						className="h-12 w-auto"
					/>
					<div className="flex items-center gap-2">
						<a
							href="tel:0421565952"
							className="flex items-center gap-1.5 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 active:scale-95"
						>
							<FiPhone className="text-base" />
							<span className="hidden sm:inline">0421 565 952</span>
							<span className="sm:hidden">Call</span>
						</a>
						<a
							href="#quote"
							className="rounded-full border-2 border-green-600 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50 active:scale-95"
						>
							Get Quote
						</a>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section className="relative overflow-hidden bg-gradient-to-br from-green-700 via-green-600 to-emerald-500">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
				<div className="relative mx-auto max-w-5xl px-5 pb-12 pt-10 text-center">
					<Image
						src="/SaveGreen_Logo_real.png"
						alt="SaveGreen Cleaning Solutions"
						width={100}
						height={100}
						priority
						className="mx-auto mb-5 h-24 w-auto drop-shadow-lg sm:h-28"
					/>
					<h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
						SaveGreen
						<br />
						<span className="text-green-100">Cleaning Solutions</span>
					</h1>
					<p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-green-100/90 sm:text-lg">
						Professional, reliable &amp; affordable cleaning services.
						<br />
						Your satisfaction is our guarantee.
					</p>

					{/* CTA Buttons */}
					<div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
						<a
							href="tel:0421565952"
							className="flex items-center justify-center gap-2.5 rounded-2xl bg-white px-6 py-4 text-base font-bold text-green-700 shadow-xl transition hover:shadow-2xl hover:bg-green-50 active:scale-[0.97]"
						>
							<FiPhone className="text-xl" />
							Call 0421 565 952
						</a>
						<a
							href="#quote"
							className="flex items-center justify-center gap-2.5 rounded-2xl border-2 border-white/30 bg-white/10 px-6 py-4 text-base font-bold text-white shadow-lg backdrop-blur-sm transition hover:bg-white/20 active:scale-[0.97]"
						>
							<FiSend className="text-xl" />
							Get Free Quote
						</a>
					</div>
				</div>
			</section>

			{/* Services Section */}
			<section className="mx-auto max-w-5xl px-5 py-12">
				<h2 className="mb-2 text-center text-2xl font-bold text-gray-900">
					Our Services
				</h2>
				<p className="mb-8 text-center text-sm text-gray-500">
					We offer a wide range of professional cleaning services
				</p>
				<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
					{services.map((service) => (
						<div
							key={service.label}
							className="flex flex-col items-center gap-2 rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm transition hover:shadow-md hover:border-green-200"
						>
							<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
								{service.icon}
							</div>
							<span className="text-sm font-semibold text-gray-800">
								{service.label}
							</span>
						</div>
					))}
				</div>
			</section>

			{/* Quote Form */}
			<section id="quote" className="bg-gray-50 px-5 py-12">
				<div className="mx-auto max-w-lg">
					<div className="mb-8 text-center">
						<span className="mb-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-green-700">
							Free Estimate
						</span>
						<h2 className="mt-2 text-2xl font-bold text-gray-900">
							Get a Free Quote
						</h2>
						<p className="mt-2 text-sm text-gray-500">
							Fill in your details and we&apos;ll get back to you within 24
							hours.
						</p>
					</div>

					{submitted ? (
						<div className="rounded-2xl bg-white border border-green-200 p-8 text-center shadow-sm">
							<FiCheckCircle className="mx-auto text-5xl text-green-600" />
							<h3 className="mt-4 text-xl font-bold text-gray-900">
								Thank you!
							</h3>
							<p className="mt-2 text-sm text-gray-600">
								We&apos;ve received your quote request.
								<br />
								We&apos;ll get back to you within 24 hours.
							</p>
							<a
								href="tel:0421565952"
								className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:underline"
							>
								<FiPhone />
								Or call us now: 0421 565 952
							</a>
						</div>
					) : (
						<form
							onSubmit={handleSubmit}
							className="space-y-4 rounded-2xl bg-white p-6 shadow-sm border border-gray-100 sm:p-8"
						>
							{/* Name & Phone Row */}
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div>
									<label
										htmlFor="name"
										className="mb-1.5 block text-sm font-medium text-gray-700"
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
										className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100 focus:outline-none"
									/>
								</div>
								<div>
									<label
										htmlFor="phone"
										className="mb-1.5 block text-sm font-medium text-gray-700"
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
										className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100 focus:outline-none"
									/>
								</div>
							</div>

							{/* Email */}
							<div>
								<label
									htmlFor="email"
									className="mb-1.5 block text-sm font-medium text-gray-700"
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
									className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100 focus:outline-none"
								/>
							</div>

							{/* Suburb & Service Row */}
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div>
									<label
										htmlFor="suburb"
										className="mb-1.5 block text-sm font-medium text-gray-700"
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
										className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100 focus:outline-none"
									/>
								</div>
								<div>
									<label
										htmlFor="service"
										className="mb-1.5 block text-sm font-medium text-gray-700"
									>
										Service Required
									</label>
									<select
										id="service"
										name="service"
										value={formData.service}
										onChange={handleChange}
										className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100 focus:outline-none"
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
							</div>

							{/* Message */}
							<div>
								<label
									htmlFor="message"
									className="mb-1.5 block text-sm font-medium text-gray-700"
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
									className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100 focus:outline-none"
								/>
							</div>

							{error && (
								<div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
									{error}
								</div>
							)}

							<button
								type="submit"
								disabled={sending}
								className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 px-6 py-4 text-base font-bold text-white shadow-lg transition hover:bg-green-700 active:scale-[0.98] disabled:opacity-60"
							>
								{sending ? (
									'Sending...'
								) : (
									<>
										<FiSend className="text-lg" />
										Request Free Quote
									</>
								)}
							</button>
						</form>
					)}
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-900 px-5 py-10">
				<div className="mx-auto max-w-5xl">
					<div className="flex flex-col items-center gap-6 text-center">
						<Image
							src="/SaveGreen_Logo_real.png"
							alt="SaveGreen Cleaning Solutions"
							width={60}
							height={60}
							className="h-14 w-auto opacity-90"
						/>
						<p className="text-lg font-bold text-white">
							SaveGreen Cleaning Solutions
						</p>
						<div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
							<a
								href="tel:0421565952"
								className="flex items-center gap-2 text-sm text-gray-300 transition hover:text-white"
							>
								<FiPhone className="text-green-400" />
								0421 565 952
							</a>
							<a
								href="mailto:info@savegreensolutions.com.au"
								className="flex items-center gap-2 text-sm text-gray-300 transition hover:text-white"
							>
								<FiMail className="text-green-400" />
								info@savegreensolutions.com.au
							</a>
							<span className="flex items-center gap-2 text-sm text-gray-300">
								<FiMapPin className="text-green-400" />
								Melbourne, VIC
							</span>
						</div>
					</div>
					<div className="mt-8 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
						&copy; {new Date().getFullYear()} SaveGreen Cleaning Solutions. All
						rights reserved.
					</div>
				</div>
			</footer>
		</div>
	)
}
