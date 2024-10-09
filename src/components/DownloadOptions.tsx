import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { useInvoiceContext } from "../contexts/InvoiceContext";

const DownloadOptions: React.FC = () => {
  const navigate = useNavigate();
  const { invoiceData } = useInvoiceContext();

  const handleDownloadPDF = () => {
    // Implement PDF download logic here
    console.log("PDF downloaded");
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
          <Button onClick={handleDownloadPDF} className="w-full" disabled={!invoiceData}>
            Download as PDF
          </Button>
          <Button onClick={handleSendEmail} className="w-full" disabled={!invoiceData}>
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
