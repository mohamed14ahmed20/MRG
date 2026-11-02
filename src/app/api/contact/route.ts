import { NextRequest, NextResponse } from 'next/server';
import { insertContactMessageDirectSql } from '@/lib/queries';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    // Direct SQL insertion into MySQL 77.37.35.25
    await insertContactMessageDirectSql({
      name,
      email,
      phone,
      company,
      subject,
      message,
    });

    return NextResponse.json({ success: true, message: 'Message stored successfully in MySQL.' });
  } catch (err: any) {
    console.error('Contact API Error (Direct SQL):', err.message);
    return NextResponse.json(
      { success: false, error: 'Failed to record message in database.' },
      { status: 500 }
    );
  }
}
