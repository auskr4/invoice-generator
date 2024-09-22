import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Main content */}
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
                  Click below to generate invoices as a guest user or log in to the right.
                </p>
                <Button
                  onClick={() => navigate("/create-invoice")}
                  className="bg-indigo-400 text-white hover:bg-indigo-100 hover:text-indigo-400"
                >
                  Generate Invoices Now <ArrowUpRightIcon className=" text-white w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Right side - Login Form */}
              <div className="md:w-1/2 p-8">
                <div>
                  <CardHeader>
                    <CardTitle>Log In to Your Account</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form
                      onSubmit={(e) => e.preventDefault()}
                      className="space-y-4"
                    >
                      <div>
                        <Input type="email" placeholder="Email" />
                      </div>
                      <div>
                        <Input type="password" placeholder="Password" />
                      </div>
                      <Button type="submit" className="w-full">
                        Log In
                      </Button>
                    </form>
                    <p className="text-center mt-4 text-sm text-gray-600">
                      Don't have an account but want one?{" "}
                      <a
                        href="/signup"
                        className="text-indigo-600 hover:underline"
                      >
                        Sign up
                      </a>
                    </p>
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