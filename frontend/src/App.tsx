// frontend/src/App.tsx
import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import SearchResults from './pages/SearchResults'
import CreateTrip from './pages/CreateTrip'
import Reservations from './pages/Reservations'
import ReviewReservation from './pages/ReviewReservation'
import { AuthContext } from './context/AuthContext'

export default function App() {
  const { token } = useContext(AuthContext)

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        {/* Landing pública */}
        <Route path="/" element={<Landing />} />

        {/* Auth */}
        <Route
          path="/login"
          element={token ? <Navigate to="/search" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/search" replace /> : <Register />}
        />

        {/* Búsqueda de viajes */}
        <Route
          path="/search"
          element={
            token
              ? <SearchResults />
              : <Navigate to="/login" replace />
          }
        />

        {/* Crear nuevo viaje */}
        <Route
          path="/create"
          element={
            token
              ? <CreateTrip />
              : <Navigate to="/login" replace />
          }
        />

        {/* Mis reservas */}
        <Route
          path="/reservations"
          element={
            token
              ? <Reservations />
              : <Navigate to="/login" replace />
          }
        />

        {/* Formulario de calificación */}
        <Route
          path="/reservations/:id/review"
          element={
            token
              ? <ReviewReservation />
              : <Navigate to="/login" replace />
          }
        />

        {/* Ruta catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
