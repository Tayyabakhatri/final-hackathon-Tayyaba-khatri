import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import { toast } from "react-toastify";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

//Data validation using Formik and yup
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "username must be at least 3 characters")
    .max(20, "username cannot be exceed 20 characters!")
    .required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Password can only contain letters")
    .matches(/[0-9]/, "Password must contain at least one number"),
  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "")
    .email("email is requred (abc123@gmail.com)")
    .required("Required"),
});

//embading links from .env file of frontend
const apiUrl = import.meta.env.VITE_BASE_URL;
console.log(apiUrl);

//functions to handle form submission and data validation
const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-white to-purple-100 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md transform transition-all duration-300">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
          Sign Up
        </h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              //Check for empty fields
              if (!values.name || !values.email || !values.password) {
                toast.error("Please fill all the fields");
                return;
              }
              //Check for spaces in name
              const response = await fetch(`${apiUrl}/api/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
              });

              if (response.ok) {
                const data = await response.json();
                console.log("server response", data);
                toast.success("Account created successfully");
                resetForm();

                navigate("/login");
              } else {
                const errorText = await response.text();
                console.error("Error response:", errorText);
                toast.error(errorText); // Shows what the server actually returned
              }
            } catch (err) {
              console.error("Signup error:", err);
              const message =
                err.response?.data?.message ||
                "An error occurred while signing up";
              toast.error(message);
            }
          }}
        >
          <Form>
            <label className="text-gray-600 font-medium">Full Name</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 mt-1 focus-within:ring-2 focus-within:ring-blue-400">
              <User className="w-5 h-5 text-gray-400" />
              <Field
                name="name"
                type="text"
                className="w-full px-2 py-2 outline-none bg-transparent"
                placeholder="John Doe (spaces are not allowed)"
                required
              />
            </div>
            <ErrorMessage
              name="name"
              component="p"
              className="text-red-500 text-sm"
            />

            <label className="text-gray-600 font-medium">Email</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 mt-1 focus-within:ring-2 focus-within:ring-blue-400">
              <Mail className="w-5 h-5 text-gray-400" />
              <Field
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full px-2 py-2 outline-none bg-transparent"
                required
              />
            </div>
            <ErrorMessage
              name="email"
              component="p"
              className="text-red-500 text-sm"
            />

            <label className="text-gray-600 font-medium">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 mt-1 focus-within:ring-2 focus-within:ring-blue-400">
              <Lock className="w-5 h-5 text-gray-400" />
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="w-full px-2 py-2 outline-none bg-transparent"
                required
              />
              <div onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </div>
            </div>
            <ErrorMessage
              name="password"
              component="p"
              className="text-red-500 text-sm"
            />

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200"
            >
              Create Account
            </button>
            <p className="text-sm text-center text-gray-600 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Log in{" "}
              </Link>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
export default SignupForm;
