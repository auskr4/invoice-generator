import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDownIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-white">
      <header className="bg-orange-50 container mx-auto px-4 py-4 flex justify-between items-center border-b border-gray-200 shadow-sm">
        <div className="w-1/4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-black to-indigo-400 rounded-lg mr-3"></div>
            <span className="text-xl font-bold font-mono">Invoice <br /> Generator</span>
          </div>
        </div>
        <nav className="w-1/2 flex justify-center">
          <ul className="flex space-x-2">
            <li>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-gray-600 hover:text-gray-900 flex items-center px-3 py-2 rounded-md hover:bg-indigo-100 transition duration-300">
                    Products
                    <ChevronDownIcon className="w-4 h-4 ml-1" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold">Invoice Generator</h3>
                      <p className="text-sm text-gray-600">Create professional invoices easily</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Expense Tracker</h3>
                      <p className="text-sm text-gray-600">Manage your business expenses</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Time Billing</h3>
                      <p className="text-sm text-gray-600">Track and bill your time efficiently</p>
                    </div>
                    <div>
                      <Link to="/products" className="flex items-center text-indigo-600 hover:text-indigo-800">
                        View all products
                        <ArrowUpRightIcon className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </li>
            <li>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-gray-600 hover:text-gray-900 flex items-center px-3 py-2 rounded-md hover:bg-indigo-100 transition duration-300">
                    FAQ
                    <ChevronDownIcon className="w-4 h-4 ml-1" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold">Mercury Raise</h3>
                      <p className="text-sm text-gray-600">Connecting startups with resources</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Meridian</h3>
                      <p className="text-sm text-gray-600">Tech magazine for innovators</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Blog</h3>
                      <p className="text-sm text-gray-600">Insights and guides for startups</p>
                    </div>
                    <div>
                      <Link to="/help" className="flex items-center text-indigo-600 hover:text-indigo-800">
                        Help center
                        <ArrowUpRightIcon className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </li>
            <li>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-gray-600 hover:text-gray-900 flex items-center px-3 py-2 rounded-md hover:bg-indigo-100 transition duration-300">
                    About
                    <ChevronDownIcon className="w-4 h-4 ml-1" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold">Our Story</h3>
                      <p className="text-sm text-gray-600">Learn about our journey</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Team</h3>
                      <p className="text-sm text-gray-600">Meet the people behind our product</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Careers</h3>
                      <p className="text-sm text-gray-600">Join our growing team</p>
                    </div>
                    <div>
                      <Link to="/about" className="flex items-center text-indigo-600 hover:text-indigo-800">
                        Learn more
                        <ArrowUpRightIcon className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </li>
            <li>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-gray-600 hover:text-gray-900 flex items-center px-3 py-2 rounded-md hover:bg-indigo-100 transition duration-300">
                    Pricing
                    <ChevronDownIcon className="w-4 h-4 ml-1" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold">Basic Plan</h3>
                      <p className="text-sm text-gray-600">Perfect for small businesses</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Pro Plan</h3>
                      <p className="text-sm text-gray-600">Advanced features for growing companies</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Enterprise</h3>
                      <p className="text-sm text-gray-600">Custom solutions for large organizations</p>
                    </div>
                    <div>
                      <Link to="/pricing" className="flex items-center text-indigo-600 hover:text-indigo-800">
                        View full pricing details
                        <ArrowUpRightIcon className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </li>
          </ul>
        </nav>
        <div className="w-1/4 flex justify-end items-center space-x-4">
          <Link to="/login" className="text-gray-600 hover:text-gray-900">Log In</Link>
          <Link to="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300">Sign Up</Link>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-20 text-center">
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition duration-300 flex items-center justify-center mx-auto mb-8 shadow-md">
          Try now free
          <ArrowUpRightIcon className="w-5 h-5 ml-2" />
        </button>
        <h1 className="text-6xl font-bold mb-6 font-serif">
          Powerful invoicing.
          <br />
          Simplified finances.
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto font-serif">
          Create professional invoices in minutes with our sleek and easy-to-use
          invoice generator service. Streamline your billing process today.
        </p>
      </main>
    </div>
  );
};

export default LandingPage;