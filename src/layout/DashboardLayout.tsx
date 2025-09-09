import React, { useState } from 'react'
import { Menu } from 'lucide-react'
import Sidebar from '../components/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen">
      {/* Sidebar (flex child, not fixed) */}
      <Sidebar open={sidebarOpen} />

      {/* Content */}
      <div className="flex-1 flex flex-col transition-all duration-300">
        {/* Topbar */}
        <div className="bg-white shadow p-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <Menu size={24} />
          </button>
          <h1 className="ml-4 font-bold text-lg">Employee Portal</h1>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  )
}
