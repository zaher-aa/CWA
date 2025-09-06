import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { name, tabs } = await req.json()

    const tabConfig = await prisma.tabConfiguration.create({
      data: {
        name,
        tabs,
      },
    })

    return NextResponse.json(tabConfig)
  } catch (error) {
    console.error('Error saving tab configuration:', error)
    return NextResponse.json(
      { error: 'Failed to save tab configuration' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const tabConfigs = await prisma.tabConfiguration.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 10, // Get latest 10 configurations
    })

    return NextResponse.json(tabConfigs)
  } catch (error) {
    console.error('Error fetching tab configurations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tab configurations' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Configuration ID is required' },
        { status: 400 }
      )
    }

    await prisma.tabConfiguration.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting tab configuration:', error)
    return NextResponse.json(
      { error: 'Failed to delete tab configuration' },
      { status: 500 }
    )
  }
}