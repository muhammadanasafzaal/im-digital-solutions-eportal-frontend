import React, { useEffect, useState } from 'react'
import api from '../api/api'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

interface ReportData {
  totalTasks: number
  completed: number
  inProgress: number
  totalMinutes: number
}

export default function Reports() {
  const [data, setData] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchReports = async () => {
    try {
      setLoading(true)
      const res = await api.get('/reports/summary')
      setData(res.data)
    } catch (err: any) {
      setError(err.message || 'Failed to load reports')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchReports() }, [])

  if (loading) return <p className="p-6">Loading reports...</p>
  if (error) return <p className="p-6 text-red-600">{error}</p>

  const chartData = [
    { name: 'Total', value: data?.totalTasks },
    { name: 'Completed', value: data?.completed },
    { name: 'In Progress', value: data?.inProgress },
    { name: 'Minutes', value: data?.totalMinutes }
  ]

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Reports</h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#0ea5e9" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
