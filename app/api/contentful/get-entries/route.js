import { contentfulClient as client } from '@/lib/contentful-client';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { contentTypeId } = await request.json();

  try {
    const response = await client.getEntries({
      content_type: contentTypeId,
      limit: 1000,
    });

    return NextResponse.json({
      entries: response.items.map(({ fields }) => fields),
    });
  } catch (error) {
    console.error('Error fetching entries:', error);
    return NextResponse.json({ entries: null }, { status: 500 });
  }
}
