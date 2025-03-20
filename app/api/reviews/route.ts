import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/server/db';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const contentId = searchParams.get('contentId');
  const contentType = searchParams.get('contentType');

  if (!contentId || !contentType) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  try {
    const reviews = await db.review.findMany({
      where: {
        contentId,
        contentType: contentType as any,
      },
      include: {
        user: {
          select: {
            profile: {
              select: {
                username: true,
                imageUrl: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}
