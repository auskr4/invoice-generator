import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

interface InvoiceData {
  customerName: string;
  customerEmail: string;
  amount: string;
  dueDate: string;
}

const InvoiceForm: React.FC = () => {
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    customerName: '',
    customerEmail: '',
    amount: '',
    dueDate: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvoiceData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement invoice generation logic
    console.log('Invoice data:', invoiceData);
    // Here you would typically send this data to your backend
    // After successful submission, you might want to navigate back to the dashboard or show a success message
    // navigate('/dashboard');
  };

  return (
    <div className="p-6">
      <Button onClick={() => navigate('/dashboard')} className="mb-4">
        Back to Dashboard
      </Button>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Create New Invoice</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                name="customerName"
                value={invoiceData.customerName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerEmail">Customer Email</Label>
              <Input
                id="customerEmail"
                name="customerEmail"
                type="email"
                value={invoiceData.customerEmail}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                value={invoiceData.amount}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                name="dueDate"
                type="date"
                value={invoiceData.dueDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Generate Invoice
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceForm;