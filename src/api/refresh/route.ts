import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { refreshToken } = await req.json()

  // Accept only our dummy token
  if (refreshToken === 'dummy-refresh-token-456') {
    return NextResponse.json({
      accessToken: 'new-access-token-789'
    })
  } else {
    return NextResponse.json(
      { message: 'Invalid refresh token' },
      { status: 403 }
    )
  }
}
