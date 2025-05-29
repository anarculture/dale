// frontend/src/pages/SearchResults.tsx
import { useState, useEffect } from 'react';
import { getTrips, reserveTrip } from '../services/api';

export default function SearchResults() {
  // 1. Estados de búsqueda
  const [origin, setOrigin] = useState('Ciudad de México, CDMX, México');
  const [destination, setDestination] = useState('Guadalajara, Jal., México');
  const [date, setDate] = useState('2025-05-29');
  const [seats, setSeats] = useState(1);
  const [flexible, setFlexible] = useState(false);

  // 2. Estado de resultados
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 3. Función para buscar
  const handleSearch = async () => {
    setLoading(true);
    const filters: any = { origin, destination, date };
    const data = await getTrips(filters);
    setTrips(data);
    setLoading(false);
  };

  // 4. Cargar al montar (opcional)
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Origen */}
            <div>
            <label className="block text-sm font-medium mb-1">Origen</label>
            <input
              type="text"
              value={origin}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrigin(e.target.value)}
              className="w-full border rounded-md py-2 px-4 search-input"
            />
            </div>
          {/* Destino */}
          <div>
            <label className="block text-sm font-medium mb-1">Destino</label>
            <input
              type="text"
              value={destination}
              onChange={e => setDestination(e.target.value)}
              className="w-full border rounded-md py-2 px-4 search-input"
            />
          </div>
          {/* Fecha */}
          <div>
            <label className="block text-sm font-medium mb-1">Fecha</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full border rounded-md py-2 px-4 date-picker"
            />
          </div>
          {/* Botón Buscar */}
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="w-full bg-blue-500 text-white py-2 rounded-md"
            >
              {loading ? 'Buscando...' : 'Buscar viajes'}
            </button>
          </div>
        </div>
        {/* Opciones adicionales */}
        <div className="mt-4 flex items-center space-x-6">
          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              checked={flexible}
              onChange={e => setFlexible(e.target.checked)}
              className="mr-2"
            />
            Fechas flexibles
          </label>
          <label className="flex items-center text-sm">
            Pasajeros:
            <select
              value={seats}
              onChange={e => setSeats(Number(e.target.value))}
              className="ml-2 border rounded-md px-2"
            >
              {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar filtros (puedes ocultarlo por ahora) */}
        <aside className="w-full md:w-1/4 hidden md:block">
          {/* ...mismo HTML de tu sidebar... */}
        </aside>

        {/* Trip Listings */}
        <section className="w-full md:w-3/4 space-y-4">
          {trips.length === 0 && !loading && (
            <p className="text-center text-gray-500">No hay viajes disponibles.</p>
          )}

          {trips.map(trip => (
            <div key={trip.id} className="trip-card bg-white rounded-lg shadow-md p-4">
              <div className="flex flex-col md:flex-row">
                {/* Información conductor y origen/destino */}
                <div className="flex-1 pr-4">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <i className="fas fa-user text-gray-500"></i>
                    </div>
                    <div>
                      <h3 className="font-medium">{trip.driver.name}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <i className="fas fa-star text-yellow-400 mr-1"></i>
                        <span>{trip.driver.ratingAvg?.toFixed(1)} ({trip.driver.ratingCount})</span>
                      </div>
                    </div>
                  </div>
                  {/* Horarios y ciudades */}
                  <div className="flex items-start mb-4">
                    <div className="text-center mr-3">
                      <div className="font-medium">{new Date(trip.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                      <div className="text-xs text-gray-500">{new Date(trip.date).toLocaleDateString()}</div>
                    </div>
                    <div className="flex-1">
                      <div className="h-12 relative">
                        {/* Línea visual */}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">{trip.origin}</div>
                      <div className="text-xs text-gray-500">{trip.origin}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-center mr-3">
                      <div className="font-medium">
                        {new Date(new Date(trip.date).getTime() + trip.estimatedDurationMs).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="text-xs text-gray-500">{new Date(trip.date).toLocaleDateString()}</div>
                    </div>
                    <div className="flex-1"></div>
                    <div>
                      <div className="font-medium">{trip.destination}</div>
                      <div className="text-xs text-gray-500">{trip.destination}</div>
                    </div>
                  </div>
                </div>

                {/* Precio y acción */}
                <div className="w-full md:w-1/4 mt-4 md:mt-0">
                  <div className="price-tag text-white text-center py-3 rounded-lg mb-3">
                    <div className="text-xl font-bold">${trip.price}</div>
                    <div className="text-sm">por persona</div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span><i className="fas fa-chair seat-icon mr-1"></i> {trip.availableSeats} asientos libres</span>
                  </div>
                  <button
                    onClick={() => reserveTrip(trip.id, localStorage.getItem('token')!)}
                    className="w-full bg-blue-500 text-white py-2 rounded-md"
                  >
                    Reservar puesto
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
