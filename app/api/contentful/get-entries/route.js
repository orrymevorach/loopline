import contentful from 'contentful';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { contentTypeId } = await request.json();
  const client = contentful.createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
    environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
  });

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
