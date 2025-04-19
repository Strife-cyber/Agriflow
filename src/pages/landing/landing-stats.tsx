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
    useAnimation(); // Use centralized AOS initialization

    return (
        <section className="relative py-24 bg-gradient-to-br from-emerald-100 to-emerald-200 overflow-hidden isolate">
            {/* Dynamic Grid Background */}
            <div className="absolute inset-0 z-[-1] opacity-40">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iIzA5NjQ0OSIvPjwvc3ZnPg==')]">
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
                </div>
            </div>

            {/* Floating Lines Animation */}
            <div className="absolute inset-0 z-[-1] opacity-30">
                {[...Array(12)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute h-px bg-gradient-to-r from-transparent via-green-400 to-transparent animate-drift"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 30 + 20}%`,
                            animationDelay: `${i * 0.5}s`
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            data-aos={aos.slideUp}
                            data-aos-delay={index * 150}
                            className="group relative p-8 rounded-3xl bg-white/50 backdrop-blur-lg border border-green-400/20 hover:border-green-400/40 transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-green-500/10"
                        >
                            {/* Hover Shine Effect */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            {/* Glowing Border */}
                            <div className="absolute inset-0 rounded-3xl border-2 border-green-400/0 group-hover:border-green-400/10 transition-all duration-500 pointer-events-none" />

                            <div className="flex flex-col items-center text-center space-y-4">
                                <p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-400">
                                    {stat.value}
                                </p>
                                <p className="text-lg text-gray-800 font-medium">
                                    {isEnglish ? stat.en : stat.fr}
                                </p>
                            </div>

                            {/* Animated Underline */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-green-400 to-teal-400 group-hover:w-24 transition-all duration-500" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-0.5 h-0.5 bg-green-400/40 rounded-full animate-float"
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

export default LandingStats;
