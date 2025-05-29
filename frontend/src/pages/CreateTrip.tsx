// frontend/src/pages/CreateTrip.tsx
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { createTrip } from '../services/api'
import { AuthContext } from '../context/AuthContext'

export default function CreateTrip() {
  const navigate = useNavigate()
  const { token, logout } = useContext(AuthContext)

  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState('')
  const [availableSeats, setAvailableSeats] = useState(1)
  const [price, setPrice] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) {
      logout()
      navigate('/login')
      return
    }
    setLoading(true)
    setError(null)
    try {
      await createTrip(
        { origin, destination, date, availableSeats, price },
        token
      )
      navigate('/search')
    } catch (err: any) {
      setError(err.message || 'Error al crear el viaje')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Publicar un nuevo viaje</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Origen</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={origin}
            onChange={e => setOrigin(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Destino</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={destination}
            onChange={e => setDestination(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Fecha y hora</label>
          <input
            type="datetime-local"
            className="w-full border rounded px-3 py-2"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Asientos disponibles</label>
          <input
            type="number"
            min={1}
            className="w-full border rounded px-3 py-2"
            value={availableSeats}
            onChange={e => setAvailableSeats(Number(e.target.value))}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Precio (MXN)</label>
          <input
            type="number"
            min={0}
            step={0.01}
            className="w-full border rounded px-3 py-2"
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Publicando...' : 'Publicar viaje'}
        </button>
      </form>
    </div>
  )
}
