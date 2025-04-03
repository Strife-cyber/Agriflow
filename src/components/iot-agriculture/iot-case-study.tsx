import { MapPin, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface IoTCaseStudyProps {
  title: string
  company: string
  location: string
  challenge: string
  solution: string
  results: string[]
  technologies: string[]
}

export function IoTCaseStudy({
  title,
  company,
  location,
  challenge,
  solution,
  results,
  technologies,
}: IoTCaseStudyProps) {
  return (
    <Card className="overflow-hidden">
      <div className="bg-green-800 text-white p-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="flex items-center mt-2 text-sm text-green-100">
          <span className="mr-4">{company}</span>
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Challenge:</h4>
            <p className="text-gray-700 mb-4">{challenge}</p>

            <h4 className="font-semibold text-gray-800 mb-2">Solution:</h4>
            <p className="text-gray-700">{solution}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Results:</h4>
            <ul className="space-y-2 mb-4">
              {results.map((result, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{result}</span>
                </li>
              ))}
            </ul>

            <h4 className="font-semibold text-gray-800 mb-2">Technologies Used:</h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, idx) => (
                <Badge key={idx} variant="outline" className="bg-green-50">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

