// app/events/page.tsx
import Link from 'next/link'
import { prisma } from '../../lib/prisma'

export default async function EventsPage() {
  const events = await prisma.event.findMany({ orderBy: { date: 'asc' } })

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Eventos de Autos</h1>

      <div className="text-right mb-4">
        <Link href="/events/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
          + Crear Evento
        </Link>
      </div>

      {events.length === 0 ? (
        <p className="text-gray-600 text-center">No hay eventos aún.</p>
      ) : (
        <ul className="space-y-4">
          {events.map(event => (
            <li key={event.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{event.title}</h2>
                  <p className="text-sm text-gray-600">{event.date} — {event.location}</p>
                  <p className="text-sm text-gray-500">Tipo de Auto: {event.carType}</p>
                </div>

                <div className="flex gap-2">
                  <Link href={`/events/edit/${event.id}`} className="text-blue-600 hover:underline">
                    Editar
                  </Link>

                  <form
                    action={`/events/delete/${event.id}/action`}
                    method="POST"
                    onSubmit={(e) => {
                      if (!confirm('¿Estás seguro de que deseas eliminar este evento?')) {
                        e.preventDefault()
                      }
                    }}
                  >
                    <button type="submit" className="text-red-600 hover:underline">
                      Eliminar
                    </button>
                  </form>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}