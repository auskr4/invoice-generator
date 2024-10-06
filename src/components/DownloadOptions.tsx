import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { useInvoiceContext } from "../contexts/InvoiceContext";
import { useAuthContext } from '../contexts/AuthContext';

const DownloadOptions: React.FC = () => {
  const navigate = useNavigate();
  const { invoiceData } = useInvoiceContext();
  const { user } = useAuthContext();
  const [isSaving, setIsSaving] = useState(false);

  console.log('invoiceData', invoiceData);

  const saveInvoice = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/invoices/create',
        invoiceData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Invoice saved:', response.data);
      // You can add a success notification here if needed
    } catch (error) {
      console.error('Error saving invoice:', error);
      // You can add an error notification here if needed
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadPDF = async () => {
    await saveInvoice();
    // Implement PDF download logic here
    console.log("Downloading PDF...");
  };

  const handleSendEmail = () => {
    // Implement email sending logic here
    console.log("Sending email...");
  };

  const handleEditInvoice = () => {
    navigate('/create-invoice');
  };

  return (
    <div className="p-6">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Download Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleDownloadPDF} className="w-full" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Download as PDF'}
          </Button>
          <Button onClick={handleSendEmail} className="w-full">
            Send via Email
          </Button>
          <Button onClick={handleEditInvoice} variant="outline" className="w-full">
            Edit Invoice
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DownloadOptions;
