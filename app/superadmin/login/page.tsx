"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Eye,
  EyeOff,
  Mail,
  KeyRound,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  Loader2,
  Crown,
} from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function SuperAdminLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      router.push("/superadmin");
    } catch (error: any) {
      setErrors({ email: "", password: error.message || "Login failed." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          className="mb-6 text-gray-600 hover:text-black"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
        </Button>

        <Card className="shadow-lg border border-gray-200 relative">
          <div className="absolute right-6 top-6">
            <Crown className="h-8 w-8 text-yellow-500" />
          </div>

          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-semibold">Super Admin Login</CardTitle>
            <CardDescription className="text-gray-500">
              Sign in with your authorized credentials
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2" /> {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2" /> {errors.password}
                </p>
              )}
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full text-white bg-black hover:bg-gray-800 h-12 text-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Signing In...
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>

            <div className="flex justify-between text-sm pt-2">
              <button
                onClick={() => router.push("/superadmin/forgot-password")}
                className="text-blue-600 hover:underline"
              >
                Forgot password?
              </button>
              <button
                onClick={() => router.push("/superadmin/register")}
                className="text-blue-600 hover:underline"
              >
                Register
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}