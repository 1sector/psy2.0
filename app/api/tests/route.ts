import { NextResponse } from 'next/server'
import payload from 'payload'

export async function GET() {
  try {
    const tests = await payload.find({
      collection: 'tests',
      where: {
        status: {
          equals: 'published',
        },
      },
    })

    return NextResponse.json(tests)
  } catch (error) {
    console.error('Error fetching tests:', error)
    return NextResponse.json({ error: 'Failed to fetch tests' }, { status: 500 })
  }
}