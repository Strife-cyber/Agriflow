import HeroImage from "@/assets/heroImage.jpg";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAnimation, aos } from "@/context/aos";
import { useTranslation } from "@/context/translation";
import { Card, CardContent } from "@/components/ui/card";

const LandingHero = () => {
  useAnimation();
  const navigate = useNavigate();
  const translation = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-white to-emerald-100 py-20 overflow-hidden isolate">
      {/* Background Elements */}
      <div className="absolute inset-0 z-[-1] opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text Content */}
        <div className="space-y-8" data-aos={aos.fadeRight} data-aos-delay="100">
          <h1 className="text-2xl md:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 animate-text">
            {translation("heroHeading")}
          </h1>

          <p className="text-xl md:text-2xl text-gray-800/90 max-w-2xl leading-relaxed">
            {translation("heroSubHeading")}
          </p>

          <Button
            size="lg"
            className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-cyan-600 hover:to-cyan-500 text-white rounded-xl px-10 py-7 text-lg font-semibold transition-all duration-300 group shadow-2xl hover:shadow-emerald-500/30"
          >
            <span className="relative z-10" onClick={() => navigate("/auth")}>{translation("continue")}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute -inset-1 bg-[conic-gradient(from_90deg_at_50%_50%,#059669_0%,#10b981_50%,#059669_100%)] opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
          </Button>
        </div>

        {/* Image Card */}
        <div className="relative" data-aos={aos.zoomIn} data-aos-delay="200">
          <Card className="shadow-2xl rounded-3xl border border-emerald-500/20 bg-white/40 backdrop-blur-xl group transition-all duration-500 hover:-translate-y-2 hover:shadow-emerald-500/30">
            <CardContent className="p-0 relative overflow-hidden">
              <img
                src={HeroImage}
                alt="Farmland landscape"
                className="w-full h-[500px] object-cover transform transition-all duration-700 group-hover:scale-105"
              />
              
              {/* Holographic Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="space-y-4">
                  <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                    "Innovating Agriculture through Technology"
                  </p>
                  <div className="h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 w-24 rounded-full" />
                </div>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -rotate-12 -translate-x-full group-hover:translate-x-full" />
            </CardContent>
          </Card>

          {/* Floating Badge */}
          <div
            className="absolute -top-2 -right-6 bg-gradient-to-br from-emerald-600 to-cyan-600 text-white px-6 py-3 rounded-2xl shadow-2xl"
            data-aos={aos.slideLeft}
            data-aos-delay="300"
          >
            <span className="text-sm font-medium tracking-wide">Sustainable Innovation 4.0</span>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        data-aos={aos.fadeUp}
        data-aos-delay="500"
      >
        <div className="w-10 h-16 rounded-2xl border-2 border-emerald-400/40 relative backdrop-blur-sm bg-white/40">
          <div className="w-2 h-4 bg-gradient-to-b from-emerald-400 to-cyan-400 rounded-full absolute top-3 left-1/2 -translate-x-1/2 animate-bounce-slow" />
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
