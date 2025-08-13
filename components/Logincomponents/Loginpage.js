"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import Backgroundimage from "@/public/Loginasset/imagebackground.png";
import Logo from "@/public/Loginasset/Logo.png";
import Logoname from "@/public/Loginasset/Logoname.png";
import Indivisual from "@/public/Loginasset/Indivisual.png";
import Bussiness from "@/public/Loginasset/Bussiness.png";
import themeimage from "@/public/Loginasset/themeimage.png";
import { motion } from "framer-motion";
import AccountTypeOption from "./AccountTypeOption";
import {
  Eye,
  Info,
  Store,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Globe,
  Lock,
} from "lucide-react";
import { Button } from "@heroui/react";
import { Vendorlogin, Createvendor } from "@/lib/API/Auth/Auth";
import { useToast } from "@/components/ui/toast-provider";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("login");
  const [selectedOption, setSelectedOption] = useState("individual");
  const [activeTab2, setActiveTab2] = useState("none");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [formData, setFormData] = useState({
    BussinessName: "",
    Vendorname: "",
    Email: "",
    Number: "",
    Password: "",
  });
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const handleLogin = async (e) => {
    setError(""); // Clear previous error

    // --- Validation ---
    if (!email || !password) {
      addToast({
        title: `Password and email are required`,
        description: `Password and email are required`,
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    if (!validateEmail(email)) {
      addToast({
        title: `Please enter a valid email address.`,
        description: `Please enter a valid email address.`,
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    setIsLoading(true);

    try {
      const data = { Email: email, Password: password };
      const result = await Vendorlogin(data);

      if (result && result.status) {
        Cookies.set("token", result?.token);
        Cookies.set("isCompanyVerified", result?.data?.isCompanyVerified);
        Cookies.set("usid", result?.data?._id);
        Cookies.set("nme", result?.data?.Vendorname);
        localStorage.setItem("navitems", JSON.stringify(result?.navitems));
         console.log(result?.navitems)
        addToast({
          title: `Login Successful`,
          description: `Login Successful`,
          variant: "success",
          duration: 5000,
        });
        router.push("/");
      } else {
        setError(result?.message || "Invalid email or password.");
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleswitch = (option) => {
    setActiveTab2(option);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "Number" ? value.replace(/\D/, "") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { BussinessName, Vendorname, Email, Number, Password } = formData;

    if (!termsAccepted) {
      addToast({
        title: "Please accept terms",
        description:
          "You must agree to the Terms & Conditions before proceeding.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    // Validation
    if (!Email || !Password) {
      addToast({
        title: "Password and email are required",
        description: "Password and email are required",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    if (!BussinessName || !Vendorname || !Number) {
      addToast({
        title: "All fields are required",
        description: "Please fill in all fields",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(Email)) {
      addToast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    if (Number.length !== 10) {
      addToast({
        title: "Invalid number",
        description: "Phone number must be 10 digits",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    if (Password.length < 6) {
      addToast({
        title: "Weak password",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await Createvendor({
        BussinessName,
        Vendorname,
        Email,
        Number,
        Password,
      });

      if (response.status) {
        addToast({
          title: "Success",
          description: "Vendor account created successfully!",
          variant: "success",
          duration: 5000,
        });
        setActiveTab("login");
        setFormData({
          BussinessName: "",
          Vendorname: "",
          Email: "",
          Number: "",
          Password: "",
        });
      } else {
        addToast({
          title: "Error",
          description: response.message || "Something went wrong.",
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (err) {
      console.log(err);
      addToast({
        title: "Request failed",
        description: "Failed to create vendor. Please try again later.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen  relative flex md:items-center md:justify-center items-start justify-start md:p-6 p-2  overflow-hidden bg-[#EDC5C5]"
      //   style={{
      //     backgroundImage: "url('/Loginasset/imagebackground.png')",
      //     backgroundSize: "cover",
      //     backgroundPosition: "center",
      //   }}
    >
      {/* <Image
        src={Backgroundimage}
        alt="backimage"
        className="absolute hidden md:block md:object-fill object-cover h-full w-full left-0 bottom-0 right-0 top-0"
      /> */}
      <div className="p-2 my-12 md:my-0 rounded-3xl shadow-2xl bg-white w-11/12 ">
        <div className="w-full bg-white h-full md:p-10 p-2  mx-auto  flex flex-col md:flex-row rounded-2xl   border-dashed border-2 border-[#EDC5C5]  z-10 ">
          <Card className="w-full hidden md:flex flex-col justify-between items-start gap-4 py-0 overflow-hidden md:pt-6 md:px-4  md:w-5/12 bg-[#106C83]  text-white rounded-tl-xl rounded-tr-xl  md:rounded-bl-xl">
            <div className=" h-full flex justify-between flex-col">
              <div className="flex items-start flex-col justify-items-start ">
                <div className="flex items-center gap-2">
                  <Image src={Logo} alt="logo" className="object-contain" />
                  <Image
                    src={Logoname}
                    alt="brand"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
            <Image
              src={themeimage}
              alt="themeimage"
              className="object-contain mt-auto h-60 w-full"
            />
          </Card>

          <Card className="w-full md:w-7/12 border-0 shadow-none bg-white p-4 md:px-12 md:py-10 rounded-bl-xl rounded-br-xl  md:rounded-tr-xl">
            <div className="w-full mx-auto">
              <div className="grid grid-cols-2  border-b border-gray-300 mb-4 w-full">
                <button
                  className={`pb-4 px-8 font-semibold cursor-pointer ${
                    activeTab === "login"
                      ? "text-[#106C83] border-b-2 border-[#106C83] -mb-px"
                      : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab("login")}
                >
                  Login
                </button>
                <button
                  className={`pb-4 px-8 font-semibold cursor-pointer ${
                    activeTab === "signup"
                      ? "text-[#106C83] border-b-2 border-[#106C83] -mb-px"
                      : "text-gray-400"
                  }`}
                  onClick={() => {
                    setActiveTab("signup"), setActiveTab2("none");
                  }}
                >
                  Sign Up
                </button>
              </div>

              {activeTab === "login" ? (
                <>
                  <h2 className="text-xl font-bold text-gray-800 mb-8">
                    Log in to your account.
                  </h2>

                  <motion.div
                    className=""
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray-700 mb-4">Fill your details</p>

                    <div className="mb-4">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Mail size={20} className="text-[#106C83]" />
                        </div>
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#106C83]"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Lock size={20} className="text-[#106C83]" />
                        </div>
                        <input
                          type="password"
                          placeholder="Enter Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#106C83]"
                        />
                      </div>
                    </div>
                    {error && (
                      <p className="mt-2 text-sm text-red-600 font-medium">
                        {error}
                      </p>
                    )}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="remember"
                          className="h-4 w-4  bg-[#106C83] text-[#106C83] focus:ring-[#106C83] border-gray-300 rounded"
                        />
                        <label
                          htmlFor="remember"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Keep me Logged In
                        </label>
                      </div>
                      <div></div>
                    </div>

                    <Button
                      onPress={handleLogin}
                      className="w-full cursor-pointer bg-[#106C83] text-white py-2 rounded-md font-medium hover:bg-[#086778] transition duration-200"
                    >
                      <span className={isLoading ? "loader" : "hidden"}></span>{" "}
                      {isLoading ? "" : "Login"}
                    </Button>

                    {/* <div className="my-2 flex items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>

                  <button className="w-full border border-gray-300 bg-white text-gray-700 py-2 rounded-md font-medium hover:bg-gray-50 transition duration-200 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2"
                    >
                      <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                        <path
                          fill="#4285F4"
                          d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                        />
                        <path
                          fill="#34A853"
                          d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                        />
                        <path
                          fill="#EA4335"
                          d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                        />
                      </g>
                    </svg>
                    Login with Google
                  </button> */}
                  </motion.div>
                </>
              ) : (
                <>
                  {activeTab2 === "none" && (
                    <div className="md:px-6  ">
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        key={activeTab}
                        className="space-y-4"
                      >
                        {/* <div>
                          <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                            I am...
                          </h2>
                          <p className="text-gray-600">
                            Choose who you are to proceed with registration.
                          </p>
                        </div> */}

                        {/* <div className="grid grid-cols-2 md:grid-cols-2 md:gap-6 gap-2 w-full">
                          <AccountTypeOption
                            id="individual"
                            title="An Individual"
                            imageSrc={Indivisual}
                            isSelected={selectedOption === "individual"}
                            onSelect={() => setSelectedOption("individual")}
                          />
                          <AccountTypeOption
                            id="business"
                            title="A Business Owner"
                            imageSrc={Bussiness}
                            isSelected={selectedOption === "business"}
                            onSelect={() => setSelectedOption("business")}
                          />
                        </div> */}

                        {/* <button
                          className="bg-[#106C83] w-full py-2 cursor-pointer px-6 rounded-xl text-white font-medium mt-6 animate-fade-in"
                          onClick={() => handleswitch(selectedOption)}
                        >
                          Confirm
                        </button> */}
                      </motion.div>
                    </div>
                  )}

                  {activeTab2 === "individual" && (
                    <motion.div
                      className="mb-4"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      key={activeTab2}
                    >
                      <h2 className="text-xl font-bold text-gray-800 mb-8">
                        Create your account.
                      </h2>
                      <p className="text-gray-700 mb-4">Fill your details</p>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <input
                            type="text"
                            placeholder="First Name"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#106C83]"
                          />
                        </div>

                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <input
                            type="text"
                            placeholder="Last Name"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#106C83]"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                          </div>
                          <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#106C83]"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <input
                            type="password"
                            placeholder="Create Password"
                            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#106C83]"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <Eye className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="terms"
                            className="h-4 w-4 text-[#106C83] focus:ring-[#106C83] border-gray-300 rounded"
                          />
                          <label
                            htmlFor="terms"
                            className="ml-2 block text-sm text-gray-700"
                          >
                            I agree to the{" "}
                            <Link
                              href="#"
                              className="text-[#106C83] hover:underline"
                            >
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                              href="#"
                              className="text-[#106C83] hover:underline"
                            >
                              Privacy Policy
                            </Link>
                          </label>
                        </div>
                      </div>

                      <button className="w-full bg-[#106C83] text-white py-3 rounded-md font-medium hover:bg-[#086778] transition duration-200">
                        Sign Up
                      </button>

                      <div className="my-6 flex items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-4 text-gray-500">or</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                      </div>

                      {/* <button className="w-full border border-gray-300 bg-white text-gray-700 py-3 rounded-md font-medium hover:bg-gray-50 transition duration-200 flex items-center justify-center">
                        <svg
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2"
                        >
                          <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                            <path
                              fill="#4285F4"
                              d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                            />
                            <path
                              fill="#34A853"
                              d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                            />
                            <path
                              fill="#EA4335"
                              d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                            />
                          </g>
                        </svg>
                        Sign Up with Google
                      </button> */}
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    key={activeTab2}
                    className="w-full mx-auto md:px-6"
                  >
                    <h1 className="text-xl font-bold  mb-2">
                      Create your account.
                    </h1>
                    <p className="text-gray-700 mb-6">Fill your details</p>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                      {/* Store Name */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Store className="h-5 w-5 text-[#106C83]" />
                        </div>
                        <input
                          type="text"
                          placeholder="Store Name"
                          name="BussinessName"
                          value={formData.BussinessName}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A7A8B]"
                        />
                      </div>

                      {/* Full Name */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <User className="h-5 w-5 text-[#106C83]" />
                        </div>
                        <input
                          type="text"
                          placeholder="Full Name"
                          name="Vendorname"
                          value={formData.Vendorname}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A7A8B]"
                        />
                      </div>

                      {/* Email Address */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Mail className="h-5 w-5 text-[#106C83]" />
                        </div>
                        <input
                          type="email"
                          placeholder="Email Address"
                          name="Email"
                          value={formData.Email}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A7A8B]"
                        />
                      </div>

                      {/* Phone Number */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Phone className="h-5 w-5 text-[#106C83]" />
                        </div>
                        <input
                          type="tel"
                          name="Number"
                          placeholder="Phone Number"
                          value={formData.Number}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A7A8B]"
                        />
                      </div>

                      {/* Store Address */}
                      {/* <div>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <MapPin className="h-5 w-5 text-[#106C83]" />
                            </div>
                            <input
                              type="text"
                              placeholder="Store Address"
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-t-md focus:outline-none focus:ring-2 focus:ring-[#0A7A8B]"
                            />
                          </div>

                          <div className="bg-gray-100 py-2 px-3 rounded-b-md border-t-0 border border-gray-300">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="shipping"
                                className="h-4 w-4 text-[#0A7A8B] focus:ring-[#0A7A8B] border-gray-300 rounded"
                              />
                              <label
                                htmlFor="shipping"
                                className="ml-2 block text-sm text-gray-700"
                              >
                                This is my shipping address
                              </label>
                            </div>
                          </div>
                        </div> */}

                      {/* GST Number */}
                      {/* <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <FileText className="h-5 w-5 text-[#106C83]" />
                          </div>
                          <input
                            type="text"
                            placeholder="GST Number"
                            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A7A8B]"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <Info className="h-5 w-5 text-[#106C83]" />
                          </div>
                        </div> */}

                      {/* Social/Website Link */}
                      {/* <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Globe className="h-5 w-5 text-[#106C83]" />
                          </div>
                          <input
                            type="url"
                            placeholder="Social/Website Link"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A7A8B]"
                          />
                        </div> */}

                      {/* Create Password */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Lock className="h-5 w-5 text-[#106C83]" />
                        </div>
                        <input
                          placeholder="Create Password"
                          name="Password"
                          type="password"
                          value={formData.Password}
                          onChange={handleChange}
                          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A7A8B]"
                        />
                      </div>

                      {/* Terms Checkbox */}
                      <div className="flex items-center mt-6">
                        <input
                          type="checkbox"
                          id="terms"
                          checked={termsAccepted}
                          onChange={(e) => setTermsAccepted(e.target.checked)}
                          className="h-4 w-4 text-[#0A7A8B] focus:ring-[#0A7A8B] border-gray-300 rounded"
                        />
                        <label
                          htmlFor="terms"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          I Agree the{" "}
                          <Link
                            href="#"
                            className="text-[#0A7A8B] hover:underline"
                          >
                            Terms & Conditions
                          </Link>
                        </label>
                      </div>

                      {/* Create Account Button */}
                      <Button
                        type="submit"
                        className="w-full bg-[#0A7A8B] text-white py-2 rounded-md font-medium hover:bg-[#086778] transition duration-200 mt-6"
                      >
                        {loading ? (
                          <span className="loader"></span>
                        ) : (
                          "Create Account"
                        )}
                      </Button>

                      {/* Divider */}
                      {/* <div className="my-2 flex items-center">
                          <div className="flex-grow border-t border-gray-300"></div>
                          <span className="mx-4 text-gray-500">or</span>
                          <div className="flex-grow border-t border-gray-300"></div>
                        </div> */}

                      {/* Google Sign Up */}
                      {/* <button
                          type="button"
                          className="w-full border border-gray-300 bg-white text-gray-700 py-2 rounded-md font-medium hover:bg-gray-50 transition duration-200 flex items-center justify-center"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2"
                          >
                            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                              <path
                                fill="#4285F4"
                                d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                              />
                              <path
                                fill="#34A853"
                                d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                              />
                              <path
                                fill="#FBBC05"
                                d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                              />
                              <path
                                fill="#EA4335"
                                d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                              />
                            </g>
                          </svg>
                          Sign Up with Google
                        </button> */}
                    </form>
                  </motion.div>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
