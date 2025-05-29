// frontend/src/pages/Landing.tsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="flex-1 bg-blue-50 flex items-center">
        <div className="container mx-auto px-6 py-16 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-extrabold mb-4">
              Comparte viajes, ahorra y haz nuevos amigos
            </h2>
            <p className="mb-6 text-gray-700">
              Encuentra rutas en tu ciudad o publica tu viaje para llenar los
              asientos disponibles. Seguro, rápido y al mejor precio.
            </p>
            <Link
              to="/search"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
            >
              Buscar un viaje
            </Link>
          </div>
          <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
            {/* Reemplaza con tu propio asset si lo tienes */}
            <img
              src="/hero-car.png"
              alt="Hero"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: 'fas fa-dollar-sign',
              title: 'Ahorra dinero',
              text: 'Comparte los gastos de tu viaje.',
            },
            {
              icon: 'fas fa-users',
              title: 'Conoce gente',
              text: 'Viaja acompañado y haz nuevos amigos.',
            },
            {
              icon: 'fas fa-leaf',
              title: 'Sostenible',
              text: 'Reduce tu huella de carbono.',
            },
          ].map((b, i) => (
            <div key={i} className="text-center">
              <div className="text-blue-600 text-4xl mb-4">
                <i className={b.icon}></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">{b.title}</h3>
              <p className="text-gray-600">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-6 text-center text-gray-600">
          © {new Date().getFullYear()} Dale · Todos los derechos reservados
        </div>
      </footer>
    </div>
  )
}
