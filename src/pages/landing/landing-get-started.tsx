import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAnimation, aos } from "@/context/aos";

const LandingGetStarted = () => {
    useAnimation();

    return (
        <section className="relative py-24 bg-gradient-to-br from-gray-900 via-slate-900 to-emerald-900/30 overflow-hidden isolate">
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-[-1] opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        <div className="container mx-auto px-6 md:px-12">
            {/* Section Header */}
            <div 
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16"
            data-aos={aos.fadeUp}
            >
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 mb-6 md:mb-0">
                Get Started Now
            </h2>
            
            {/* Navigation Controls */}
            <div className="flex items-center gap-4">
                <button className="p-3 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-300 hover:-translate-x-1 shadow-lg hover:shadow-emerald-500/10">
                <ChevronLeft className="h-6 w-6 text-emerald-400" />
                </button>
                <button className="p-3 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 hover:to-cyan-400 transition-all duration-300 hover:translate-x-1 shadow-lg hover:shadow-emerald-500/20">
                <ChevronRight className="h-6 w-6 text-white" />
                </button>
            </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Hydroponic Systems Card */}
            <div 
                className="relative h-[500px] rounded-3xl overflow-hidden group"
                data-aos={aos.fadeUp}
                data-aos-delay="100"
            >
                <img
                src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920"
                alt="Hydroponic farming"
                className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-end p-8">
                <p className="text-emerald-400 text-sm mb-2 uppercase tracking-widest">
                    Technology Integration
                </p>
                <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                    Hydroponic Systems
                </h3>
                {/* Animated Underline */}
                <div className="w-0 h-px bg-gradient-to-r from-emerald-400 to-cyan-400 mt-4 group-hover:w-24 transition-all duration-500" />
                </div>
                {/* Hover Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -rotate-12 -translate-x-full group-hover:translate-x-full" />
            </div>

            {/* Livestock Monitoring Card */}
            <div 
                className="relative h-[500px] rounded-3xl overflow-hidden group"
                data-aos={aos.fadeUp}
                data-aos-delay="200"
            >
                <img
                src="https://images.unsplash.com/photo-1471193945509-9ad0617afabf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920"
                alt="Livestock monitoring"
                className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-end p-8">
                <p className="text-emerald-400 text-sm mb-2 uppercase tracking-widest">
                    Organic Farming
                </p>
                <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                    Livestock Monitoring
                </h3>
                <div className="w-0 h-px bg-gradient-to-r from-emerald-400 to-cyan-400 mt-4 group-hover:w-24 transition-all duration-500" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -rotate-12 -translate-x-full group-hover:translate-x-full" />
            </div>

            {/* Drone Monitoring Card */}
            <div 
                className="relative h-[500px] rounded-3xl overflow-hidden group"
                data-aos={aos.fadeUp}
                data-aos-delay="300"
            >
                <img
                src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920"
                alt="Drone monitoring"
                className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-end p-8">
                <p className="text-emerald-400 text-sm mb-2 uppercase tracking-widest">
                    Agricultural Innovation
                </p>
                <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                    Drone Monitoring
                </h3>
                <div className="w-0 h-px bg-gradient-to-r from-emerald-400 to-cyan-400 mt-4 group-hover:w-24 transition-all duration-500" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -rotate-12 -translate-x-full group-hover:translate-x-full" />
            </div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
            {[...Array(30)].map((_, i) => (
                <div
                key={i}
                className="absolute w-0.5 h-0.5 bg-green-400/30 rounded-full animate-float"
                style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.5}s`
                }}
                />
            ))}
            </div>
        </div>
        </section>
    );
};

export default LandingGetStarted;