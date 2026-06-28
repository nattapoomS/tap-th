import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'config.json');

export async function GET() {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json({ crusher: [], highlights: [] });
  }
}

export async function POST(req: Request) {
  const { password, data } = await req.json();
  // ponytail: Use standard env check. No complex auth.
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // ponytail: fs writeFileSync is the simplest DB. (Note: Only persists on VPS/Docker, not serverless like Vercel).
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  return NextResponse.json({ success: true });
}
