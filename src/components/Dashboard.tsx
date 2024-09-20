import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuthContext } from "../contexts/AuthContext";

const Dashboard: React.FC = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Welcome, {user?.email || 'User'}</h2>
      </div>
      <div>
        <Button 
          onClick={() => navigate('/create-invoice')} 
          className="w-full md:w-auto"
        >
          Create new invoice
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;