import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const uploadDir = path.join(process.cwd(), 'uploads/card-content');

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  // Validate: image types only
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'ไฟล์ต้องเป็นรูป (PNG, JPG, WEBP) เท่านั้น' }, { status: 400 });
  }

  // Validate: max 5MB
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'ไฟล์ต้องไม่เกิน 5MB' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // Check RGBA only if PNG
  if (file.type === 'image/png') {
    if (buffer.length >= 26 && buffer[25] !== 6) {
      return NextResponse.json({ error: 'รูป PNG ควรมีพื้นหลังโปร่งใส (RGBA)' }, { status: 400 });
    }
  }



  // Save file
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const timestamp = Date.now();
  const fileName = `${timestamp}-${safeName}`;
  const filePath = path.join(uploadDir, fileName);

  fs.mkdirSync(uploadDir, { recursive: true });
  fs.writeFileSync(filePath, buffer);

  return NextResponse.json({ url: `/api/images/card-content/${fileName}` });
}
