import { CheckCircle2, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface BenefitsChallengesProps {
  benefits: string[]
  challenges: string[]
}

export function BenefitsChallenges({ benefits, challenges }: BenefitsChallengesProps) {
  return (
    <Tabs defaultValue="benefits">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="benefits">Benefits</TabsTrigger>
        <TabsTrigger value="challenges">Challenges</TabsTrigger>
      </TabsList>

      <TabsContent value="benefits" className="mt-6">
        <Card className="bg-green-50 border-green-100">
          <CardContent className="p-6">
            <ul className="space-y-4">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="challenges" className="mt-6">
        <Card className="bg-amber-50 border-amber-100">
          <CardContent className="p-6">
            <ul className="space-y-4">
              {challenges.map((challenge, idx) => (
                <li key={idx} className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{challenge}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

