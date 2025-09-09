import React, { useState } from 'react'
import api from '../api/api'

export default function TimeTracker() {
  const [timeIn, setTimeIn] = useState<Date | null>(null)
  const [timeOut, setTimeOut] = useState<Date | null>(null)
  const [description, setDescription] = useState('')
  const [running, setRunning] = useState(false)

  const handleStart = () => {
    setTimeIn(new Date())
    setRunning(true)
  }

  const handleStop = async () => {
    if (!timeIn) return
    const end = new Date()
    setTimeOut(end)
    setRunning(false)

    await api.post('/timelogs', {
      timeIn,
      timeOut: end,
      description,
    })

    // reset after save
    setTimeIn(null)
    setTimeOut(null)
    setDescription('')
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Time Tracker</h1>

      <textarea
        placeholder="What are you working on?"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border rounded p-2 mb-4"
      />

      {!running ? (
        <button
          onClick={handleStart}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Start Work
        </button>
      ) : (
        <button
          onClick={handleStop}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Stop Work
        </button>
      )}

      {timeIn && (
        <p className="mt-4 text-gray-600">
          Started: {timeIn.toLocaleTimeString()}
        </p>
      )}
      {timeOut && (
        <p className="mt-2 text-gray-600">
          Ended: {timeOut.toLocaleTimeString()}
        </p>
      )}
    </div>
  )
}
