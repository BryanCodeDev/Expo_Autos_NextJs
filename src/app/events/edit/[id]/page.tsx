// app/events/edit/[id]/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function EditEvent({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [event, setEvent] = useState<any>(null)

  useEffect(() => {
    fetch(`/api/events/${params.id}`)
      .then(res => res.json())
      .then(data => setEvent(data))
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEvent({ ...event, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch(`/api/events/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(event),
      headers: { 'Content-Type': 'application/json' },
    })
    if (res.ok) router.push('/events')
  }

  if (!event) return <p>Cargando...</p>

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Editar Evento</h1>
      {['title', 'date', 'location', 'carType', 'imageUrl'].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          value={(event as any)[field] || ''}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
      ))}
      <button type="submit" className="bg-yellow-600 text-white px-4 py-2 rounded">Actualizar</button>
    </form>
  )
}