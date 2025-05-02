import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Github, Facebook, Twitter } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { register } from "../../features/auth/authSlice";

export default function Register() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    company: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.company) newErrors.company = "Company is required";

    setFormErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      dispatch(register(formData));
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Register Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full space-y-6">
          <img
            src="https://avatars.mds.yandex.net/i?id=0a32d2f753e665ef23329b8668d1f844_l-10653027-images-thumbs&n=13"
            alt="Logo"
            className="h-10"
          />

          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Create an account
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Already have an account?{" "}
              <a href="/login" className="text-indigo-600 font-medium">
                Sign in
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium block mb-1">
                Full name
              </label>
              <Input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={formErrors.fullName ? "border-red-500" : ""}
              />
              {formErrors.fullName && (
                <p className="text-sm text-red-500">{formErrors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium block mb-1">Email</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={formErrors.email ? "border-red-500" : ""}
              />
              {formErrors.email && (
                <p className="text-sm text-red-500">{formErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium block mb-1">Password</label>
              <div className="relative">
                <Input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`pr-10 ${
                    formErrors.password ? "border-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-2 top-2.5 text-gray-500"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formErrors.password && (
                <p className="text-sm text-red-500">{formErrors.password}</p>
              )}
            </div>

            {/* Company */}
            <div>
              <label className="text-sm font-medium block mb-1">Company</label>
              <Input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={formErrors.company ? "border-red-500" : ""}
              />
              {formErrors.company && (
                <p className="text-sm text-red-500">{formErrors.company}</p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full"
            >
              {loading ? "Creating..." : "Create Account"}
            </Button>

            {/* API Error */}
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
          </form>

          {/* Social Auth */}
          <div className="text-center text-sm text-gray-500">
            <div className="flex items-center gap-2 mt-6">
              <div className="flex-grow border-t" />
              <span className="text-xs">Or sign up with</span>
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

      {/* Right: Welcome Section */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-[#0f172a] text-white p-10">
        <div className="max-w-md space-y-6">
          <h2 className="text-3xl font-bold">Welcome to our community</h2>
          <p className="text-sm text-gray-300">
            Join thousands of developers building modern, scalable applications.
            We help you organize, code, and deploy with confidence.
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
            <p className="text-sm text-gray-300 ml-2">
              17k+ developers joined us — you’re next!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
