// app/events/delete/[id]/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Event {
  id: number
  title: string
  date: string
  location: string
  carType: string
  imageUrl?: string
}

export default function DeleteEventPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${params.id}`)
        if (res.ok) {
          const data = await res.json()
          setEvent(data)
        } else {
          alert('Evento no encontrado')
          router.push('/events')
        }
      } catch (error) {
        console.error('Error fetching event:', error)
        alert('Error al cargar el evento')
        router.push('/events')
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [params.id, router])

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      return
    }

    setDeleting(true)
    try {
      const res = await fetch(`/api/events/${params.id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        alert('Evento eliminado exitosamente')
        router.push('/events')
      } else {
        const errorData = await res.json()
        alert(errorData.error || 'Error al eliminar el evento')
      }
    } catch (error) {
      console.error('Error deleting event:', error)
      alert('Error al eliminar el evento')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6 max-w-md mx-auto">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Cargando evento...</p>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="p-6 max-w-md mx-auto">
        <div className="text-center">
          <p className="text-red-600 mb-4">Evento no encontrado</p>
          <button
            onClick={() => router.push('/events')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Volver a eventos
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-red-600">
        Eliminar Evento
      </h1>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        {event.imageUrl && (
          <img 
            src={event.imageUrl} 
            alt={event.title}
            className="w-full h-32 object-cover rounded mb-4"
          />
        )}
        
        <h2 className="text-lg font-semibold mb-3 text-gray-800">{event.title}</h2>
        
        <div className="space-y-2 text-sm text-gray-600">
          <p><strong>Fecha:</strong> {event.date}</p>
          <p><strong>Ubicación:</strong> {event.location}</p>
          <p><strong>Tipo de Auto:</strong> {event.carType}</p>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <p className="text-red-700 text-center">
          ⚠️ Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar este evento?
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => router.push('/events')}
          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded font-semibold transition"
          disabled={deleting}
        >
          Cancelar
        </button>
        
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {deleting ? 'Eliminando...' : 'Eliminar'}
        </button>
      </div>
    </div>
  )
}