import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Facebook, Github, Twitter } from "lucide-react";

export default function SignIn() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      setError("Password is required");
    } else {
      setError("");
      // Submit logic
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full space-y-6">
          <img
            src="https://avatars.mds.yandex.net/i?id=0a32d2f753e665ef23329b8668d1f844_l-10653027-images-thumbs&n=13"
            alt="Logo"
            className="h-10"
          />

          <div>
            <h2 className="text-3xl font-bold text-gray-900">Sign in</h2>
            <p className="mt-1 text-sm text-gray-500">
              Don’t have an account?{" "}
              <a href="/register" className="text-indigo-600 font-medium">
                Sign up
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Email address
              </label>
              <Input type="email" placeholder="you@example.com" required />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Password
              </label>
              <div className="relative">
                <Input
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`pr-10 ${error ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  className="absolute right-2 top-2.5 text-gray-500"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="form-checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-sm text-indigo-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-full"
            >
              Sign in
            </Button>
          </form>

          <div className="text-center text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="flex-grow border-t" />
              <span className="text-xs">Or continue with</span>
              <div className="flex-grow border-t" />
            </div>

            <div className="flex justify-center mt-4 gap-4">
              <Button variant="outline" size="icon" className="rounded-full">
                <Facebook size={16} />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Twitter size={16} />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Github size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-[#0f172a] text-white p-10">
        <div className="max-w-md space-y-6">
          <h2 className="text-3xl font-bold">Welcome to our community</h2>
          <p className="text-sm text-gray-300">
            Fuse helps developers to build organized and well coded dashboards
            full of beautiful and rich modules. Join us and start building your
            application today.
          </p>
          <div className="flex items-center space-x-2">
            <img
              src="/avatars/avatar1.jpg"
              alt="user"
              className="w-8 h-8 rounded-full"
            />
            <img
              src="/avatars/avatar2.jpg"
              alt="user"
              className="w-8 h-8 rounded-full"
            />
            <img
              src="/avatars/avatar3.jpg"
              alt="user"
              className="w-8 h-8 rounded-full"
            />
            <img
              src="/avatars/avatar4.jpg"
              alt="user"
              className="w-8 h-8 rounded-full"
            />
            <p className="text-sm text-gray-300 ml-2">
              More than 17k people joined us, it's your turn
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
