/// <reference types="vite/client" />

// TypeScript declaration for Vite's import.meta.env
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

const API = import.meta.env.VITE_API_URL;

/**
 * Tipado de un viaje (Trip)
 */
export interface Trip {
  id: number;
  origin: string;
  destination: string;
  date: string;
  price: number;
  availableSeats: number;
  estimatedDurationMs: number;
  driver: {
    name: string;
    ratingAvg?: number;
    ratingCount?: number;
  };
}

/**
 * Registro de usuario
 */
export async function register(data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  isDriver?: boolean;
}) {
  const res = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

/**
 * Login de usuario
 */
export async function login(data: {
  email: string;
  password: string;
}) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

/**
 * Obtiene datos del usuario autenticado
 */
export async function fetchMe(token: string) {
  const res = await fetch(`${API}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

/**
 * Listar viajes con filtros opcionales
 */
export async function getTrips(filters: {
  origin?: string;
  destination?: string;
  date?: string;
} = {}): Promise<Trip[]> {
  const qs = new URLSearchParams(filters as Record<string, string>).toString();
  const res = await fetch(`${API}/trips${qs ? `?${qs}` : ''}`);
  return res.json();
}

/**
 * Crear un nuevo viaje (requiere token)
 */
export async function createTrip(
  data: {
    origin: string;
    destination: string;
    date: string;
    availableSeats: number;
    price: number;
  },
  token: string
) {
  const res = await fetch(`${API}/trips`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

/**
 * Reservar un asiento en un viaje (requiere token)
 */
export async function reserveTrip(tripId: number, token: string) {
  const res = await fetch(`${API}/trips/${tripId}/reserve`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

/**
 * Listar las reservas del usuario autenticado
 */
export async function getMyReservations(token: string) {
  const res = await fetch(`${API}/reservations/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

/**
 * Dejar una calificación para una reserva (requiere token)
 */
export async function reviewReservation(
  reservationId: number,
  data: {
    rating: number;
    comment?: string;
  },
  token: string
) {
  const res = await fetch(`${API}/reservations/${reservationId}/review`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
