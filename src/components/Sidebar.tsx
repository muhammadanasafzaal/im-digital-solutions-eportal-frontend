import React from 'react'
import { Home, ClipboardList, Clock, FileText, Users } from 'lucide-react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

interface SidebarProps {
  open: boolean
}

export default function Sidebar({ open }: SidebarProps) {
  const links = [
    { name: 'Dashboard', route: '/', icon: <Home size={20} /> },
    { name: 'Tasks', route: '/tasks', icon: <ClipboardList size={20} /> },
    { name: 'Time Tracker', route: '/timetracker', icon: <Clock size={20} /> },
    { name: 'Reports', route: '/reports', icon: <FileText size={20} /> },
    { name: 'Admin', route: '/admin', icon: <Users size={20} /> },
  ]

  return (
    <div
      className={clsx(
        'bg-white shadow-md h-full transition-all duration-300 overflow-hidden',
        open ? 'w-64' : 'w-0'
      )}
    >
      <div className={clsx('flex flex-col h-full', open ? 'opacity-100' : 'opacity-0')}>
        {/* Header */}
        <div className="p-4 border-b font-bold">Menu</div>

        {/* Links */}
        <nav className="flex-1 p-2 space-y-2">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.route}
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 text-gray-700"
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
