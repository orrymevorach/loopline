import contentful from 'contentful';
import { NextResponse } from 'next/server';

const client = contentful.createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
});

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
