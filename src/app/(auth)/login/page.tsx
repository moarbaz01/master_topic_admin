"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader2, Smartphone } from "lucide-react";
import { AuthService } from "../../../services/auth";
import { CountryCodeSelect } from "@/components/country-code-select";

export default function MobileLoginPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [countryCode, setCountryCode] = useState("91");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const phoneWithCountryCode = `${countryCode}${phone}`;

  // Handle Send OTP
  const handleSendOtp = async () => {
    if (!phone) {
      setErrorMsg("Please enter a valid phone number");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      await AuthService.sendOtp(phoneWithCountryCode);
      setStep("otp");
    } catch (error) {
      setErrorMsg(
        error instanceof Error ? error.message : "Failed to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle Verify OTP
  const handleVerifyOtp = async () => {
    if (otp.length < 6) {
      setErrorMsg("Please enter a 6-digit OTP");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      await AuthService.verifyOtp(phoneWithCountryCode, otp);
      router.push("/");
    } catch (error) {
      setErrorMsg(
        error instanceof Error ? error.message : "Failed to verify OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <Card className="w-full max-w-md rounded-xl border-0 shadow-lg overflow-hidden">
        <div className=" p-6 text-black">
          <CardHeader className="space-y-2 p-0">
            <div className="flex items-center justify-center">
              <Smartphone className="h-8 w-8 mr-2" />
              <CardTitle className="text-2xl font-bold">Mobile Login</CardTitle>
            </div>
            <p className="text-center text-sm">
              {step === "phone"
                ? "Enter your phone number to receive OTP"
                : "Enter the 6-digit OTP sent to your phone"}
            </p>
          </CardHeader>
        </div>

        <CardContent className="p-6 space-y-6">
          {step === "phone" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700">
                  Mobile Number
                </Label>
                <div className="flex gap-2">
                  <CountryCodeSelect
                    value={countryCode}
                    onValueChange={setCountryCode}
                  />
                  <Input
                    id="phone"
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <Button
                className="w-full h-11 bg-primary hover:bg-primary/50 rounded-full transition-colors"
                onClick={handleSendOtp}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Send OTP"
                )}
              </Button>
            </div>
          )}

          {step === "otp" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-gray-700">
                  Verification Code
                </Label>
                <div className="flex justify-center">
                  <InputOTP
                    id="otp"
                    value={otp}
                    onChange={(value) => setOtp(value)}
                    maxLength={6}
                    inputMode="numeric"
                  >
                    <InputOTPGroup className="gap-2">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className="w-12 h-12 text-lg border-2 border-gray-300 rounded-lg focus:border-primary"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <p className="text-center text-sm text-gray-500 mt-2">
                  OTP sent to +91 {phone.substring(0, 3)}****
                  {phone.substring(7)}
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full h-11 rounded-full transition-colors"
                  onClick={handleVerifyOtp}
                  disabled={loading || otp.length < 6}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify & Login"
                  )}
                </Button>

                <button
                  className="w-full text-sm text-primary hover:text-primary/50 transition-colors text-center"
                  onClick={() => setStep("phone")}
                >
                  Use different number
                </button>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-red-50 rounded-lg text-red-600 text-sm text-center">
              {errorMsg}
            </div>
          )}

          <div className="text-center text-sm text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
