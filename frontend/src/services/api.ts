export interface Trip {
  id: string;
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

// Simulación de búsqueda de viajes
export async function getTrips(filters: any): Promise<Trip[]> {
  // Aquí deberías hacer una llamada real a tu backend
  // Por ahora, devolvemos datos simulados
  return [
    {
      id: '1',
      origin: 'Ciudad de México, CDMX, México',
      destination: 'Guadalajara, Jal., México',
      date: filters.date || new Date().toISOString(),
      price: 500,
      availableSeats: 3,
      estimatedDurationMs: 6 * 60 * 60 * 1000,
      driver: {
        name: 'Juan Pérez',
        ratingAvg: 4.8,
        ratingCount: 12,
      },
    },
  ];
}

// Simulación de reserva de viaje
export async function reserveTrip(tripId: string, token: string): Promise<void> {
  // Aquí deberías hacer una llamada real a tu backend
  alert(`Reserva realizada para el viaje ${tripId}`);
}
