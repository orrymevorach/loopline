import { contentfulClient as client } from '@/lib/contentful-client';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { contentTypeId, fieldName, fieldValue } = await request.json();

  try {
    const response = await client.getEntries({
      content_type: contentTypeId,
      [`fields.${fieldName}`]: fieldValue,
    });

    return NextResponse.json({ entry: response.items[0]?.fields ?? null });
  } catch (error) {
    console.error('Error fetching entries:', error);
    return NextResponse.json(
      { error: 'Unable to fetch entry' },
      { status: 400 },
    );
  }
}
