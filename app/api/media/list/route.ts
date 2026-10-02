import { NextRequest, NextResponse } from 'next/server'
import { authorizeApi, STAFF_ROLES } from '@/lib/auth-guards'
import { getMediaList, MediaListParams } from '@/lib/media-utils'

export async function GET(request: NextRequest) {
  try {
    const authorization = await authorizeApi(STAFF_ROLES)
    if (!authorization.ok) return authorization.response

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams
    const params: MediaListParams = {
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined,
      search: searchParams.get('search') || undefined,
      type: searchParams.get('type') || undefined,
      orderBy: (searchParams.get('orderBy') as MediaListParams['orderBy']) || undefined
    }

    // Get media list
    const result = await getMediaList(params)

    return NextResponse.json({
      success: true,
      data: result
    })

  } catch {
    console.error('Media list API failed.')
    return NextResponse.json(
      { success: false, error: 'Unable to load media' },
      { status: 500 }
    )
  }
}

export async function POST() {
  return NextResponse.json(
    { 
      success: false, 
      error: 'Method not allowed. Use GET to retrieve media list.' 
    },
    { status: 405 }
  )
}