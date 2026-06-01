import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import { EyeCloseIcon, EyeIcon } from "@/shared/icons";
import Label from "@/shared/components/form/Label";
import Input from "@/shared/components/form/input/InputField";
import Checkbox from "@/shared/components/form/input/Checkbox";
import Button from "@/shared/components/ui/button/Button";
import { useAuth } from "@/app/providers/AuthProvider";

import PageMeta from "@/shared/components/common/PageMeta";
import AuthLayout from "@/app/layouts/AuthLayout";
import { showWarning } from "@/shared/utils/toast";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = (location.state as any)?.from?.pathname || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [email, setEmail] = useState("aemendoza@gmail.com");
  const [password, setPassword] = useState("P@ssw0rd");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      console.log(from);
      navigate(from, { replace: true });
    } catch (err: any) {
      showWarning(err?.message || "Invalid credentials", {position: "top-center"});
    } finally {
      setLoading(false);
    }
  };

  const pageTitle = "Login";

  return (
    <>
      <PageMeta title={`${import.meta.env.COMPANY_NAME} | ${pageTitle}`}/>
      <AuthLayout>
        <div className="flex flex-col flex-1">
          <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <div>
              <div className="mb-5 sm:mb-8">
                <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                  Sign In
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enter your email and password to sign in!
                </p>
              </div>
              <div>
                <form onSubmit={handleLogin}>
                  <div className="space-y-6">
                    <div>
                      <Label>
                        Email <span className="text-error-500">*</span>{" "}
                      </Label>
                      <Input
                        placeholder="info@gmail.com"
                        value={email}
                        required={true}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>
                        Password <span className="text-error-500">*</span>{" "}
                      </Label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={password}
                          required={true}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <span
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                        >
                          {showPassword ? (
                            <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                          ) : (
                            <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Checkbox checked={isChecked} onChange={setIsChecked} />
                        <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                          Keep me logged in
                        </span>
                      </div>
                      <Link
                        to="/reset-password"
                        className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div>
                      <Button
                        type="submit"
                        className="w-full"
                        size="sm"
                        disabled={loading}
                      >
                        Sign in
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}

export default LoginPage;