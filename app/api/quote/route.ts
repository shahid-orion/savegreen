import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const SERVICE_LABELS: Record<string, string> = {
	home: 'Home Cleaning',
	office: 'Office Cleaning',
	'end-of-lease': 'End of Lease Cleaning',
	window: 'Window Cleaning',
	deep: 'Deep Cleaning',
	carpet: 'Carpet & Upholstery',
	other: 'Other'
}

export async function POST(request: Request) {
	try {
		const body = await request.json()

		const { name, email, phone, suburb, service, message } = body

		// Basic validation
		if (!name || !email || !phone) {
			return NextResponse.json(
				{ error: 'Name, email, and phone are required.' },
				{ status: 400 }
			)
		}

		// Simple email format check
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return NextResponse.json(
				{ error: 'Invalid email address.' },
				{ status: 400 }
			)
		}

		const sanitized = {
			name: String(name).slice(0, 200),
			email: String(email).slice(0, 200),
			phone: String(phone).slice(0, 50),
			suburb: String(suburb || '').slice(0, 200),
			service: String(service || '').slice(0, 100),
			message: String(message || '').slice(0, 2000)
		}

		const serviceLabel =
			SERVICE_LABELS[sanitized.service] || sanitized.service || 'Not specified'

		const { error } = await resend.emails.send({
			from: 'SaveGreen Quotes <quotes@savegreensolutions.com.au>',
			to: ['info@savegreensolutions.com.au'],
			replyTo: sanitized.email,
			subject: `New Quote Request from ${sanitized.name}`,
			html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
					<div style="background: #15803d; padding: 20px; border-radius: 12px 12px 0 0;">
						<h1 style="color: white; margin: 0; font-size: 20px;">New Quote Request</h1>
					</div>
					<div style="padding: 24px; background: #f9fafb; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
						<table style="width: 100%; border-collapse: collapse;">
							<tr>
								<td style="padding: 8px 0; font-weight: bold; color: #374151; width: 130px;">Name:</td>
								<td style="padding: 8px 0; color: #111827;">${sanitized.name}</td>
							</tr>
							<tr>
								<td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
								<td style="padding: 8px 0; color: #111827;">
									<a href="mailto:${sanitized.email}">${sanitized.email}</a>
								</td>
							</tr>
							<tr>
								<td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone:</td>
								<td style="padding: 8px 0; color: #111827;">
									<a href="tel:${sanitized.phone}">${sanitized.phone}</a>
								</td>
							</tr>
							<tr>
								<td style="padding: 8px 0; font-weight: bold; color: #374151;">Suburb:</td>
								<td style="padding: 8px 0; color: #111827;">${sanitized.suburb || 'Not specified'}</td>
							</tr>
							<tr>
								<td style="padding: 8px 0; font-weight: bold; color: #374151;">Service:</td>
								<td style="padding: 8px 0; color: #111827;">${serviceLabel}</td>
							</tr>
						</table>
						${
							sanitized.message
								? `
						<div style="margin-top: 16px; padding: 16px; background: white; border-radius: 8px; border: 1px solid #e5e7eb;">
							<p style="margin: 0 0 4px; font-weight: bold; color: #374151;">Message:</p>
							<p style="margin: 0; color: #111827; white-space: pre-wrap;">${sanitized.message}</p>
						</div>`
								: ''
						}
						<p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">
							Submitted at ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' })}
						</p>
					</div>
				</div>
			`
		})

		if (error) {
			console.error('Resend error:', error)
			return NextResponse.json(
				{ error: 'Failed to send email.' },
				{ status: 500 }
			)
		}

		return NextResponse.json({ success: true })
	} catch {
		return NextResponse.json(
			{ error: 'Server error. Please try again.' },
			{ status: 500 }
		)
	}
}
