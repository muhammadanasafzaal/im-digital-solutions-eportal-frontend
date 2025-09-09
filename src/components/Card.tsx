import React, { ReactNode } from 'react'

export default function Card({ title, children, highlight }: { title: string, children: ReactNode, highlight?: boolean }) {
  return (
    <div className={`p-6 rounded-xl shadow bg-white ${highlight ? 'border-t-4 border-sky-500' : ''}`}>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold mt-2">{children}</p>
    </div>
  )
}
