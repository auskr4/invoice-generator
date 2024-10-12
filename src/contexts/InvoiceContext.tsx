import React, { createContext, useState, useContext } from 'react';
import { InvoiceData } from '@/types/invoice';

interface InvoiceContextType {
  invoiceData: InvoiceData | null;
  setInvoiceData: React.Dispatch<React.SetStateAction<InvoiceData | null>>;
  invoiceId: string | null;
  setInvoiceId: React.Dispatch<React.SetStateAction<string | null>>;
  invoiceStatus: 'draft' | 'accepted' | 'finalized' | null;
  setInvoiceStatus: React.Dispatch<React.SetStateAction<'draft' | 'accepted' | 'finalized' | null>>;
  clearInvoiceData: () => void;  // New function type added
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const InvoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [invoiceId, setInvoiceId] = useState<string | null>(null);
  const [invoiceStatus, setInvoiceStatus] = useState<'draft' | 'accepted' | 'finalized' | null>(null);

  // New function to clear all invoice-related data
  const clearInvoiceData = () => {
    setInvoiceData(null);
    setInvoiceId(null);
    setInvoiceStatus(null);
  };

  return (
    <InvoiceContext.Provider value={{ 
      invoiceData, 
      setInvoiceData, 
      invoiceId, 
      setInvoiceId, 
      invoiceStatus, 
      setInvoiceStatus,
      clearInvoiceData  // New function added to the context value
    }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoiceContext = () => {
  const context = useContext(InvoiceContext);
  if (context === undefined) {
    throw new Error('useInvoiceContext must be used within an InvoiceProvider');
  }
  return context;
};