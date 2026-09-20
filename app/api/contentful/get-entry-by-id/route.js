import contentful from 'contentful';
import { NextResponse } from 'next/server';

const client = contentful.createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
});

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
