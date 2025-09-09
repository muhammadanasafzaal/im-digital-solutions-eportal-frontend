import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export default function ProtectedRoute({ children, adminOnly = false }: { children: JSX.Element, adminOnly?: boolean }) {
  const auth = useContext(AuthContext)
  if (!auth?.user) return <Navigate to="/login" replace />
  if (adminOnly && auth.user.role !== 'ADMIN') return <Navigate to="/" replace />
  return children
} 
