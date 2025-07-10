// app/events/create/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CreateEventPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    carType: '',
    imageUrl: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/events', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    })
    if (res.ok) router.push('/events')
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Crear Evento</h1>
      {['title', 'date', 'location', 'carType', 'imageUrl'].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          placeholder={field}
          value={(formData as any)[field]}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
      ))}
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Guardar</button>
    </form>
  )
}