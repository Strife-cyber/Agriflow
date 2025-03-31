import { useState, FormEventHandler, useRef } from "react";
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

  const updatePassword: FormEventHandler = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});
    setRecentlySuccessful(false);

    try {
      // Simulate a request (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form after success
      setFormData({
        current_password: "",
        password: "",
        password_confirmation: "",
      });

      setRecentlySuccessful(true);
    } catch (error: any) {
      // Simulating server-side validation errors
      const simulatedErrors = {
        current_password: "Incorrect current password.",
        password: "Password must be at least 8 characters.",
      };

      setErrors(simulatedErrors);

      if (simulatedErrors.password) {
        setFormData((prev) => ({ ...prev, password: "", password_confirmation: "" }));
        passwordInput.current?.focus();
      }

      if (simulatedErrors.current_password) {
        setFormData((prev) => ({ ...prev, current_password: "" }));
        currentPasswordInput.current?.focus();
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

          <form onSubmit={updatePassword} className="space-y-6">
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

              {recentlySuccessful && <p className="text-sm text-neutral-600">Saved</p>}
            </div>
          </form>
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}
