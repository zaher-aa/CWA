import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { playerName, timeLimit, finalScore, issuesFixed, totalIssues, completed } = await req.json()

    const session = await prisma.courtRoomSession.create({
      data: {
        playerName,
        timeLimit,
        finalScore,
        issuesFixed,
        totalIssues,
        completed,
      },
    })

    return NextResponse.json(session)
  } catch (error) {
    console.error('Error saving court room session:', error)
    return NextResponse.json(
      { error: 'Failed to save court room session' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const sessions = await prisma.courtRoomSession.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
    })

    return NextResponse.json(sessions)
  } catch (error) {
    console.error('Error fetching court room sessions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch court room sessions' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, finalScore, issuesFixed, completed } = await req.json()

    const session = await prisma.courtRoomSession.update({
      where: { id },
      data: {
        finalScore,
        issuesFixed,
        completed,
      },
    })

    return NextResponse.json(session)
  } catch (error) {
    console.error('Error updating court room session:', error)
    return NextResponse.json(
      { error: 'Failed to update court room session' },
      { status: 500 }
    )
  }
}