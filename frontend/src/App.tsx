// frontend/src/App.tsx
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import SearchResults from './pages/SearchResults'
import CreateTrip from './pages/CreateTrip'
import Reservations from './pages/Reservations'
import ReviewReservation from './pages/ReviewReservation'
import { ProtectedRoute } from './components/ProtectedRoute'

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="search" element={<SearchResults />} />
        <Route path="create" element={<CreateTrip />} />
        <Route path="reservations" element={<Reservations />} />
        <Route path="reservations/:id/review" element={<ReviewReservation />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
)

export default App
