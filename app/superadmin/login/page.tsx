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
  Shield,
  Lock,
  ShieldCheck
} from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

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
      // Step 1: Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Step 2: Fetch user profile from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // No profile found in Firestore
        setErrors({ email: "", password: "User profile not found. Contact system administrator." });
        await auth.signOut(); // Sign out if no profile
        return;
      }

      const userData = userDoc.data();
      
      // Step 3: Verify SuperAdmin role
      if (userData.role !== "superadmin") {
        setErrors({ 
          email: "", 
          password: `Access denied. Required: SuperAdmin, Found: ${userData.role || "No role assigned"}` 
        });
        await auth.signOut(); // Sign out if not SuperAdmin
        return;
      }

      // Step 4: Verify account status
      if (userData.status !== "active") {
        setErrors({ 
          email: "", 
          password: `Account ${userData.status || "inactive"}. Contact system administrator.` 
        });
        await auth.signOut();
        return;
      }

      // Step 5: Success - Update last login and redirect
      try {
        // Optional: Update last login timestamp
        const { updateDoc, serverTimestamp } = await import("firebase/firestore");
        await updateDoc(userDocRef, {
          lastLogin: serverTimestamp(),
          lastLoginIP: "browser" // You can implement IP detection if needed
        });
      } catch (updateError) {
        console.warn("Could not update last login:", updateError);
        // Don't block login for this failure
      }

      // Success! Redirect to SuperAdmin dashboard
      router.push("/superadmin");
      
    } catch (error: any) {
      let errorMessage = "Login failed. Please verify your credentials.";
      
      // Handle specific Firebase auth errors
      if (error.code === 'auth/user-not-found') {
        errorMessage = "No account found with this email address";
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = "Incorrect password";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Invalid email format";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many failed attempts. Please try again later";
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = "This account has been disabled";
      } else if (error.code === 'permission-denied') {
        errorMessage = "Access denied. Insufficient permissions";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setErrors({ email: "", password: errorMessage });
      
      // Ensure user is signed out on any error
      try {
        await auth.signOut();
      } catch (signOutError) {
        console.warn("Error signing out:", signOutError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 text-gray-600 hover:text-gray-900"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        {/* Main Login Card */}
        <Card className="bg-white shadow-lg border border-gray-200 relative">
          {/* Golden Crown */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10">
            <div className="bg-gradient-to-br from-yellow-400 to-amber-500 p-3 rounded-full shadow-lg">
              <Crown className="h-8 w-8 text-white" />
            </div>
          </div>

          <CardHeader className="text-center pt-12 pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
              SuperAdmin Access
            </CardTitle>
            <CardDescription className="text-gray-600">
              Executive Control Panel
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 px-6 pb-6">
            {/* Security Notice */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center space-x-2 text-blue-700 mb-2">
                <ShieldCheck className="h-4 w-4" />
                <span className="font-medium text-sm">Secure Access Zone</span>
              </div>
              <p className="text-xs text-blue-600">
                All access attempts are monitored and logged.
              </p>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  placeholder="admin@prepcare.ke"
                  className="pl-10 h-12"
                  autoFocus
                />
              </div>
              {errors.email && (
                <div className="flex items-center space-x-2 text-red-600 text-sm">
                  <AlertTriangle className="h-4 w-4" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center space-x-2 text-red-600 text-sm">
                  <AlertTriangle className="h-4 w-4" />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium"
              disabled={isLoading || !formData.email || !formData.password}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Access Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            {/* Action Links */}
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
                Request access
              </button>
            </div>

            {/* Security Footer */}
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Protected by enterprise security protocols
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}