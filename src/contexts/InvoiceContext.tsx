import React, { createContext, useState, useContext } from 'react';
import { InvoiceData } from '@/types/invoice';

interface InvoiceContextType {
  invoiceData: InvoiceData | null;
  setInvoiceData: React.Dispatch<React.SetStateAction<InvoiceData | null>>;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const InvoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);

  return (
    <InvoiceContext.Provider value={{ invoiceData, setInvoiceData }}>
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