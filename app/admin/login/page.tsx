"use client";

import LoginForm from "../components/LoginForm";

export default function AdminLogin() {
  return (
    <div className="min-h-screen bg-black text-gray-100 flex items-center justify-center px-5">
      <div className="max-w-md w-full">
        <LoginForm />
      </div>
    </div>
  );
}

