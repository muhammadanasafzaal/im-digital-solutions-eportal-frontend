import React, { createContext, useState, useEffect, ReactNode } from 'react'
import api, { setAuthToken } from '../api/api'
import toast from 'react-hot-toast'

interface User {
  id: number
  name: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<User | null>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || 'null')
    } catch {
      return null
    }
  })
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))

  useEffect(() => {
    if (token) setAuthToken(token)
    else setAuthToken(null)
  }, [token])

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post('/auth/login', { email, password })
      const { token: t, user: u } = res.data
      setToken(t)
      setUser(u)
      localStorage.setItem('token', t)
      localStorage.setItem('user', JSON.stringify(u))
      toast.success(`Welcome back, ${u.name}`)
      return u
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Login failed')
      return null
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      await api.post('/auth/signup', { name, email, password })
      toast.success('Admin account created successfully')
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Registration failed')
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    toast.success('Logged out successfully')
  }

  return (
    <AuthContext.Provider value={{  user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
