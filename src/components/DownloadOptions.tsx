import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { useInvoiceContext } from "../contexts/InvoiceContext";
import { generateAndDownloadPDF } from "@/utils/pdfUtils";
import { clear } from "console";

const DownloadOptions: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { invoiceData, clearInvoiceData } = useInvoiceContext();

  const handleDownloadPDF = async () => {
    console.log('clicked')
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
    if (!invoiceData) {
      setErrorMessage("No invoice data found. Please create a new invoice.");
      console.error(errorMessage);
      setIsLoading(false);
      return;
    }
    try {
      await generateAndDownloadPDF(invoiceData);
      setSuccessMessage('PDF downloaded successfully');
      console.log(successMessage);
      clearInvoiceData();
      console.log('invoiceData cleared', invoiceData)
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage('Failed to download PDF. Please try again.');
      console.error("Error generating PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendEmail = () => {
    // Implement email sending logic here
    console.log("Sending email...");
  };

  const handleEditInvoice = () => {
    navigate("/create-invoice");
  };

  return (
    <div className="p-6">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>
            Invoice Created! <br /> Download Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleDownloadPDF} className="w-full">
            Download as PDF
          </Button>
          <Button onClick={handleSendEmail} className="w-full">
            Send via Email
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DownloadOptions;
