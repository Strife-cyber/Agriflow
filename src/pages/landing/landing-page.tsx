import LandingHero from "./landing-hero";
import LandingStats from "./landing-stats";
import LandingHeader from "./landing-header";
import AppFooter from "@/components/app-footer";
import LandingSolutions from "./landing-solutions";
import LandingGetStarted from "./landing-get-started";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f8f8]">
      {/* Header */}
      <LandingHeader/>

      <main className="flex-1">
        {/* Hero Section */}
        <LandingHero/>

        {/* Stats Section */}
        <LandingStats/>

        {/* Get Started Grid */}
        <LandingGetStarted/>

        {/* Next-Gen Solutions */}
        <LandingSolutions/>
      </main>

      {/* Footer */}
      <AppFooter/>
    </div>
  )
}
