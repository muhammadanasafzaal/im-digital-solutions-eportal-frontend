import React from 'react'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <div
      className={` fixed md:static top-0 left-0 h-full w-64 bg-sky-700 text-white transform
        ${open ? 'translate-x-0' : '-translate-x-full'}
        transition-transform duration-200 ease-in-out z-40 md:translate-x-0`}
    >
      {/* Mobile close button */}
      <div className="flex items-center justify-between p-4 md:hidden">
        <h2 className="font-bold">Menu</h2>
        <button onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      <nav className="mt-6 space-y-2 p-4">
        <Link to="/" className="block hover:bg-sky-600 rounded p-2" onClick={onClose}>
          Dashboard
        </Link>
        <Link to="/tasks" className="block hover:bg-sky-600 rounded p-2" onClick={onClose}>
          Tasks
        </Link>
        <Link to="/timetracker" className="block hover:bg-sky-600 rounded p-2" onClick={onClose}>
          Time Tracker
        </Link>
        <Link to="/reports" className="block hover:bg-sky-600 rounded p-2" onClick={onClose}>
          Reports
        </Link>
        <Link to="/admin" className="block hover:bg-sky-600 rounded p-2" onClick={onClose}>
          Admin Panel
        </Link>
      </nav>
    </div>
  )
}
