import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../hooks/useAuth";
import Logo from "../assets/images/e-market-logo.jpeg"
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { HiShoppingBag } from "react-icons/hi";
import { FaStore } from "react-icons/fa";
import LogoWithText from "../components/common/LogoWithText";

// Validation schema
const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Nom complet requis (min. 2 caractères)")
    .required("Nom complet requis"),
  email: yup.string().email("Email invalide").required("Email requis"),
  password: yup
    .string()
    .min(8, "8 caractères minimum")
    .required("Mot de passe requis"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Les mots de passe ne correspondent pas")
    .required("Confirmation du mot de passe requise"),
  role: yup
    .string()
    .oneOf(["user", "seller"], "Rôle invalide")
    .required("Rôle requis"),
  acceptTerms: yup
    .boolean()
    .oneOf([true], "Vous devez accepter les conditions")
    .required("Vous devez accepter les conditions"),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("register");
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      role: "user",
      acceptTerms: false,
    },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data) => {
    try {
      const { acceptTerms, confirmPassword, ...registerData } = data;
      await registerUser(registerData);
      navigate("/");
    } catch (error) {
      console.error("Register error:", error);
    }
  };

  const switchTab = (tab) => {
    if (tab === "login") {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full grid md:grid-cols-2 min-h-[600px]">
        {/* Sidebar */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-12 text-white flex flex-col justify-center hidden md:flex">
          <LogoWithText />

          <h2 className="text-3xl font-bold my-4 leading-tight">
            Rejoignez notre communauté
          </h2>
          <p className="text-blue-100 mb-10 leading-relaxed">
            Créez votre compte et découvrez un monde de possibilités.
          </p>

          <div className="space-y-4">
            {[
              "Inscription gratuite et rapide",
              "Accès à des milliers de produits",
              "Vendez vos propres articles",
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

        {/* Register Form */}
        <div className="p-12 max-h-[80vh] overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Inscription
            </h1>
            <p className="text-gray-600 text-sm">Créez votre compte E-Market</p>
          </div>
          <div className="flex flex-col justify-center">
            {/* Tab Switcher */}
            <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => switchTab("login")}
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
                onClick={() => setActiveTab("register")}
                className={`flex-1 py-3 px-4 rounded-md font-semibold text-sm transition-all ${
                  activeTab === "register"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Inscription
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Role Selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Je souhaite
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="relative cursor-pointer">
                    <input
                      type="radio"
                      value="user"
                      {...register("role")}
                      className="sr-only"
                    />
                    <div
                      className={`flex flex-col items-center p-4 border-2 rounded-lg transition-all ${
                        selectedRole === "user"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                          selectedRole === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        <AiOutlineShoppingCart className="w-6 h-6" />
                      </div>
                      <span className="font-semibold text-sm">Acheter</span>
                    </div>
                  </label>

                  <label className="relative cursor-pointer">
                    <input
                      type="radio"
                      value="seller"
                      {...register("role")}
                      className="sr-only"
                    />
                    <div
                      className={`flex flex-col items-center p-4 border-2 rounded-lg transition-all ${
                        selectedRole === "seller"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                          selectedRole === "seller"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        <FaStore className="w-6 h-6" />
                      </div>
                      <span className="font-semibold text-sm">Vendre</span>
                    </div>
                  </label>
                </div>
                {errors.role && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.role.message}
                  </p>
                )}
              </div>

              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  placeholder="Jean Dupont"
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-all focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                    errors.name
                      ? "border-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.name.message}
                  </p>
                )}
              </div>

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

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    {...register("confirmPassword")}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 border-2 rounded-lg transition-all focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-200 focus:border-blue-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible className="w-5 h-5" />
                    ) : (
                      <AiOutlineEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3.5 rounded-lg font-semibold hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? "Création..." : "Créer mon compte"}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;