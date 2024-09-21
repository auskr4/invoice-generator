import React from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "../contexts/AuthContext";
import {
  Cog8ToothIcon,
  HomeIcon,
  DocumentCurrencyDollarIcon,
  ArrowLeftStartOnRectangleIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";

const Layout: React.FC = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const isSelected = (path: string) => {
    return location.pathname === path;
  };

  const getButtonClasses = (path: string) => {
    return `w-full justify-start ${
      isSelected(path)
        ? "bg-indigo-200 text-indigo-500 border border-gray-200 shadow-sm"
        : "hover:bg-indigo-200"
    }`;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Side Navigation */}
      <nav className="w-60 bg-gray-100 py-4 pl-4">
        <div className="flex items-center gap-x-2 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-black to-indigo-400 rounded"></div>
          <h1 className="text-lg font-bold">Invoice Generator</h1>
        </div>
        <div className="space-y-2 text-zinc-500">
          <Button
            onClick={() => navigate("/dashboard")}
            className={`${getButtonClasses("/dashboard")} gap-x-2`}
            variant="ghost"
          >
            <HomeIcon className="size-4" />
            Home
          </Button>
          <Button
            onClick={() => navigate("/manage-invoices")}
            className={`${getButtonClasses("/manage-invoices")} gap-x-2`}
            variant="ghost"
          >
            <DocumentCurrencyDollarIcon className="size-5" />
            Invoices
          </Button>
          <Button
            onClick={() => navigate("/account-settings")}
            className={`${getButtonClasses("/account-settings")} gap-x-2`}
            variant="ghost"
          >
            <Cog8ToothIcon className="size-5" />
            Account Settings
          </Button>
          <Button
            onClick={logout}
            className="w-full justify-start hover:bg-indigo-200 gap-x-2"
            variant="ghost"
          >
            <ArrowLeftStartOnRectangleIcon className="size-5" />
            Logout
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4 pt-4 relative">
        {location.pathname !== '/dashboard' && (
          <Button
            onClick={() => navigate('/dashboard')}
            className="absolute -left-4 top-1/3 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-400 rounded-full p-2"
            variant="ghost"
          >
            <ArrowUturnLeftIcon className="h-6 w-6 text-gray-600" />
          </Button>
        )}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;