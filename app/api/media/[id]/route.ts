import { NextRequest, NextResponse } from 'next/server'
import { authorizeApi, STAFF_ROLES } from '@/lib/auth-guards'
import { updateMediaMetadata, deleteMedia } from '@/lib/media-utils'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const authorization = await authorizeApi(STAFF_ROLES)
    if (!authorization.ok) return authorization.response

    const body = await request.json()
    const p = await params
    
    const result = await updateMediaMetadata(p.id, authorization.user.id, body)
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true, data: result.media })
  } catch {
    console.error('Media metadata update failed.')
    return NextResponse.json(
      { success: false, error: 'Unable to update media' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const authorization = await authorizeApi(STAFF_ROLES)
    if (!authorization.ok) return authorization.response

    const p = await params
    const result = await deleteMedia(p.id, authorization.user.id)
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 403 }
      )
    }

    return NextResponse.json({ success: true })
  } catch {
    console.error('Media deletion failed.')
    return NextResponse.json(
      { success: false, error: 'Unable to delete media' },
      { status: 500 }
    )
  }
}
