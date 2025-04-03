import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, FileText, Video, BookOpen, Globe } from "lucide-react"

interface ResourceCardProps {
  title: string
  description: string
  link: string
  type: "article" | "video" | "book" | "website" | "paper"
}

export function ResourceCard({ title, description, link, type }: ResourceCardProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "article":
        return <FileText className="h-5 w-5 text-blue-600" />
      case "video":
        return <Video className="h-5 w-5 text-red-600" />
      case "book":
        return <BookOpen className="h-5 w-5 text-amber-600" />
      case "website":
        return <Globe className="h-5 w-5 text-green-600" />
      case "paper":
        return <FileText className="h-5 w-5 text-purple-600" />
      default:
        return <FileText className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start">
          <div className="mr-3 mt-0.5">{getTypeIcon(type)}</div>
          <div>
            <h4 className="font-medium text-gray-800 mb-1">{title}</h4>
            <p className="text-sm text-gray-600 mb-2">{description}</p>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
            >
              Learn more <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

