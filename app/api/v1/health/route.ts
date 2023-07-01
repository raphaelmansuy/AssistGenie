import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  return NextResponse.json({
    status: 'OK',
    message: 'Hello from the API',
    // formay: 'YYYY-MM-DDTHH:mm:ss.sssZ',
    timeUTC: new Date().toISOString(),
  })
}
