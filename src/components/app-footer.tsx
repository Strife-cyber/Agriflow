import AppLogo from "./app-logo";
import { useAnimation, aos } from "@/context/aos";

const AppFooter = () => {
  useAnimation();

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 to-emerald-900 py-24 overflow-hidden isolate">
      {/* Background Elements */}
      <div className="absolute inset-0 z-[-1] opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:16px_16px]">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900" />
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12" data-aos={aos.fadeUp}>
          {/* Company Info */}
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <AppLogo className="text-white"/>
            </div>
            <p className="text-gray-300/90 text-lg leading-relaxed">
              Revolutionizing agriculture with smart technology and IoT solutions.
            </p>
            <div className="flex gap-5">
              {['twitter', 'facebook', 'instagram'].map((platform, i) => (
                <a 
                  key={platform}
                  href="#" 
                  className="p-3 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-300 hover:-translate-y-1"
                  data-aos={aos.fadeRight}
                  data-aos-delay={i * 100}
                >
                  <svg 
                    className="h-6 w-6 text-emerald-400 hover:text-cyan-400 transition-colors"
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    {/* SVG paths for each social platform */}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div data-aos={aos.fadeUp} data-aos-delay="150">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 mb-6">
              Services
            </h3>
            <ul className="space-y-4">
              {['IoT Solutions', 'Smart Farming', 'Data Analytics', 'Consulting'].map((item, _) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-white flex items-center group transition-all duration-300"
                  >
                    <span className="mr-2 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">▹</span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div data-aos={aos.fadeUp} data-aos-delay="200">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 mb-6">
              Legal
            </h3>
            <ul className="space-y-4">
              {['Privacy', 'Terms', 'Copyright', 'License'].map((item, _) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-white flex items-center group transition-all duration-300"
                  >
                    <span className="mr-2 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">▹</span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div 
          className="mt-16 pt-8 border-t border-emerald-400/20 text-center"
          data-aos={aos.fadeUp}
          data-aos-delay="300"
        >
          <p className="text-gray-400/90">
            © {new Date().getFullYear()} AgriTech. All rights reserved. |{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
              A School Project
            </span>
          </p>
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
    </footer>
  );
};

export default AppFooter;
