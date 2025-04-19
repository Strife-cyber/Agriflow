import React from "react";
import AppLogo from "./app-logo";
import cn from "@/utils/class-merge";
import { useAnimation, aos } from "@/context/aos";
import { useTranslation } from "@/context/translation";
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";

const AppFooter: React.FC = (style: { style?: string }) => {
  useAnimation();
  const translation = useTranslation();

  return (
    <footer className={cn(
      "relative py-24 overflow-hidden isolate bg-black text-white",
      style
    )}>
      {/* Background Elements */}
      <div className="absolute inset-0 z-[-1] opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px]">
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-emerald-50" />
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12" data-aos={aos.fadeUp}>
          {/* Company Info */}
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <AppLogo className="text-white" />
            </div>
            <p className="text-white text-lg leading-relaxed">
              {translation("heroHeading")}
            </p>
            <div className="flex gap-5">
              {['twitter', 'facebook', 'instagram'].map((platform, i) => (
                <a 
                  key={platform}
                  href="#"
                  className="p-3 rounded-xl bg-white backdrop-blur-sm border border-gray-300 hover:border-emerald-400/40 transition-all duration-300 hover:-translate-y-1"
                  data-aos={aos.fadeRight}
                  data-aos-delay={i * 100}
                >
                  {/* FontAwesome Icons */}
                  {platform === "twitter" && <FaTwitter className="h-6 w-6 text-emerald-600 hover:text-cyan-600 transition-colors" />}
                  {platform === "facebook" && <FaFacebookF className="h-6 w-6 text-emerald-600 hover:text-cyan-600 transition-colors" />}
                  {platform === "instagram" && <FaInstagram className="h-6 w-6 text-emerald-600 hover:text-cyan-600 transition-colors" />}
                </a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div data-aos={aos.fadeUp} data-aos-delay="150">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-cyan-600 mb-6">
              {translation("services")}
            </h3>
            <ul className="space-y-4">
              {[translation("iotSolutions"), translation("automatedFarming"), translation("dataAnalytics"), translation("cropSurveillance")].map((item, _) => (
                <li key={item}>
                  <a 
                    href="#"
                    className="text-white hover:text-gray-900 flex items-center group transition-all duration-300"
                  >
                    <span className="mr-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">▹</span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div data-aos={aos.fadeUp} data-aos-delay="200">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-cyan-600 mb-6">
              {translation("legal")}
            </h3>
            <ul className="space-y-4">
              {[translation('Privacy'), translation('Terms'), translation('Copyright'), translation('License')].map((item, _) => (
                <li key={item}>
                  <a 
                    href="#"
                    className="text-white hover:text-gray-900 flex items-center group transition-all duration-300"
                  >
                    <span className="mr-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">▹</span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div 
          className="mt-16 pt-8 border-t border-gray-300 text-center"
          data-aos={aos.fadeUp}
          data-aos-delay="300"
        >
          <p className="text-gray-500">
            © {new Date().getFullYear()} AgriTech. All rights reserved. |{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-cyan-600">
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
