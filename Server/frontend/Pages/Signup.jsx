// SignupForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
const apiUrl = import.meta.env.VITE_BASE_URL // Replace with your actual API URL
console.log(apiUrl);


import { toast } from "react-toastify";
const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Check for empty fields
      if (!formData.name || !formData.email || !formData.password) {
        toast.error("Please fill all the fields");
        return;
      }

      // ✅ Axios POST request
      const response = await fetch(`${apiUrl}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("server response", data);
        toast.success("Account created successfully");
        setFormData({
          name: "",
          email: "",
          password: "",
        });

        navigate("/login");
       
      } else {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        toast.error(errorText); // Shows what the server actually returned
      }
    } catch (err) {
      console.error("Signup error:", err);
      const message =
        err.response?.data?.message || "An error occurred while signing up";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-white to-purple-100 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md transform transition-all duration-300">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
          Sign Up
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="relative">
            <label className="text-gray-600 font-medium">Full Name</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 mt-1 focus-within:ring-2 focus-within:ring-blue-400">
              <User className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe (spaces are not allowed)"
                className="w-full px-2 py-2 outline-none bg-transparent"
                required
              />
            </div>
          </div>
          <div className="relative">
            <label className="text-gray-600 font-medium">Email</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 mt-1 focus-within:ring-2 focus-within:ring-blue-400">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-2 py-2 outline-none bg-transparent"
                required
              />
            </div>
          </div>
          <div className="relative">
            <label className="text-gray-600 font-medium">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 mt-1 focus-within:ring-2 focus-within:ring-blue-400">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-2 py-2 outline-none bg-transparent"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200"
          >
            Create Account
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};
export default SignupForm;
