import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { login as apiLogin, register as apiRegister, fetchMe } from '../services/api'
import { useNavigate } from 'react-router-dom'

interface User {
  id: number
  name: string
  email: string
  isDriver: boolean
}

interface AuthContextValue {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue>(null!)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const saved = localStorage.getItem('token')
    if (saved) {
      setToken(saved)
      fetchMe(saved)
        .then(data => setUser(data.user))
        .catch(() => {
          localStorage.removeItem('token')
          setToken(null)
          setUser(null)
        })
    }
  }, [])

  const login = async (email: string, password: string) => {
    const { token: t, user } = await apiLogin({ email, password })
    localStorage.setItem('token', t)
    setToken(t)
    setUser(user)
    navigate('/search')
  }

  const register = async (name: string, email: string, password: string) => {
    const { token: t, user } = await apiRegister({ name, email, password })
    localStorage.setItem('token', t)
    setToken(t)
    setUser(user)
    navigate('/search')
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
