// LoginForm.jsx
import React, { useState } from "react";
import { Mail, Lock } from "lucide-react"; // optional icons

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(formData);
  
      try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        setLoading(true);
        const data = await response.json();
        console.log("server Response", data);
  
        if (response.ok) {
          console.log(data);
  
          toast.success(data.message);
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.user);
          localStorage.setItem("role", data.role);
          
          // if (data.role === "admin") {
          //   toast.success("You are an admin");
          //   navigate("/admin");
          // } else {
          //   navigate("/");
          // }
          dispatch(
            login({
              token: data.token,
              userid: data.user,
            })
          );
  
          // ✅ Navigate based on user role
         
        } else {
          toast.error(data.message || "Invalid email or password");
        }
  
        // navigate("/");
      } catch (e) {
        console.log(e.message);
        toast.error(e.message || "Failed to register. Please try again.");
      }
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-100 via-white to-blue-100 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md transform transition-all duration-300">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800">Welcome Back</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="relative">
            <label className="text-gray-600 font-medium">Email</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 mt-1 focus-within:ring-2 focus-within:ring-purple-400">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-2 py-2 outline-none bg-transparent"
                required
              />
            </div>
          </div>
          <div className="relative">
            <label className="text-gray-600 font-medium">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 mt-1 focus-within:ring-2 focus-within:ring-purple-400">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-2 py-2 outline-none bg-transparent"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-200"
          >
            Log In
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="#" className="text-purple-600 hover:underline">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
