import { useLanguage } from "@/context/language-context";
import { useAnimation, aos } from "@/context/aos";

const stats = [
  { value: "50+", en: "Smart Sensors", fr: "Capteurs Intelligents" },
  { value: "200+", en: "Farming Partners", fr: "Partenaires Agricoles" },
  { value: "120,000+", en: "Acres Optimized", fr: "Hectares Optimisés" },
  { value: "$15 Billion", en: "Yield Value", fr: "Valeur de Rendement" }
];

const LandingStats = () => {
  const { isEnglish } = useLanguage();
  useAnimation();

  return (
    <section className="relative py-24 overflow-hidden isolate">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-[-1] opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      {/* Floating Drift Lines */}
      <div className="absolute inset-0 z-[-1]">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent animate-drift"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 30 + 30}%`,
              animationDelay: `${i * 0.4}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              data-aos={aos.zoomIn}
              data-aos-delay={index * 120}
              className="relative group bg-white/50 border border-emerald-300/20 rounded-3xl p-10 backdrop-blur-xl shadow-2xl hover:shadow-emerald-400/20 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Hover Gradient Shine */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-400/10 via-sky-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Animated Glow Border */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-emerald-400/20 transition-all duration-500 pointer-events-none" />

              <div className="flex flex-col items-center text-center space-y-5">
                <p className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400 animate-text drop-shadow-sm">
                  {stat.value}
                </p>
                <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  {isEnglish ? stat.en : stat.fr}
                </p>
              </div>

              {/* Underline Highlight */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-full group-hover:w-24 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.6}s`
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default LandingStats;
