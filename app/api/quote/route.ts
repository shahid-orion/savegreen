import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

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

		const submission = {
			name: String(name).slice(0, 200),
			email: String(email).slice(0, 200),
			phone: String(phone).slice(0, 50),
			suburb: String(suburb || '').slice(0, 200),
			service: String(service || '').slice(0, 100),
			message: String(message || '').slice(0, 2000),
			submittedAt: new Date().toISOString()
		}

		// Store submissions locally (development / fallback)
		// TODO: Replace with email service (e.g. Resend, SendGrid) when ready
		const dataDir = path.join(process.cwd(), 'data')
		await fs.mkdir(dataDir, { recursive: true })

		const filePath = path.join(dataDir, 'quotes.json')
		let existing: unknown[] = []
		try {
			const raw = await fs.readFile(filePath, 'utf-8')
			existing = JSON.parse(raw)
		} catch {
			// file doesn't exist yet — that's fine
		}

		existing.push(submission)
		await fs.writeFile(filePath, JSON.stringify(existing, null, 2))

		console.log('New quote request:', submission)

		return NextResponse.json({ success: true })
	} catch {
		return NextResponse.json(
			{ error: 'Server error. Please try again.' },
			{ status: 500 }
		)
	}
}
