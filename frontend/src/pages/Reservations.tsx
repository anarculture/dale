// frontend/src/pages/Reservations.tsx
import React, { useState, useEffect, useContext } from 'react'
import { getMyReservations } from '../services/api'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

interface Reservation {
  id: number
  trip: {
    id: number
    origin: string
    destination: string
    date: string
    price: number
    availableSeats: number
  }
  review?: { id: number; rating: number; comment?: string }
}

export default function Reservations() {
  const { token } = useContext(AuthContext)
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) return
    setLoading(true)
    getMyReservations(token)
      .then((data: Reservation[]) => setReservations(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [token])

  if (loading) return <p className="text-center mt-8">Cargando reservas…</p>
  if (!loading && reservations.length === 0)
    return <p className="text-center mt-8">No tienes reservas.</p>

  return (
    <div className="container mx-auto px-4 py-8 space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Mis reservas</h2>
      {reservations.map(res => (
        <div
          key={res.id}
          className="bg-white p-4 rounded shadow flex justify-between items-center"
        >
          <div>
            <p className="font-medium">
              {new Date(res.trip.date).toLocaleDateString()} –{' '}
              {res.trip.origin} → {res.trip.destination}
            </p>
            <p className="text-sm text-gray-600">
              Precio: {res.trip.price} MXN
            </p>
          </div>
          <div>
            {res.review ? (
              <span className="text-green-600 font-medium">Calificado</span>
            ) : (
              <button
                onClick={() => navigate(`/reservations/${res.id}/review`)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
              >
                Valorar
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
