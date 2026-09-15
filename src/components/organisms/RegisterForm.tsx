"use client";

import { LoginForm } from "@/components/organisms";

export const RegisterForm = () => {
  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-lg font-medium text-white mb-2">
          Create an account
        </h2>
        <p className="text-sm text-gray-400">
          Sign up using your preferred provider
        </p>
      </div>
      {/* Karena sekarang pakai OAuth, Register & Login bisa dibilang identik mekanismenya */}
      <LoginForm />
    </div>
  );
};
