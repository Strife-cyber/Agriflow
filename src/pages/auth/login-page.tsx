import { useState } from "react";
import { Lock, Mail } from "lucide-react";
import useAuthHook from "@/hooks/auth-hook";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LoginImage from "@/assets/loginImage.png";
import { useAnimation, aos } from "@/context/aos";
import { Checkbox } from "@/components/ui/checkbox";
import AppLogoIcon from "@/components/app-logo-icon";
import { useTranslation } from "@/context/translation";

export default function LoginPage() {
    useAnimation()
    const navigate = useNavigate();
    const translate = useTranslation();
    const { loginFunction } = useAuthHook();
    const [isLoading, setIsLoading] = useState(false)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setTimeout(async () => {
            await loginFunction(email, password);
            setIsLoading(false)
        }, 1500)
        navigate("/dashboard")
    }

    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row bg-gray-900 overflow-hidden">
            {/* Left side - Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 relative isolate overflow-hidden">
                {/* Holographic Grid Background */}
                <div className="absolute inset-0 z-[-2] opacity-20">
                    <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:16px_16px]">
                        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900" />
                    </div>
                </div>

                {/* Floating Nanotech Particles */}
                <div className="absolute inset-0 z-[-1] pointer-events-none">
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-emerald-400/20 rounded-full animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${i * 0.2}s`,
                                filter: `blur(${Math.random() * 4}px)`
                            }}
                        />
                    ))}
                </div>

                {/* Form Container */}
                <div className="w-full max-w-md space-y-8 backdrop-blur-xl bg-gray-900/20 p-10 rounded-[2.5rem] border-2 border-emerald-400/20 shadow-2xl shadow-emerald-900/30 hover:shadow-emerald-900/50 transition-all duration-500 group/form"
                    data-aos={aos.fadeRight}>
                    
                    {/* Glowing Border Effect */}
                    <div className="absolute inset-0 rounded-[2.5rem] border-[1px] border-emerald-400/10 pointer-events-none" />
                    <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(400px_at_50%_120%,rgba(16,185,129,0.15),transparent)] pointer-events-none" />

                    <div className="flex flex-col items-center space-y-6">
                        <div 
                            className="mb-4"
                        >
                            <AppLogoIcon />
                        </div>
                        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-[linear-gradient(45deg,#6EE7B7,#34D399,#10B981)] animate-text-shine text-center">
                            Agricultural Intelligence Portal
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-6">
                            {/* Email Input */}
                            <div className="space-y-4">
                                <Label htmlFor="email" className="text-sm font-medium text-emerald-300/90 uppercase tracking-widest">
                                    {translate('email')}
                                </Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-emerald-400/80 group-hover/input:text-cyan-400 transition-colors" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="innovator@agriflow.com"
                                        className="w-full pl-12 p-3 bg-gray-800 border border-emerald-400 rounded-lg text-white"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-sm font-medium text-emerald-300/90 uppercase tracking-widest">
                                        {translate('password')}
                                    </Label>
                                    <a href="/forgot-password" className="text-sm font-medium text-emerald-400/90 hover:text-cyan-400 transition-colors group/link">
                                        <span className="bg-gradient-to-r from-emerald-400 to-emerald-400 bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover/link:bg-[length:100%_2px]">
                                            {translate('forgotPassword')}
                                        </span>
                                    </a>
                                </div>
                                <div className="relative group/input">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-emerald-400/80 group-hover/input:text-cyan-400 transition-colors" />
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-12 p-3 bg-gray-800 border border-emerald-400 rounded-lg text-white"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center space-x-3">
                                <Checkbox 
                                    id="remember" 
                                    className="h-6 w-6 border-2 border-emerald-400/30 data-[state=checked]:bg-emerald-500/90 transition-all hover:border-cyan-400/50" 
                                />
                                <Label htmlFor="remember" className="text-sm font-medium text-emerald-300/90">
                                    {translate('rememberMe')}
                                </Label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500/90 hover:to-cyan-500/90 text-white font-semibold py-5 rounded-md shadow-xl hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 relative overflow-hidden group/button"
                            disabled={isLoading}
                        >
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] opacity-0 group-hover/button:opacity-100 group-hover/button:animate-shine" />
                            {isLoading ? (
                                <div className="flex items-center justify-center space-x-3">
                                    <div className="animate-spin rounded-full h-6 w-6 border-[3px] border-white/80 border-t-transparent" />
                                    <span className="text-lg">{translate('authenticating')}...</span>
                                </div>
                            ) : (
                                <span className="text-lg bg-clip-text text-transparent bg-[linear-gradient(45deg,#E5F9ED,#A7F3D0,#6EE7B7)]">
                                    {translate("login")}
                                </span>
                            )}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-emerald-400/20" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-4 bg-gray-900/50 text-emerald-400/80 text-sm font-medium tracking-widest rounded-full border border-emerald-400/20">
                                {translate('cultivatingFuture')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Immersive Visual */}
            <div className="hidden md:block md:w-1/2 relative bg-gray-800 overflow-hidden">
                {/* Background Image */}
                <img
                    src={LoginImage}
                    alt="Holographic interface overlaying agricultural fields with drone swarm"
                    className="absolute inset-0 w-full h-full object-cover transform scale-[1.02] saturate-150 contrast-125"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-emerald-900/40 to-cyan-900/30" />

                {/* Floating Data Visualization */}
                <div className="absolute inset-0 animate-float-slow">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[url('/grid-pattern.svg')] opacity-20" />
                    <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-[url('/wave-pattern.svg')] opacity-15" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-center items-center p-12 backdrop-blur-sm">
                    <div className="max-w-2xl text-center bg-gray-900/40 p-10 rounded-[2rem] border-2 border-emerald-400/20 shadow-2xl shadow-emerald-900/30"
                        data-aos={aos.fadeLeft}>
                        <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-[linear-gradient(45deg,#6EE7B7,#34D399,#10B981)] mb-8 leading-tight">
                            {translate('nextGenAgriculture')}
                        </h2>
                        <p className="text-xl text-emerald-100/90 leading-relaxed tracking-wide">
                            {translate('joinEcosystem')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
