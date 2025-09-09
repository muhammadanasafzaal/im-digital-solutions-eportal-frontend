import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import AuthForm from '../components/AuthForm'

export default function Register() {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const handleRegister = async (email: string, password: string, name?: string) => {
        if (!name) return
        await auth?.register(name, email, password)
        navigate('/login')
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-sky-50 to-sky-100">
            <div className="p-8 bg-white shadow-lg rounded-xl w-96">
                <h1 className="text-2xl font-bold text-sky-600 mb-6 ">Register</h1>
                <AuthForm onSubmit={handleRegister} isRegister />

                {/* 👇 Register link for new users */}
                <p className="text-sm text-gray-600 mt-4 text-center">
                    Already have an account?{' '}
                    <Link to="/login" className="text-sky-600 hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    )
}
