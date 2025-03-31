import type React from "react"

import { z } from "zod";
import { useState } from "react";
import useAuthHook from "@/hooks/auth-hook";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  CheckCircle2, AlertCircle, 
  UserPlus, Eye, EyeOff 
} from "lucide-react";
import { 
  Card, CardContent, CardDescription, 
  CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { 
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem 
} from "@/components/ui/select";

// Form validation schema
const userSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
    role: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type UserFormData = z.infer<typeof userSchema>

export default function UserManagement() {
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: ""
  })

  const { registerFunction } = useAuthHook();
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    try {
      userSchema.parse(formData)
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      await registerFunction(formData.name, formData.email, formData.password, formData.role);
      
      // Show success message
      setShowSuccess(true);

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: ""
      })

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 5000)
    } catch (error) {
      setErrors({ form: "Failed to create user. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }))

    // Clear error when field is edited
    if (errors.role) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.role
        return newErrors
      })
    }
  }

  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="mb-6">
        <p className="text-gray-600 text-sm mt-2">Add and manage users in your agricultural system</p>
      </div>

      {showSuccess && (
        <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>User has been successfully created.</AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-green-100">
          <CardHeader className="border-b border-green-100">
            <CardTitle className="text-gray-800 flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-green-600" />
              Add New User
            </CardTitle>
            <CardDescription className="text-gray-600">
              Create a new user account with appropriate access permissions
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`bg-white border-gray-200 ${errors.name ? "border-red-300 focus-visible:ring-red-300" : "focus-visible:ring-green-300"}`}
                />
                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="user@example.com"
                  className={`bg-white border-gray-200 ${errors.email ? "border-red-300 focus-visible:ring-red-300" : "focus-visible:ring-green-300"}`}
                />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-gray-700">
                  User Role
                </Label>
                <Select value={formData.role} onValueChange={handleRoleChange}>
                  <SelectTrigger
                    id="role"
                    className={`bg-white w-full border-gray-200 ${errors.role ? "border-red-300 focus-visible:ring-red-300" : "focus-visible:ring-green-300"}`}
                  >
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="administrator">Administrator</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="field_worker">Field Worker</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                    <SelectItem value="agronomist">Agronomist</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && <p className="text-sm text-red-500 mt-1">{errors.role}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className={`bg-white border-gray-200 pr-10 ${errors.password ? "border-red-300 focus-visible:ring-red-300" : "focus-visible:ring-green-300"}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
                {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
                <div className="text-xs text-gray-500 space-y-1 mt-2">
                  <p>Password must:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li className={formData.password.length >= 8 ? "text-green-600" : ""}>
                      Be at least 8 characters long
                    </li>
                    <li className={/[A-Z]/.test(formData.password) ? "text-green-600" : ""}>
                      Include at least one uppercase letter
                    </li>
                    <li className={/[a-z]/.test(formData.password) ? "text-green-600" : ""}>
                      Include at least one lowercase letter
                    </li>
                    <li className={/[0-9]/.test(formData.password) ? "text-green-600" : ""}>
                      Include at least one number
                    </li>
                    <li className={/[^A-Za-z0-9]/.test(formData.password) ? "text-green-600" : ""}>
                      Include at least one special character
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`bg-white border-gray-200 pr-10 ${errors.confirmPassword ? "border-red-300 focus-visible:ring-red-300" : "focus-visible:ring-green-300"}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
                {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
              </div>

              {errors.form && (
                <Alert variant="destructive" className="bg-red-50 text-red-800 border-red-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{errors.form}</AlertDescription>
                </Alert>
              )}
            </CardContent>

            <CardFooter className="border-t border-green-100 bg-green-50/50 px-6 py-4">
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white ml-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating User...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Create User
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="hidden md:block">
          <Card className="border-green-100 h-full">
            <CardHeader className="border-b border-green-100">
              <CardTitle className="text-gray-800">User Management Tips</CardTitle>
              <CardDescription className="text-gray-600">
                Best practices for managing users in your agricultural system
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">User Roles</h3>
                  <p className="text-gray-600 text-sm">
                    Consider assigning appropriate roles to users based on their responsibilities:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 space-y-1">
                    <li>
                      <span className="font-medium">Administrators</span> - Full system access
                    </li>
                    <li>
                      <span className="font-medium">Managers</span> - Access to reports and most settings
                    </li>
                    <li>
                      <span className="font-medium">Field Workers</span> - Access to data collection and basic reports
                    </li>
                    <li>
                      <span className="font-medium">Viewers</span> - Read-only access to dashboards and reports
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Security Best Practices</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                    <li>Regularly audit user accounts and remove unused ones</li>
                    <li>Enforce strong password policies</li>
                    <li>Implement two-factor authentication for sensitive roles</li>
                    <li>Review access logs periodically</li>
                    <li>Follow the principle of least privilege</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Onboarding Process</h3>
                  <p className="text-gray-600 text-sm">After creating a user account:</p>
                  <ol className="list-decimal pl-5 mt-2 text-sm text-gray-600 space-y-1">
                    <li>Send welcome email with login instructions</li>
                    <li>Provide training resources for system usage</li>
                    <li>Schedule orientation session if needed</li>
                    <li>Follow up after first week of access</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
