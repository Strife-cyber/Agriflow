"use client"

import { ReactNode, useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import {
  Globe,
  Leaf,
  Cpu,
  BarChart,
  Droplet,
  Sun,
  Wind,
  Thermometer,
  Smartphone,
  Database,
  Cloud,
  TrendingUp,
  BookOpen,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Tractor,
  Sprout,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { IoTCaseStudy } from "@/components/iot-agriculture/iot-case-study"
import { TechnologyCard } from "@/components/iot-agriculture/technology-card"
import { ResourceCard } from "@/components/iot-agriculture/resource-card"
import { StatCard } from "@/components/iot-agriculture/stat-card"
import { ImplementationSteps } from "@/components/iot-agriculture/implementation-steps"
import { BenefitsChallenges } from "@/components/iot-agriculture/benefits-challenges"
import { TableOfContents } from "@/components/iot-agriculture/table-of-contents"

// Language content
import { englishContent, frenchContent } from "@/data/iot-agriculture-content"
import AppLayout from "@/layouts/app-layout"
import { BreadcrumbItem } from "@/index"
import { useTranslation } from "@/context/translation"

export default function IoTAgriculturePage() {
  const translation = useTranslation();
  const [language, setLanguage] = useState<"en" | "fr">("en")
  const content = language === "en" ? englishContent : frenchContent

  const breadcrumbs: BreadcrumbItem[] = [
    {
        title: translation("agriInnovation"),
        href: '/agriculture',
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-green-900 to-green-700 text-white">
          <div className="absolute inset-0 opacity-20 bg-[url('/placeholder.svg?height=600&width=1200')] bg-center bg-cover bg-no-repeat mix-blend-overlay"></div>
          <div className="container mx-auto px-4 py-16 relative z-10">
            <div className="flex justify-end mb-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
                onClick={() => setLanguage(language === "en" ? "fr" : "en")}
              >
                <Globe className="mr-2 h-4 w-4" />
                {language === "en" ? "Français" : "English"}
              </Button>
            </div>

            <div className="max-w-3xl">
              <Badge className="mb-4 bg-green-600 hover:bg-green-700 text-white">{content.hero.badge}</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{content.hero.title}</h1>
              <p className="text-xl md:text-2xl text-green-50 mb-8">{content.hero.subtitle}</p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-white text-green-800 hover:bg-green-50">{content.hero.primaryButton}</Button>
                <Button variant="outline" className="text-white border-white hover:bg-white/10">
                  {content.hero.secondaryButton}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <Card>
                  <CardContent className="p-4">
                    <TableOfContents sections={content.tableOfContents} />
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-3 text-green-800">{content.keyStats.title}</h3>
                    <div className="space-y-4">
                      <StatCard
                        value={content.keyStats.marketSize.value}
                        label={content.keyStats.marketSize.label}
                        icon={<TrendingUp className="h-4 w-4 text-green-600" />}
                      />
                      <StatCard
                        value={content.keyStats.adoption.value}
                        label={content.keyStats.adoption.label}
                        icon={<TrendingUp className="h-4 w-4 text-blue-600" />}
                      />
                      <StatCard
                        value={content.keyStats.waterSaving.value}
                        label={content.keyStats.waterSaving.label}
                        icon={<Droplet className="h-4 w-4 text-blue-600" />}
                      />
                      <StatCard
                        value={content.keyStats.yieldIncrease.value}
                        label={content.keyStats.yieldIncrease.label}
                        icon={<Sprout className="h-4 w-4 text-green-600" />}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <section id="introduction" className="mb-12">
                <h2 className="text-3xl font-bold text-green-800 mb-6 flex items-center">
                  <Leaf className="mr-2 h-6 w-6" />
                  {content.introduction.title}
                </h2>
                <div className="prose prose-green max-w-none">
                  <p className="text-lg text-gray-700 mb-4">{content.introduction.overview}</p>
                  <p className="text-gray-700 mb-4">{content.introduction.paragraph1}</p>
                  <p className="text-gray-700 mb-4">{content.introduction.paragraph2}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <Card className="bg-green-50 border-green-100">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-green-800 mb-4">
                        {content.introduction.whatIsIoT.title}
                      </h3>
                      <p className="text-gray-700">{content.introduction.whatIsIoT.content}</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-blue-50 border-blue-100">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-blue-800 mb-4">
                        {content.introduction.smartFarming.title}
                      </h3>
                      <p className="text-gray-700">{content.introduction.smartFarming.content}</p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <Separator className="my-12" />

              <section id="key-technologies" className="mb-12">
                <h2 className="text-3xl font-bold text-green-800 mb-6 flex items-center">
                  <Cpu className="mr-2 h-6 w-6" />
                  {content.keyTechnologies.title}
                </h2>
                <p className="text-lg text-gray-700 mb-8">{content.keyTechnologies.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {content.keyTechnologies.technologies.map((tech, index) => (
                    <TechnologyCard
                      key={index}
                      title={tech.title}
                      description={tech.description}
                      icon={getTechIcon(tech.icon)}
                      color={tech.color}
                    />
                  ))}
                </div>
              </section>

              <Separator className="my-12" />

              <section id="applications" className="mb-12">
                <h2 className="text-3xl font-bold text-green-800 mb-6 flex items-center">
                  <Tractor className="mr-2 h-6 w-6" />
                  {content.applications.title}
                </h2>
                <p className="text-lg text-gray-700 mb-8">{content.applications.description}</p>

                <Tabs defaultValue="precision-farming">
                  <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
                    {content.applications.categories.map((category) => (
                      <TabsTrigger key={category.id} value={category.id}>
                        {category.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {content.applications.categories.map((category) => (
                    <TabsContent key={category.id} value={category.id} className="space-y-6">
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold text-green-800 mb-4">{category.title}</h3>
                          <p className="text-gray-700 mb-6">{category.description}</p>

                          <h4 className="font-semibold text-gray-800 mb-3">{content.applications.keyFeatures}:</h4>
                          <ul className="space-y-2 mb-6">
                            {category.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>

                          <h4 className="font-semibold text-gray-800 mb-3">{content.applications.technologies}:</h4>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {category.technologies.map((tech, idx) => (
                              <Badge key={idx} variant="outline" className="bg-green-50">
                                {tech}
                              </Badge>
                            ))}
                          </div>

                          {category.image && (
                            <div className="mt-6 rounded-lg overflow-hidden">
                              <img
                                src={`/placeholder.svg?height=300&width=600&text=${category.title}`}
                                alt={category.title}
                                className="w-full h-auto"
                              />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>
                  ))}
                </Tabs>
              </section>

              <Separator className="my-12" />

              <section id="case-studies" className="mb-12">
                <h2 className="text-3xl font-bold text-green-800 mb-6 flex items-center">
                  <FileText className="mr-2 h-6 w-6" />
                  {content.caseStudies.title}
                </h2>
                <p className="text-lg text-gray-700 mb-8">{content.caseStudies.description}</p>

                <div className="space-y-8">
                  {content.caseStudies.studies.map((study, index) => (
                    <IoTCaseStudy
                      key={index}
                      title={study.title}
                      company={study.company}
                      location={study.location}
                      challenge={study.challenge}
                      solution={study.solution}
                      results={study.results}
                      technologies={study.technologies}
                    />
                  ))}
                </div>
              </section>

              <Separator className="my-12" />

              <section id="benefits-challenges" className="mb-12">
                <h2 className="text-3xl font-bold text-green-800 mb-6 flex items-center">
                  <BarChart className="mr-2 h-6 w-6" />
                  {content.benefitsChallenges.title}
                </h2>

                <BenefitsChallenges
                  benefits={content.benefitsChallenges.benefits}
                  challenges={content.benefitsChallenges.challenges}
                />
              </section>

              <Separator className="my-12" />

              <section id="implementation" className="mb-12">
                <h2 className="text-3xl font-bold text-green-800 mb-6 flex items-center">
                  <Cpu className="mr-2 h-6 w-6" />
                  {content.implementation.title}
                </h2>
                <p className="text-lg text-gray-700 mb-8">{content.implementation.description}</p>

                <ImplementationSteps steps={content.implementation.steps} />

                <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-6">
                  <div className="flex items-start">
                    <AlertTriangle className="h-6 w-6 text-amber-600 mr-3 mt-0.5" />
                    <div>
                      <h4 className="text-lg font-semibold text-amber-800 mb-2">
                        {content.implementation.considerations.title}
                      </h4>
                      <ul className="space-y-2">
                        {content.implementation.considerations.items.map((item, idx) => (
                          <li key={idx} className="text-amber-700">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <Separator className="my-12" />

              <section id="future-trends" className="mb-12">
                <h2 className="text-3xl font-bold text-green-800 mb-6 flex items-center">
                  <TrendingUp className="mr-2 h-6 w-6" />
                  {content.futureTrends.title}
                </h2>
                <p className="text-lg text-gray-700 mb-8">{content.futureTrends.description}</p>

                <Accordion type="single" collapsible className="w-full">
                  {content.futureTrends.trends.map((trend, idx) => (
                    <AccordionItem key={idx} value={`trend-${idx}`}>
                      <AccordionTrigger className="text-lg font-medium text-gray-800">{trend.title}</AccordionTrigger>
                      <AccordionContent className="text-gray-700">
                        <p className="mb-4">{trend.description}</p>
                        <h4 className="font-semibold mb-2">{content.futureTrends.potentialImpact}:</h4>
                        <ul className="list-disc pl-5 space-y-1 mb-4">
                          {trend.impacts.map((impact, i) => (
                            <li key={i}>{impact}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>

              <Separator className="my-12" />

              <section id="resources" className="mb-12">
                <h2 className="text-3xl font-bold text-green-800 mb-6 flex items-center">
                  <BookOpen className="mr-2 h-6 w-6" />
                  {content.resources.title}
                </h2>
                <p className="text-lg text-gray-700 mb-8">{content.resources.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {content.resources.categories.map((category, idx) => (
                    <div key={idx}>
                      <h3 className="text-xl font-semibold text-green-800 mb-4">{category.title}</h3>
                      <div className="space-y-4">
                        {category.items.map((resource, i) => (
                          <ResourceCard
                            key={i}
                            title={resource.title}
                            description={resource.description}
                            link={resource.link}
                            type={resource.type as any}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <Separator className="my-12" />

              <section id="conclusion" className="mb-12">
                <h2 className="text-3xl font-bold text-green-800 mb-6 flex items-center">
                  <CheckCircle2 className="mr-2 h-6 w-6" />
                  {content.conclusion.title}
                </h2>
                <div className="prose prose-green max-w-none">
                  <p className="text-lg text-gray-700 mb-4">{content.conclusion.summary}</p>
                  <p className="text-gray-700 mb-4">{content.conclusion.finalThoughts}</p>
                  <p className="text-gray-700 mb-4">{content.conclusion.callToAction}</p>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Button className="bg-green-600 hover:bg-green-700">{content.conclusion.primaryButton}</Button>
                  <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                    {content.conclusion.secondaryButton}
                  </Button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>    
  )
}

// Helper function to get the appropriate icon based on the icon name
function getTechIcon(iconName: string) {
  const iconMap: Record<string, ReactNode> = {
    sensors: <Thermometer className="h-6 w-6" />,
    connectivity: <WifiIcon className="h-6 w-6" />,
    cloud: <Cloud className="h-6 w-6" />,
    data: <Database className="h-6 w-6" />,
    mobile: <Smartphone className="h-6 w-6" />,
    water: <Droplet className="h-6 w-6" />,
    sun: <Sun className="h-6 w-6" />,
    wind: <Wind className="h-6 w-6" />,
    leaf: <Leaf className="h-6 w-6" />,
    cpu: <Cpu className="h-6 w-6" />,
    chart: <BarChart className="h-6 w-6" />,
    tractor: <Tractor className="h-6 w-6" />,
  }

  return iconMap[iconName] || <Cpu className="h-6 w-6" />
}

function WifiIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 20h.01" />
      <path d="M17.71 15.29a6 6 0 0 0-8.48-8.48" />
      <path d="M5.64 12.64a9 9 0 0 1 12.72 0" />
      <path d="M1.29 9.3a13 13 0 0 1 18.42-2.01" />
    </svg>
  )
}

