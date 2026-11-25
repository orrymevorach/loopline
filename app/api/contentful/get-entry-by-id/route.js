import { contentfulClient as client } from '@/lib/contentful-client';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { entryId } = await request.json();

  try {
    const entry = await client.getEntry(entryId);
    return NextResponse.json({ entry });
  } catch (error) {
    console.error('Error fetching entries:', error);
    return NextResponse.json({ entry: null }, { status: 500 });
  }
}
