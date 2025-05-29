// frontend/src/components/Header.tsx
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Header() {
  const { token, logout } = useContext(AuthContext)
  const nav = useNavigate()

  const handleLogout = () => {
    logout()
    nav('/login')
  }

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">Dale</Link>
        <nav className="space-x-4">
          {token ? (
            <>
              <Link to="/search" className="hover:text-blue-600">Buscar viajes</Link>
              <Link to="/create" className="hover:text-blue-600">Publicar viaje</Link>
              <Link to="/reservations" className="hover:text-blue-600">Mis reservas</Link>
              <button onClick={handleLogout} className="hover:text-red-600">Cerrar sesión</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600">Iniciar sesión</Link>
              <Link to="/register" className="hover:text-blue-600">Registrarse</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
