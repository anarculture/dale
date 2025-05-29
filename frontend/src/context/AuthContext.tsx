import React, { createContext, useState, useEffect } from 'react'
import { register as apiRegister, login as apiLogin, fetchMe } from '../services/api'

interface AuthContextType {
  token: string | null
  user: any | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
  token: null, user: null,
  login: async () => { },
  register: async () => { },
  logout: () => { }
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem('token')
  )
  const [user, setUser] = useState<any>(null)

  // Si ya hay token, carga datos de usuario
  useEffect(() => {
    if (token) {
      fetchMe(token).then(data => setUser(data.user))
    }
  }, [token])

  const login = async (email: string, password: string) => {
    const data = await apiLogin({ email, password })
    if (data.token) {
      localStorage.setItem('token', data.token)
      setToken(data.token)
      setUser(data.user)
    } else {
      throw new Error(data.error || 'Login fallido')
    }
  }

  const register = async (name: string, email: string, password: string) => {
    const data = await apiRegister({ name, email, password })
    if (data.token) {
      localStorage.setItem('token', data.token)
      setToken(data.token)
      setUser(data.user)
    } else {
      throw new Error(data.error || 'Registro fallido')
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
