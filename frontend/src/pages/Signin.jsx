import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userDataContext } from "../context/UserContext";

function Signin() {
  const navigate = useNavigate();
  const { serverUrl, setUserData } = useContext(userDataContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/signin`,
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );
      setUserData(res.data);
      if (res.status === 200) {
        alert("Login successful! 🎉");
        setFormData({ email: "", password: "" });
        navigate("/");
      }
    } catch (error) {
      setUserData(null);
      if (error.response) {
        alert(error.response.data.message || "Signin failed!");
      } else {
        alert("Something went wrong. Please try again!");
      }
    }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex justify-center items-center relative p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 flex flex-col gap-6 shadow-2xl"
      >
        {/* Header */}
        <div className="text-center mb-2">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
          >
            <User className="text-white" size={28} />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2"
          >
            Welcome Back
          </motion.h2>
          <p className="text-gray-300 text-sm">
            Login to continue your journey 🌟
          </p>
        </div>

        {/* Email Field */}
        <div className="relative group">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors">
            <Mail size={20} />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full pl-12 pr-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Email Address"
          />
        </div>

        {/* Password Field */}
        <div className="relative group">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors">
            <Lock size={20} />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full pl-12 pr-12 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Password"
          />
          <button
            type="button"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
            <input type="checkbox" className="rounded bg-gray-600 border-gray-500 text-blue-500 focus:ring-blue-500" />
            Remember me
          </label>
          <button type="button" className="text-blue-400 hover:text-blue-300 transition-colors">
            Forgot password?
          </button>
        </div>

        {/* Login Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
            loading ? "opacity-50 cursor-not-allowed" : "shadow-lg hover:shadow-blue-500/25"
          }`}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight size={18} />
            </>
          )}
        </motion.button>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative bg-gray-800 px-4 text-sm text-gray-400">or</div>
        </div>

        {/* Navigate to Signup */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-blue-400 hover:text-blue-300 font-semibold transition-colors hover:underline"
              onClick={() => navigate("/signup")}
            >
              Sign up here
            </button>
          </p>
        </div>

        {/* Quick Stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-gray-700/30 rounded-xl border border-gray-600/50"
        >
          <div className="grid grid-cols-3 gap-4 text-center text-xs">
            <div>
              <div className="text-blue-400 font-bold text-lg">10K+</div>
              <div className="text-gray-400">Users</div>
            </div>
            <div>
              <div className="text-purple-400 font-bold text-lg">99%</div>
              <div className="text-gray-400">Uptime</div>
            </div>
            <div>
              <div className="text-green-400 font-bold text-lg">24/7</div>
              <div className="text-gray-400">Support</div>
            </div>
          </div>
        </motion.div>
      </motion.form>
    </div>
  );
}

export default Signin;