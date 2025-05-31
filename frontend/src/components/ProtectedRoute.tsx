import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const ProtectedRoute: React.FC = () => {
  const { token } = useContext(AuthContext)
  return token ? <Outlet /> : <Navigate to="/login" replace />
}
