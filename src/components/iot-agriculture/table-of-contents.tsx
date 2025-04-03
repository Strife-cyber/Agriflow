import { Link } from "lucide-react"

interface TableOfContentsProps {
  sections: {
    id: string
    title: string
  }[]
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-green-800">Table of Contents</h3>
      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
            >
              <Link className="h-3 w-3 mr-2" />
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

