import AppLogo from "@/components/app-logo";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useAnimation, aos } from "@/context/aos";
import { useTranslation } from "@/context/translation";
import LanguageCombobox from "@/components/language-combobox";

const LandingHeader = () => {
  useAnimation();
  const navigate = useNavigate();
  const { authState } = useAuth();
  const translation = useTranslation();

  return (
    <header
      className="bg-transparent py-4 px-6 md:px-12 shadow-md border-b border-emerald-500/30 fixed w-full top-0 z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div
          data-aos={aos.fadeRight}
          className="flex items-center gap-2 group"
        >
          <AppLogo className="text-emerald-600" />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {["home", "about", "services", "contact"].map((item, i) => (
            <a
              key={item}
              href="#"
              data-aos={aos.fadeUp}
              data-aos-delay={100 + i * 50}
              className="text-sm font-medium text-gray-700 hover:text-emerald-600 relative
                         before:absolute before:-bottom-1 before:left-1/2 before:w-0 before:h-px 
                         before:bg-gradient-to-r from-emerald-500 to-cyan-500 hover:before:w-4/5 
                         hover:before:left-[10%] before:transition-all before:duration-300"
            >
              {translation(item)}
            </a>
          ))}
        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <div 
            data-aos={aos.zoomIn}
            data-aos-delay="400"
          >
            <Button
              className="hidden sm:flex rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 
                         hover:from-emerald-400 hover:to-cyan-400 text-white px-8 py-6 shadow-lg
                         hover:shadow-emerald-500/30 transition-all duration-300 relative overflow-hidden"
              onClick={() => navigate(authState.connected ? "/dashboard" : "/auth")}
            >
              <span className="relative z-10">{authState.connected ? translation("dashboard") : translation("login")}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </div>
          
          <div
            data-aos={aos.zoomIn}
            data-aos-delay="500"
          >
            <div className="border border-emerald-500/40 hover:border-emerald-500/60 bg-white">
              <LanguageCombobox />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-emerald-500/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>
    </header>
  );
};

export default LandingHeader;
