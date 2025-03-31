import { useState, FormEventHandler } from "react";
import { LoaderCircle } from "lucide-react";

import InputError from "@/components/input-error";
import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layouts/auth-layout";
import { useTranslation } from "@/context/translation";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase-config";
import { appUrl } from "@/context/configs";

export default function ForgotPassword({ status }: { status?: string }) {
    const translate = useTranslation();
    const [email, setEmail] = useState("");
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setMessage(null);
        setError(null);

        try {
            // Simulate API request
            await sendPasswordResetEmail(auth, email, {
                url: `${appUrl}/password-reset`// correct this later
            });
            setMessage(translate("passwordResetEmailSent"));
        } catch (err: any) {
            setError(translate("errorSendingEmail"));
        } finally {
            setProcessing(false);
        }
    };

    return (
        <AuthLayout title={translate("forgotPassword")} description={translate("forgotPasswordDescription")}>
            <head title={translate("forgotPassword")} />
            
            {message && <div className="mb-4 text-center text-sm font-medium text-green-600">{message}</div>}
            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}

            <div className="space-y-6">
                <form onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label htmlFor="email">{translate("email")}</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="off"
                            value={email}
                            autoFocus
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@example.com"
                        />
                        { error ?? <InputError message={error!} /> }
                    </div>

                    <div className="my-6 flex items-center justify-start">
                        <Button className="w-full" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                            {translate("sendPasswordReset")}
                        </Button>
                    </div>
                </form>

                <div className="text-muted-foreground space-x-1 text-center text-sm">
                    <span>{translate("orReturnTo")}</span>
                    <TextLink to="/auth">{translate("login")}</TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}
