import { useState, FormEventHandler, useRef } from "react";
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

import InputError from "@/components/input-error";
import AppLayout from "@/layouts/app-layout";
import SettingsLayout from "@/layouts/settings/layout";
import { type BreadcrumbItem } from "@/index";

import HeadingSmall from "@/components/heading-small";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Password settings",
    href: "/settings/password",
  },
];

export default function Password() {
  const auth = getAuth();
  const user = auth.currentUser; // Get the currently signed-in user
  const passwordInput = useRef<HTMLInputElement>(null);
  const currentPasswordInput = useRef<HTMLInputElement>(null);

  // State management for form data and errors
  const [formData, setFormData] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [processing, setProcessing] = useState(false);
  const [recentlySuccessful, setRecentlySuccessful] = useState(false);

  const updatePasswordHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});
    setRecentlySuccessful(false);

    if (!user) {
      setErrors({ general: "No user is signed in." });
      setProcessing(false);
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setErrors({ password_confirmation: "Passwords do not match." });
      setProcessing(false);
      return;
    }

    try {
      // Step 1: Reauthenticate the user
      const credential = EmailAuthProvider.credential(user.email!, formData.current_password);
      await reauthenticateWithCredential(user, credential);

      // Step 2: Update the password
      await updatePassword(user, formData.password);

      // Reset form after success
      setFormData({
        current_password: "",
        password: "",
        password_confirmation: "",
      });

      setRecentlySuccessful(true);
    } catch (error: any) {
      console.error(error);
      if (error.code === "auth/wrong-password") {
        setErrors({ current_password: "Incorrect current password." });
      } else if (error.code === "auth/weak-password") {
        setErrors({ password: "Password must be at least 6 characters." });
      } else {
        setErrors({ general: "Failed to update password. Please try again." });
      }
    }

    setProcessing(false);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall
            title="Update password"
            description="Ensure your account is using a long, random password to stay secure"
          />

          <form onSubmit={updatePasswordHandler} className="space-y-6">
            {/* Error Messages */}
            {errors.general && <p className="text-red-500">{errors.general}</p>}

            {/* Current Password */}
            <div className="grid gap-2">
              <Label htmlFor="current_password">Current password</Label>
              <Input
                id="current_password"
                ref={currentPasswordInput}
                value={formData.current_password}
                onChange={(e) => setFormData({ ...formData, current_password: e.target.value })}
                type="password"
                className="mt-1 block w-full"
                autoComplete="current-password"
                placeholder="Current password"
              />
              <InputError message={errors.current_password} />
            </div>

            {/* New Password */}
            <div className="grid gap-2">
              <Label htmlFor="password">New password</Label>
              <Input
                id="password"
                ref={passwordInput}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                type="password"
                className="mt-1 block w-full"
                autoComplete="new-password"
                placeholder="New password"
              />
              <InputError message={errors.password} />
            </div>

            {/* Confirm Password */}
            <div className="grid gap-2">
              <Label htmlFor="password_confirmation">Confirm password</Label>
              <Input
                id="password_confirmation"
                value={formData.password_confirmation}
                onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                type="password"
                className="mt-1 block w-full"
                autoComplete="new-password"
                placeholder="Confirm password"
              />
              <InputError message={errors.password_confirmation} />
            </div>

            {/* Save Button */}
            <div className="flex items-center gap-4">
              <Button disabled={processing}>{processing ? "Saving..." : "Save password"}</Button>
              {recentlySuccessful && <p className="text-sm text-green-600">Password updated successfully!</p>}
            </div>
          </form>
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}
