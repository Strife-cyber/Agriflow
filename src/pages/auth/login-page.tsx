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
    useAnimation();
    const navigate = useNavigate();
    const translate = useTranslation();
    const { loginFunction, error } = useAuthHook();
    
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(null); // Reset previous errors

        try {
            if (await loginFunction(email, password)) {            
                navigate("/dashboard");
            } else {
                setErrorMessage(error);
            }
        } catch (error: any) {
            console.error("Login Error:", error); // Log error for debugging
            
            // Extract user-friendly error message
            let message = "An unknown error occurred. Please try again.";
            if (error.code) {
                switch (error.code) {
                    case "auth/invalid-email":
                        message = "Invalid email format.";
                        break;
                    case "auth/user-not-found":
                        message = "No account found with this email.";
                        break;
                    case "auth/wrong-password":
                        message = "Incorrect password. Please try again.";
                        break;
                    case "auth/too-many-requests":
                        message = "Too many failed attempts. Try again later.";
                        break;
                    default:
                        message = error.message || message;
                }
            }
            setErrorMessage(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row bg-white overflow-hidden">
            {/* Left side - Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 relative">
                
                {/* Light Grid Background */}
                <div className="absolute inset-0 z-[-2] opacity-20">
                    <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:16px_16px]">
                        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
                    </div>
                </div>

                {/* Floating Particles */}
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
                <div className="w-full max-w-md space-y-8 backdrop-blur-xl bg-white/80 p-10 rounded-[2.5rem] border border-gray-300 shadow-lg"
                    data-aos={aos.fadeRight}>
                    
                    {/* Logo */}
                    <div className="flex flex-col items-center space-y-6">
                        <div className="mb-4">
                            <AppLogoIcon />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-700 text-center">
                            AgriFlow
                        </h1>
                    </div>

                    {errorMessage && (
                        <p className="text-red-600 text-center text-sm bg-red-100 p-3 rounded-lg">
                            {errorMessage}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-6">
                            {/* Email Input */}
                            <div className="space-y-4">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700 uppercase tracking-widest">
                                    {translate('email')}
                                </Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-500" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="innovator@agriflow.com"
                                        className="w-full pl-12 p-3 bg-white border border-gray-300 rounded-lg text-gray-700 focus:border-emerald-500"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-sm font-medium text-gray-700 uppercase tracking-widest">
                                        {translate('password')}
                                    </Label>
                                    <a href="/forgot-password" className="text-sm font-medium text-emerald-600 hover:text-emerald-500">
                                        {translate('forgotPassword')}
                                    </a>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-500" />
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-12 p-3 bg-white border border-gray-300 rounded-lg text-gray-700 focus:border-emerald-500"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center space-x-3">
                                <Checkbox 
                                    id="remember" 
                                    className="h-6 w-6 border-2 border-gray-400 checked:border-emerald-500 transition-all" 
                                />
                                <Label htmlFor="remember" className="text-sm font-medium text-gray-700">
                                    {translate('rememberMe')}
                                </Label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-4 rounded-md transition-all"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center space-x-3">
                                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/80 border-t-transparent" />
                                    <span className="text-sm">{translate('authenticating')}...</span>
                                </div>
                            ) : (
                                <span className="text-sm">
                                    {translate("login")}
                                </span>
                            )}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-4 bg-white text-gray-600 text-sm font-medium tracking-widest">
                                {translate('cultivatingFuture')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Image */}
            <div className="hidden md:block md:w-1/2 relative bg-gray-100 overflow-hidden">
                <img
                    src={LoginImage}
                    alt="Agriculture AI Dashboard"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-300 to-gray-100 opacity-50" />
            </div>
        </div>
    );
}
