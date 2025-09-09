import React, { useEffect, useState } from 'react'
import api from '../api/api'
import Card from '../components/Card'

interface Stats {
  totalTasks: number
  completed: number
  inProgress: number
  totalMinutes: number
}
 
export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    api.get('/reports/summary').then(res => setStats(res.data))
  }, [])

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card title="Total Tasks">{stats?.totalTasks ?? 0}</Card>
      <Card title="Completed" highlight>{stats?.completed ?? 0}</Card>
      <Card title="In Progress">{stats?.inProgress ?? 0}</Card>
      <Card title="Minutes Logged">{stats?.totalMinutes ?? 0}</Card>
    </div>
  )
}
