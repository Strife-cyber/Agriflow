import type { ReactNode } from "react"

interface StatCardProps {
  value: string
  label: string
  icon: ReactNode
}

export function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <div className="flex items-center">
      <div className="mr-3">{icon}</div>
      <div>
        <p className="font-bold text-gray-800">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  )
}

