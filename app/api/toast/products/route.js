import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/toast-server-utils';

export async function GET() {
  try {
    const items = await getProducts();

    return NextResponse.json({ items });
  } catch (error) {
    console.error('Error fetching Toast menu items:', error);
    return NextResponse.json({ items: null }, { status: 500 });
  }
}
