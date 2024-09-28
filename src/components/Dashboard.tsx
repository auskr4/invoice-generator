import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuthContext } from "../contexts/AuthContext";
import { ArrowUpRightIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Card, CardContent } from "@/components/ui/card";

// Fake data for recent invoices
const recentInvoices = [
  { id: 1, client: 'Acme Corp', amount: 1500, date: '2024-03-15', status: 'Paid' },
  { id: 2, client: 'TechStart', amount: 2300, date: '2024-03-10', status: 'Pending' },
  { id: 3, client: 'Global Industries', amount: 3750, date: '2024-03-05', status: 'Overdue' },
  { id: 4, client: 'Local Business', amount: 800, date: '2024-03-01', status: 'Paid' },
];

const Dashboard: React.FC = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-full border border-zinc-200">
      <div className="mb-6">
        <h2 className="text-sm font-serif">Welcome, {user?.email || 'User'}</h2>
      </div>
      <div className="mb-14">
        <Button 
          onClick={() => navigate('/create-invoice')} 
          className="w-full md:w-auto text-3xl font-serif"
          variant={'ghost'}
        >
          To create a new invoice, click here <ArrowUpRightIcon className="text-green-600 w-8 h-8 ml-2" />
        </Button>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 font-serif">Recent Invoices</h3>
        <div className="flex overflow-x-auto pb-4 space-x-4">
          {recentInvoices.map((invoice) => (
            <Card key={invoice.id} className="flex-shrink-0 w-64 shadow-sm">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2 border-b pb-2">
                  <span className="font-medium">{invoice.client}</span>
                  <span className={`text-sm px-2 py-1 rounded ${
                    invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                    invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {invoice.status}
                  </span>
                </div>
                <div className="text-2xl font-bold mb-2">${invoice.amount}</div>
                <div className="text-sm text-gray-500 mb-4">{invoice.date}</div>
                <Button
                  onClick={() => navigate(`/invoice/${invoice.id}`)}
                  variant="outline"
                  className="w-full"
                >
                  View Details <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;