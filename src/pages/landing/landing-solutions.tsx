import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const LandingSolutions = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-out", once: true });
  }, []);

  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-900 to-emerald-900/20 overflow-hidden isolate">
      {/* Background Elements */}
      <div className="absolute inset-0 z-[-1] opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:16px_16px]">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900" />
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12">
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-12" data-aos="fade-right">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
            Next-Gen Solutions for Optimal Crop Growth
          </h2>
          <p className="text-xl text-gray-300/90 leading-relaxed mt-4">
            We provide cutting-edge solutions for farmers to monitor crop health, optimize irrigation, 
            improve soil monitoring, and automation solutions with a focus on sustainability and efficiency.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-wrap w-screen gap-[20%] items-center">
            {/* Crop Surveillance */}
            <div 
              className="group w-full sm:w-[48%] lg:w-[30%] rounded-3xl overflow-hidden backdrop-blur-lg bg-gray-800/30 border border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-emerald-500/10"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <img
                src="https://th.bing.com/th/id/OIP.EW1qp3Xo2sl3rOi4r_e6AgHaDf?rs=1&pid=ImgDetMain"
                alt="Crop surveillance system"
                className="w-full h-64 object-cover transform transition-all duration-700 group-hover:scale-110"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-emerald-400 mb-3">Crop Surveillance</h3>
                <p className="text-gray-300">
                  Real-time monitoring systems that track crop health and alert farmers to potential 
                  issues before they become problems.
                </p>
              </div>
            </div>

            {/* Automated Farming */}
            <div 
              className="group w-full sm:w-[48%] lg:w-[30%] rounded-3xl overflow-hidden backdrop-blur-lg bg-gray-800/30 border border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-emerald-500/10"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <img
                src="https://images.unsplash.com/photo-1581094271901-8022df4466f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920"
                alt="Automated farming system"
                className="w-full h-64 object-cover transform transition-all duration-700 group-hover:scale-110"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-emerald-400 mb-3">Automated Farming</h3>
                <p className="text-gray-300">
                  IoT-powered systems that automate irrigation, fertilization, and other critical 
                  farming processes.
                </p>
              </div>
            </div>
          </div>

          {/* Farming Discussion - Full Width on Large Screens */}
          <div 
            className="relative group md:col-span-2 lg:col-span-3 rounded-3xl overflow-hidden backdrop-blur-lg bg-gray-800/30 border border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-emerald-500/10"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <img
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920"
              alt="Farming discussion"
              className="w-full h-96 object-cover transform transition-all duration-700 group-hover:scale-110"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-emerald-400 mb-3">Farming Discussion</h3>
              <p className="text-gray-300">
                Join our community of farmers and agricultural experts to share knowledge, 
                best practices, and innovative solutions.
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
