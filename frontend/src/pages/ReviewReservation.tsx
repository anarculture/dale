// frontend/src/pages/ReviewReservation.tsx
import React, { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { reviewReservation, getMyReservations } from '../services/api'
import { AuthContext } from '../context/AuthContext'

export default function ReviewReservation() {
  const { id } = useParams<{ id: string }>()
  const { token } = useContext(AuthContext)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [tripInfo, setTripInfo] = useState<{
    origin: string
    destination: string
    date: string
  } | null>(null)
  const navigate = useNavigate()

  // Opcional: cargar datos de la reserva para mostrar context
  useEffect(() => {
    if (!token || !id) return
    getMyReservations(token).then((arr: any[]) => {
      const res = arr.find(r => r.id === Number(id))
      if (res) {
        setTripInfo({
          origin: res.trip.origin,
          destination: res.trip.destination,
          date: res.trip.date,
        })
      }
    })
  }, [token, id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token || !id) return
    try {
      await reviewReservation(Number(id), { rating, comment }, token)
      navigate('/reservations')
    } catch (err: any) {
      setError(err.message || 'Error al enviar la reseña')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow rounded">
      <h2 className="text-xl mb-4">Valorar reserva #{id}</h2>
      {tripInfo && (
        <p className="text-sm text-gray-600 mb-4">
          {new Date(tripInfo.date).toLocaleDateString()} – {tripInfo.origin} →{' '}
          {tripInfo.destination}
        </p>
      )}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Calificación</label>
          <select
            value={rating}
            onChange={e => setRating(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
          >
            {[5, 4, 3, 2, 1].map(n => (
              <option key={n} value={n}>
                {n} estrella{n > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Comentario (opcional)</label>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Enviar reseña
        </button>
      </form>
    </div>
  )
}

