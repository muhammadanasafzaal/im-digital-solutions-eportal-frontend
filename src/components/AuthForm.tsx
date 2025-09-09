import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

interface AuthFormProps {
  onSubmit: (email: string, password: string, name?: string) => void
  isRegister?: boolean
}

interface FormValues {
  name?: string
  email: string
  password: string
}

// ✅ Validation schema
const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
})

const registerSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
})

export default function AuthForm({ onSubmit, isRegister = false }: AuthFormProps) {
  const schema = isRegister ? registerSchema : loginSchema

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  const submit = (data: FormValues) => {
    onSubmit(data.email, data.password, data.name)
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-3">
      {isRegister && (
        <div>
          <input
            className="w-full  p-2 border rounded"
            placeholder="Name"
            {...register('name')}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
      )}

      <div>
        <input
          className="w-full p-2 border rounded"
          placeholder="Email"
          {...register('email')}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <input
          className="w-full p-2 border rounded"
          placeholder="Password"
          type="password"
          {...register('password')}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <button className="w-full p-2 bg-sky-600 text-white rounded">
        {isRegister ? 'Register' : 'Login'}
      </button>
    </form>
  )
}
