import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    const event = await prisma.event.findUnique({
      where: { id: Number(id) },
    });

    if (!event) {
      return NextResponse.json(
        { message: 'Evento no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
