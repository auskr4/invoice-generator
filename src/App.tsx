import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./contexts/AuthContext";
import { InvoiceProvider } from "./contexts/InvoiceContext";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import Dashboard from "./components/Dashboard";
import InvoiceForm from "./components/InvoiceForm";
import InvoicePreview from "./components/InvoicePreview";
import ManageInvoices from "./components/ManageInvoices";
import AccountSettings from "./components/AccountSettings";
import Layout from "./components/Layout";
import "./index.css";

function App() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-sans min-h-screen bg-gray-100">
      <InvoiceProvider>
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
            <Route path="preview-invoice" element={<InvoicePreview />} />
            <Route path="manage-invoices" element={<ManageInvoices />} />
            <Route path="account-settings" element={<AccountSettings />} />
          </Route>
        </Routes>
      </InvoiceProvider>
    </div>
  );
}

export default App;