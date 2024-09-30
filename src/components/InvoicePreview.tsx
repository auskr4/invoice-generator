import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { PDFViewer } from '@react-pdf/renderer';
import PDFInvoice from "./PDFInvoice";
import EmailModal from "./emailModal";
import { downloadPDF } from "@/utils/pdfUtils";
import { useInvoiceContext } from "../contexts/InvoiceContext";
import api from '../api/api';

const InvoicePreview: React.FC = () => {
  const navigate = useNavigate();
  const { invoiceData } = useInvoiceContext();
  const [isEmailModalOpen, setIsEmailModalOpen] = React.useState(false);

  useEffect(() => {
    if (!invoiceData) {
      navigate('/create-invoice');
    }
  }, [invoiceData, navigate]);

  if (!invoiceData) {
    return null;
  }

  const handleEdit = () => {
    navigate('/create-invoice');
  };

  const handleDownload = () => {
    downloadPDF(invoiceData);
  };

  const handleEmailSend = async (recipientEmail: string) => {
    try {
      await api.post('/send-invoice', { invoiceData, recipientEmail });
      // Show success message
    } catch (error) {
      // Handle error
      console.error('Failed to send email:', error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl mb-4">
        <PDFViewer width="100%" height="600px">
          <PDFInvoice invoiceData={invoiceData} />
        </PDFViewer>
      </div>
      <div className="flex space-x-4">
        <Button onClick={handleEdit}>Edit Invoice</Button>
        <Button onClick={handleDownload}>Download PDF</Button>
        <Button onClick={() => setIsEmailModalOpen(true)}>Email Invoice</Button>
      </div>
      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        onSend={handleEmailSend}
      />
    </div>
  );
};

export default InvoicePreview;