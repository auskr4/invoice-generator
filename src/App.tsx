import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./contexts/AuthContext";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import Dashboard from "./components/Dashboard";
import InvoiceForm from "./components/InvoiceForm";
import ManageInvoices from "./components/ManageInvoices";
import AccountSettings from "./components/AccountSettings";
import Layout from "./components/Layout";
import { PDFViewer } from '@react-pdf/renderer';
import PDFInvoice from "./components/PDFInvoice";
import "./index.css";
import { InvoiceData } from "@/types/invoice";

function App() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  const invoiceData: InvoiceData = {
    title: "Invoice",
    invoiceNumber: '1024',
    invoiceDate: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
    terms: "Due within 30 days",
    fromName: "Avery Davis",
    fromEmail: "avery@example.com",
    fromAddress: "456 Business Ave., Work City",
    fromPhone: "987-654-3210",
    toName: "Really Great Company",
    toEmail: "contact@reallygreatcompany.com",
    toAddress: "123 Anywhere St., Any City",
    toPhone: "123-456-7890",
    bankName: "Really Great Bank",
    accountName: "John Smith",
    bsb: "000-000",
    accountNumber: "0000 0000",
    lineItems: [
      { description: "Content Plan", quantity: 4, price: 50, amount: 200 },
      { description: "Copy Writing", quantity: 2, price: 50, amount: 100 },
      { description: "Website Design", quantity: 5, price: 50, amount: 250 },
      { description: "Website Development", quantity: 5, price: 100, amount: 500 },
      { description: "SEO", quantity: 4, price: 50, amount: 200 },
    ],
    subTotal: 1250,
    taxRate: 10,
    taxAmount: 125,
    discountPercentage: 30,
    discountAmount: 375,
    total: 1000,
  };

  return (
    <div className="font-sans min-h-screen bg-gray-100">
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <LandingPage />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/dashboard" /> : <SignUpPage />}
        />
        <Route
          path="/"
          element={user ? <Layout /> : <Navigate to="/login" />}
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create-invoice" element={<InvoiceForm />} />
          <Route path="manage-invoices" element={<ManageInvoices />} />
          <Route path="account-settings" element={<AccountSettings />} />
          <Route path="preview-invoice" element={
            <div style={{ width: '100%', height: '100vh' }}>
              <PDFViewer width="100%" height="100%">
                <PDFInvoice invoiceData={invoiceData}/>
              </PDFViewer>
            </div>
          } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;