// frontend/src/services/api.ts

/**
 * Parsea y valida la respuesta de fetch:
 * - Si es JSON válido y status OK, devuelve el data.
 * - Si status no OK, lanza error con mensaje.
 * - Si no es JSON, lanza error.
 */
async function handleResponse(res: Response) {
  const text = await res.text()
  let data: any = {}
  try {
    data = text ? JSON.parse(text) : {}
  } catch {
    throw new Error('Invalid JSON response')
  }
  if (!res.ok) {
    throw new Error(data.error || `HTTP ${res.status}`)
  }
  return data
}

export interface Trip {
  id: number
  origin: string
  destination: string
  date: string
  price: number
  availableSeats: number
  estimatedDurationMs: number
  driver: {
    name: string
    ratingAvg?: number
    ratingCount?: number
  }
}

/** Registro de usuario */
export async function register(data: {
  name: string
  email: string
  password: string
}) {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(res)
}

/** Login de usuario */
export async function login(data: {
  email: string
  password: string
}) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(res)
}

/** Obtener datos del usuario autenticado */
export async function fetchMe(token: string) {
  const res = await fetch('/api/me', {
    headers: { Authorization: `Bearer ${token}` },
  })
  return handleResponse(res)
}

/** Listar viajes con filtros opcionales */
export async function getTrips(filters: {
  origin?: string
  destination?: string
  date?: string
} = {}): Promise<Trip[]> {
  const qs = new URLSearchParams(filters as Record<string, string>).toString()
  const res = await fetch(`/api/trips${qs ? `?${qs}` : ''}`)
  return handleResponse(res)
}

/** Crear un nuevo viaje (requiere token) */
export async function createTrip(
  data: {
    origin: string
    destination: string
    date: string
    availableSeats: number
    price: number
  },
  token: string
) {
  const res = await fetch('/api/trips', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  return handleResponse(res)
}

/** Reservar un asiento en un viaje (requiere token) */
export async function reserveTrip(tripId: number, token: string) {
  const res = await fetch(`/api/trips/${tripId}/reserve`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  })
  return handleResponse(res)
}

/** Listar las reservas del usuario autenticado */
export async function getMyReservations(token: string) {
  const res = await fetch('/api/reservations/me', {
    headers: { Authorization: `Bearer ${token}` },
  })
  return handleResponse(res)
}

/** Dejar una calificación para una reserva (requiere token) */
export async function reviewReservation(
  reservationId: number,
  data: {
    rating: number
    comment?: string
  },
  token: string
) {
  const res = await fetch(`/api/reservations/${reservationId}/review`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  return handleResponse(res)
}
