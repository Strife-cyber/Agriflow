import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAuth, confirmPasswordReset } from "firebase/auth";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layouts/auth-layout";

export default function ResetPassword() {
    const auth = getAuth();
    const [searchParams] = useSearchParams();
    const oobCode = searchParams.get("oobCode"); // Extract reset token from URL

    const [email, setEmail] = useState(""); // Email is optional, but can be pre-filled if needed
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const submit: React.FormEventHandler = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setError(null);
        setMessage(null);

        if (!oobCode) {
            setError("Invalid or expired reset link.");
            setProcessing(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setProcessing(false);
            return;
        }

        try {
            await confirmPasswordReset(auth, oobCode, password);
            setMessage("Password reset successful! You can now log in.");
        } catch (err) {
            setError("Failed to reset password. Please try again.");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <AuthLayout title="Reset password" description="Please enter your new password below">
            <head title="Reset password" />

            <form onSubmit={submit}>
                <div className="grid gap-6">
                    {message && <p className="text-green-600">{message}</p>}
                    {error && <p className="text-red-600">{error}</p>}

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email (optional)</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={email}
                            className="mt-1 block w-full"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email (if needed)"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">New Password</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            autoComplete="new-password"
                            value={password}
                            className="mt-1 block w-full"
                            autoFocus
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirm New Password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            autoComplete="new-password"
                            value={confirmPassword}
                            className="mt-1 block w-full"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                        />
                    </div>

                    <Button type="submit" className="mt-4 w-full" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Reset Password
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
