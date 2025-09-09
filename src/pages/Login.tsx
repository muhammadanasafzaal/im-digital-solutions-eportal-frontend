import React, { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import AuthForm from '../components/AuthForm'

export default function Login() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = async (email: string, password: string) => {
    await auth?.login(email, password)
    navigate('/')
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-sky-50 to-sky-100">
      <div className="p-8 bg-white shadow-lg rounded-xl w-96">
        <h1 className="text-2xl font-bold text-sky-600 mb-6 ">Login</h1>
        <AuthForm onSubmit={handleLogin} />

        {/* 👇 Register link for new users */}
        <p className="text-sm text-gray-600 mt-4 text-center">
          Don’t have an account?{' '}
          <Link to="/register" className="text-sky-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}
