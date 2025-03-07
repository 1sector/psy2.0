import { NextResponse } from 'next/server'
import payload from 'payload'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const test = await payload.findByID({
      collection: 'tests',
      id: params.id,
      depth: 2,
    })

    return NextResponse.json(test)
  } catch (error) {
    console.error('Error fetching test:', error)
    return NextResponse.json({ error: 'Failed to fetch test' }, { status: 500 })
  }
}