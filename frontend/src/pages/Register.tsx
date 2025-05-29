import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Register() {
  const { register } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register(name, email, password)
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white shadow rounded">
      <h2 className="text-xl mb-4">Registro</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Registrarse
        </button>
      </form>
    </div>
  )
}
