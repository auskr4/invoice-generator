import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuthContext } from "../contexts/AuthContext";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

const Dashboard: React.FC = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  console.log('user', user);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-full border border-zinc-200">
      <div className="mb-6">
        <h2 className="text-sm font-serif">Welcome, {user?.email || 'User'}</h2>
      </div>
      <div>
        <Button 
          onClick={() => navigate('/create-invoice')} 
          className="w-full md:w-auto text-3xl font-serif"
          variant={'ghost'}
        >
          To create a new invoice, click here <ArrowUpRightIcon className="text-green-600 w-8 h-8 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;