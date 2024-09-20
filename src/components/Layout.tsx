import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuthContext } from "../contexts/AuthContext";

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
        ? 'bg-white border border-gray-200 shadow-sm'
        : 'hover:bg-gray-200'
    }`;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Side Navigation */}
      <nav className="w-64 bg-gray-100 p-4">
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 bg-black rounded mr-2"></div>
          <h1 className="text-xl font-bold">Invoice Generator</h1>
        </div>
        <div className="space-y-2">
          <Button 
            onClick={() => navigate('/dashboard')} 
            className={getButtonClasses('/dashboard')}
            variant="ghost"
          >
            Home
          </Button>
          <Button 
            onClick={() => navigate('/manage-invoices')} 
            className={getButtonClasses('/manage-invoices')}
            variant="ghost"
          >
            Invoices
          </Button>
          <Button 
            onClick={() => navigate('/account-settings')} 
            className={getButtonClasses('/account-settings')}
            variant="ghost"
          >
            Account Settings
          </Button>
          <Button 
            onClick={logout} 
            className="w-full justify-start hover:bg-gray-200"
            variant="ghost"
          >
            Logout
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;