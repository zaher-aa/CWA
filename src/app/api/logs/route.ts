import { NextRequest, NextResponse } from 'next/server'
import { logger } from '@/lib/logger'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const level = searchParams.get('level') as 'info' | 'warn' | 'error' | null
    const limit = parseInt(searchParams.get('limit') || '100')

    const logs = logger.getLogs(level || undefined, limit)
    
    return NextResponse.json({
      logs,
      total: logs.length,
    })
  } catch (error) {
    console.error('Error fetching logs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch logs' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const { level, message, data, userId, sessionId } = await req.json()

    switch (level) {
      case 'info':
        logger.info(message, data, userId, sessionId)
        break
      case 'warn':
        logger.warn(message, data, userId, sessionId)
        break
      case 'error':
        logger.error(message, data, userId, sessionId)
        break
      default:
        logger.info(message, data, userId, sessionId)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error logging message:', error)
    return NextResponse.json(
      { error: 'Failed to log message' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  try {
    logger.clearLogs()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error clearing logs:', error)
    return NextResponse.json(
      { error: 'Failed to clear logs' },
      { status: 500 }
    )
  }
}