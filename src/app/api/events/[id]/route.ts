// app/api/events/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: Number(params.id) }
    })
    
    if (!event) {
      return NextResponse.json({ error: 'Evento no encontrado' }, { status: 404 })
    }
    
    return NextResponse.json(event)
  } catch (error) {
    console.error('Error fetching event:', error)
    return NextResponse.json({ error: 'Error al obtener evento' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { title, date, location, carType, imageUrl } = body
    
    const event = await prisma.event.update({
      where: { id: Number(params.id) },
      data: {
        title,
        date,
        location,
        carType,
        imageUrl: imageUrl || null
      }
    })
    
    return NextResponse.json(event)
  } catch (error) {
    console.error('Error updating event:', error)
    return NextResponse.json({ error: 'Error al actualizar evento' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.event.delete({
      where: { id: Number(params.id) }
    })
    
    return NextResponse.json({ message: 'Evento eliminado correctamente' })
  } catch (error) {
    console.error('Error deleting event:', error)
    return NextResponse.json({ error: 'Error al eliminar evento' }, { status: 500 })
  }
}