import { Card, CardContent } from "@/components/ui/card"
import type { ReactNode } from "react"

interface TechnologyCardProps {
  title: string
  description: string
  icon: ReactNode
  color: string
}

export function TechnologyCard({ title, description, icon, color }: TechnologyCardProps) {
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string; border: string }> = {
      green: { bg: "bg-green-50", text: "text-green-800", border: "border-green-100" },
      blue: { bg: "bg-blue-50", text: "text-blue-800", border: "border-blue-100" },
      amber: { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-100" },
      purple: { bg: "bg-purple-50", text: "text-purple-800", border: "border-purple-100" },
      red: { bg: "bg-red-50", text: "text-red-800", border: "border-red-100" },
      indigo: { bg: "bg-indigo-50", text: "text-indigo-800", border: "border-indigo-100" },
    }

    return colorMap[color] || colorMap.green
  }

  const { bg, text, border } = getColorClasses(color)

  return (
    <Card className={`${bg} ${border} border`}>
      <CardContent className="p-6">
        <div className={`${text} mb-4`}>{icon}</div>
        <h3 className={`text-lg font-semibold ${text} mb-2`}>{title}</h3>
        <p className="text-gray-700">{description}</p>
      </CardContent>
    </Card>
  )
}

