import { Card, CardContent } from "@/components/ui/card"

interface Step {
  title: string
  description: string
  substeps?: string[]
}

interface ImplementationStepsProps {
  steps: Step[]
}

export function ImplementationSteps({ steps }: ImplementationStepsProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-green-200"></div>

      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="relative pl-12">
            {/* Step number circle */}
            <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white font-bold">
              {index + 1}
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-700 mb-4">{step.description}</p>

                {step.substeps && step.substeps.length > 0 && (
                  <div className="pl-4 border-l-2 border-green-100">
                    <ul className="space-y-2">
                      {step.substeps.map((substep, idx) => (
                        <li key={idx} className="text-gray-700">
                          • {substep}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

