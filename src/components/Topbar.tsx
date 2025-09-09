import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export default function Topbar() {
  const auth = useContext(AuthContext)
  return (
    <header className="flex justify-between items-center px-6 py-3 bg-white shadow-sm">
      <h1 className="text-lg font-semibold">Welcome, {auth?.user?.name}</h1>
      <button
        onClick={auth?.logout}
        className="px-4 py-2 bg-sky-600 text-white rounded-lg shadow hover:bg-sky-700"
      >
        Logout
      </button> 
    </header>
  )
}
