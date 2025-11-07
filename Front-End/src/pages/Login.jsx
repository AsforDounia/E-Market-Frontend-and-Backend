import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../hooks/useAuth";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import LogoWithText from "../components/common/LogoWithText";

// Validation schema
const loginSchema = yup.object().shape({
  email: yup.string().email("Email invalide").required("Email requis"),
  password: yup
    .string()
    .min(6, "Minimum 6 caractères")
    .required("Mot de passe requis"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };


  const switchTab = (tab) => {
    if (tab === "register") {
      navigate("/register");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full grid md:grid-cols-2 min-h-[600px]">
        {/* Sidebar */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-12 text-white flex flex-col justify-center hidden md:flex">
          <LogoWithText />

          <h2 className="text-3xl font-bold my-4 leading-tight">
            Bienvenue sur votre marketplace préférée
          </h2>
          <p className="text-blue-100 mb-10 leading-relaxed">
            Achetez et vendez en toute sécurité. Des milliers de produits vous
            attendent.
          </p>

          <div className="space-y-4">
            {[
              "Paiement 100% sécurisé",
              "Livraison rapide",
              "Support client 24/7",
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-white/25 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">✓</span>
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <div className="p-12 max-h-[90vh] overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Connexion</h1>
            <p className="text-gray-600 text-sm">
              Accédez à votre compte E-Market
            </p>
          </div>

          <div className="flex flex-col justify-center">
            {/* Tab Switcher */}
            <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setActiveTab("login")}
                className={`flex-1 py-3 px-4 rounded-md font-semibold text-sm transition-all ${
                  activeTab === "login"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Connexion
              </button>
              <button
                type="button"
                onClick={() => switchTab("register")}
                className={`flex-1 py-3 px-4 rounded-md font-semibold text-sm transition-all ${
                  activeTab === "register"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Inscription
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  placeholder="votre@email.com"
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-all focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    {...register("password")}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 border-2 rounded-lg transition-all focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                      errors.password
                        ? "border-red-500"
                        : "border-gray-200 focus:border-blue-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible className="w-5 h-5" />
                    ) : (
                      <AiOutlineEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm font-semibold text-blue-600 hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3.5 rounded-lg font-semibold hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? "Connexion..." : "Se connecter"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
