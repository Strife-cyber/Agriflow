import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLanguage } from "@/context/language-context";

const LandingSolutions = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-out", once: true });
  }, []);

  const { isEnglish } = useLanguage();

  return (
    <section className="relative py-24 bg-gradient-to-br from-emerald-200 to-emerald-300 overflow-hidden isolate">
      {/* Background Elements */}
      <div className="absolute inset-0 z-[-1] opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px]">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-emerald-50" />
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12">
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-12" data-aos="fade-right">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-cyan-600">
            {isEnglish ? "Next-Gen Solutions for Optimal Crop Growth" : "Solutions de Nouvelle Génération pour une Croissance Optimale des Cultures"}
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed mt-4">
            {isEnglish
              ? "We provide cutting-edge solutions for farmers to monitor crop health, optimize irrigation, improve soil monitoring, and automation solutions with a focus on sustainability and efficiency."
              : "Nous fournissons des solutions de pointe pour aider les agriculteurs à surveiller la santé des cultures, optimiser l'irrigation, améliorer la surveillance des sols et automatiser des processus avec un accent sur la durabilité et l'efficacité."
            }
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-wrap w-screen gap-[20%] items-center">
            {/* Crop Surveillance */}
            <div
              className="group w-full sm:w-[48%] lg:w-[30%] rounded-3xl overflow-hidden backdrop-blur-lg bg-white border border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-500 hover:-translate-y-2 shadow-md hover:shadow-emerald-500/10"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <img
                src="https://th.bing.com/th/id/OIP.EW1qp3Xo2sl3rOi4r_e6AgHaDf?rs=1&pid=ImgDetMain"
                alt={isEnglish ? "Crop surveillance system" : "Système de surveillance des cultures"}
                className="w-full h-64 object-cover transform transition-all duration-700 group-hover:scale-110"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-emerald-600 mb-3">
                  {isEnglish ? "Crop Surveillance" : "Surveillance des Cultures"}
                </h3>
                <p className="text-gray-700">
                  {isEnglish
                    ? "Real-time monitoring systems that track crop health and alert farmers to potential issues before they become problems."
                    : "Des systèmes de surveillance en temps réel qui suivent la santé des cultures et alertent les agriculteurs des problèmes potentiels avant qu'ils ne deviennent critiques."
                  }
                </p>
              </div>
            </div>

            {/* Automated Farming */}
            <div
              className="group w-full sm:w-[48%] lg:w-[30%] rounded-3xl overflow-hidden backdrop-blur-lg bg-white border border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-500 hover:-translate-y-2 shadow-md hover:shadow-emerald-500/10"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <img
                src="https://images.unsplash.com/photo-1581094271901-8022df4466f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920"
                alt={isEnglish ? "Automated farming system" : "Système d'agriculture automatisé"}
                className="w-full h-64 object-cover transform transition-all duration-700 group-hover:scale-110"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-emerald-600 mb-3">
                  {isEnglish ? "Automated Farming" : "Agriculture Automatisée"}
                </h3>
                <p className="text-gray-700">
                  {isEnglish
                    ? "IoT-powered systems that automate irrigation, fertilization, and other critical farming processes."
                    : "Des systèmes basés sur l'IoT qui automatisent l'irrigation, la fertilisation et d'autres processus agricoles essentiels."
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Farming Discussion - Full Width on Large Screens */}
          <div
            className="relative group md:col-span-2 lg:col-span-3 rounded-3xl overflow-hidden backdrop-blur-lg bg-white border border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-500 hover:-translate-y-2 shadow-md hover:shadow-emerald-500/10"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <img
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920"
              alt={isEnglish ? "Farming discussion" : "Discussion agricole"}
              className="w-full h-96 object-cover transform transition-all duration-700 group-hover:scale-110"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-emerald-600 mb-3">
                {isEnglish ? "Farming Discussion" : "Discussion Agricole"}
              </h3>
              <p className="text-gray-700">
                {isEnglish
                  ? "Join our community of farmers and agricultural experts to share knowledge, best practices, and innovative solutions."
                  : "Rejoignez notre communauté d'agriculteurs et d'experts agricoles pour partager des connaissances, des meilleures pratiques et des solutions innovantes."
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-emerald-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default LandingSolutions;
