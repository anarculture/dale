import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import SearchResults from './pages/SearchResults'
import { AuthContext } from './context/AuthContext'

export default function App() {
  const { token } = useContext(AuthContext)

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública: Login y Registro */}
        <Route
          path="/login"
          element={token ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/" replace /> : <Register />}
        />

        {/* Ruta principal, lista de viajes */}
        <Route
          path="/"
          element={<SearchResults />}
        />

        {/* Cualquier otra ruta redirige a home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
