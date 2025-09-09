import React, { useEffect, useState } from 'react'
import api from '../api/api'

interface User {
  id: number
  name: string
  email: string
  role: string
  isActive: boolean
}

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([])

  const fetchUsers = async () => {
    const res = await api.get('/admin/users')
    setUsers(res.data)
  }

  const toggleRole = async (user: User) => {
    const newRole = user.role === 'ADMIN' ? 'EMPLOYEE' : 'ADMIN'
    await api.post(`/admin/users/${user.id}/role`, { role: newRole })
    fetchUsers()
  }

  useEffect(() => { fetchUsers() }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-t">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.role}</td>
                <td className="p-3">{u.isActive ? 'Active' : 'Inactive'}</td>
                <td className="p-3">
                  <button
                    onClick={() => toggleRole(u)}
                    className="px-3 py-1 bg-sky-600 text-white rounded hover:bg-sky-700"
                  >
                    Toggle Role
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
