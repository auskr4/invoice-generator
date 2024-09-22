import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRightIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useAuthContext } from "../contexts/AuthContext";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during login"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const accountBenefits = [
    "Access invoice history",
    "Reprint anytime",
    "Access more templates",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white bg-opacity-50 rounded-3xl p-2">
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="md:flex">
              {/* Left side - Generate Invoices */}
              <div className="md:w-1/2 p-8 bg-white border-r">
                <div className="flex items-center gap-x-2 mb-12">
                  <div className="w-10 h-10 bg-gradient-to-br from-black to-indigo-400 rounded"></div>
                  <h1 className="text-2xl font-bold">Invoice Generator</h1>
                </div>
                <h2 className="text-3xl font-semibold mb-4 text-mono">
                  Create Professional Invoices in Minutes
                </h2>
                <p className="text-sm text-gray-500 mb-8">
                  Click below to generate invoices as a guest user or log in to
                  the right.
                </p>
                <Button
                  onClick={() => navigate("/create-invoice")}
                  className="w-full bg-indigo-400 text-white hover:bg-indigo-100 hover:text-indigo-400"
                >
                  Generate Invoice as Guest Now{" "}
                  <ArrowUpRightIcon className="text-white w-4 h-4 ml-2" />
                </Button>

                {/* New divider */}
                <div className="flex items-center my-8">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-4 text-gray-500">Or</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* New benefits list */}
                <div className="bg-indigo-100 rounded-lg p-2 mb-6">
                  <div className="bg-indigo-50 rounded-lg px-2 py-4">
                    <h3 className="text-lg font-semibold text-indigo-600 mb-3">
                      Create an account to:
                    </h3>
                    <ul className="space-y-3">
                      {accountBenefits.map((benefit, index) => (
                        <li
                          key={index}
                          className="flex items-center text-indigo-800"
                        >
                          <CheckCircleIcon className="h-5 w-5 text-indigo-500 mr-2" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sign Up button */}
                <Button
                  onClick={() => navigate("/signup")}
                  className="w-full bg-teal-500 text-white hover:bg-teal-100 hover:text-teal-500"
                >
                  Sign Up for an Account
                </Button>
              </div>

              {/* Right side - Login Form */}
              <div className="md:w-1/2 p-8">
                <div>
                  <CardHeader>
                    <CardTitle>Log In to Your Account</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Input
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Input
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      {error && <p className="text-red-500 mt-2">{error}</p>}
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? "Logging In..." : "Log In"}
                      </Button>
                    </form>
                    {/* <p className="text-center mt-4 text-sm text-gray-600">
                      Don't have an account but want to?{" "}
                      <a
                        href="/signup"
                        className="text-indigo-600 hover:underline"
                      >
                        Sign up
                      </a>
                    </p> */}
                  </CardContent>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
