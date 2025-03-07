import { nextHandler } from 'payload/next';
import { initPayload } from '@/payload.config';

export async function GET(req: Request) {
  const payload = await initPayload();
  return nextHandler(req);
}

export async function POST(req: Request) {
  const payload = await initPayload();
  return nextHandler(req);
}

export async function PUT(req: Request) {
  const payload = await initPayload();
  return nextHandler(req);
}

export async function DELETE(req: Request) {
  const payload = await initPayload();
  return nextHandler(req);
}