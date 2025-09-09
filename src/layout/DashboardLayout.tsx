import React, { useState, useContext } from 'react'
import { Menu } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { AuthContext } from '../contexts/AuthContext'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const auth = useContext(AuthContext)

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} />

      {/* Content */}
      <div className="flex-1 flex flex-col transition-all duration-300">
        {/* Topbar */}
        <div className="bg-white shadow p-4 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <Menu size={24} />
            </button>
            <h1 className="ml-4 font-bold text-lg">Employee Portal</h1>
          </div>

          {/* Right side: Logout */}
          {auth?.user && (
            <button
              onClick={auth.logout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  )
}
