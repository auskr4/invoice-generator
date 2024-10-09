import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import { LineItem, InvoiceData } from "@/types/invoice";
import { useInvoiceContext } from "../contexts/InvoiceContext";
import InvoicePreviewModal from "./InvoicePreviewModal";
import axios from 'axios';

// Sample Data
const sampleInvoiceData: InvoiceData = {
  title: "Sample Invoice",
  invoiceNumber: "INV-001",
  invoiceDate: new Date().toISOString().split('T')[0],
  terms: "Net 30",
  fromName: "Your Company Name",
  fromEmail: "your@email.com",
  fromAddress: "123 Your Street, Your City, Your Country",
  fromPhone: "+1 234 567 8900",
  toName: "Client Company",
  toEmail: "client@email.com",
  toAddress: "456 Client Street, Client City, Client Country",
  toPhone: "+1 987 654 3210",
  bankName: "Your Bank",
  accountName: "Your Account Name",
  bsb: "123456",
  accountNumber: "1234567890",
  lineItems: [
    { description: "Sample Product", quantity: 2, price: 100, amount: 200 },
    { description: "Sample Service", quantity: 1, price: 500, amount: 500 },
  ],
  subTotal: 700,
  taxRate: 10,
  taxAmount: 70,
  discountPercentage: 5,
  discountAmount: 35,
  total: 735,
};

const InvoiceForm: React.FC = () => {
  const navigate = useNavigate();
  const { invoiceData: contextInvoiceData, setInvoiceData: setContextInvoiceData } = useInvoiceContext();
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(contextInvoiceData || sampleInvoiceData
    
  //   {
  //   title: "",
  //   invoiceNumber: "",
  //   invoiceDate: new Date().toISOString().split('T')[0],
  //   terms: "",
  //   fromName: "",
  //   fromEmail: "",
  //   fromAddress: "",
  //   fromPhone: "",
  //   toName: "",
  //   toEmail: "",
  //   toAddress: "",
  //   toPhone: "",
  //   bankName: "",
  //   accountName: "",
  //   bsb: "",
  //   accountNumber: "",
  //   lineItems: [{ description: "", quantity: 1, price: 0, amount: 0 }],
  //   subTotal: 0,
  //   taxRate: 0,
  //   taxAmount: 0,
  //   discountPercentage: 0,
  //   discountAmount: 0,
  //   total: 0,
  // }
);
const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false); // New state for controlling modal visibility

  

  useEffect(() => {
    if (contextInvoiceData) {
      setInvoiceData(contextInvoiceData);
    }
  }, [contextInvoiceData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInvoiceData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLineItemChange = (
    index: number,
    field: keyof LineItem,
    value: string | number
  ) => {
    const newLineItems = [...invoiceData.lineItems];
    newLineItems[index] = { 
      ...newLineItems[index], 
      [field]: field === 'quantity' || field === 'price' ? Number(value) : value,
    };
    
    // Recalculate amount
    newLineItems[index].amount = newLineItems[index].quantity * newLineItems[index].price;
    
    setInvoiceData((prev) => ({ ...prev, lineItems: newLineItems }));
  };

  const addLineItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      lineItems: [
        ...prev.lineItems,
        { description: "", quantity: 1, price: 0, amount: 0 },
      ],
    }));
  };

  const removeLineItem = (index: number) => {
    setInvoiceData((prev) => ({
      ...prev,
      lineItems: prev.lineItems.filter((_, i) => i !== index),
    }));
  };

  const calculateTotals = () => {
    const subTotal = invoiceData.lineItems.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = subTotal * (invoiceData.taxRate / 100);
    const discountAmount = subTotal * (invoiceData.discountPercentage / 100);
    const total = subTotal + taxAmount - discountAmount;

    setInvoiceData((prev) => ({
      ...prev,
      subTotal,
      taxAmount,
      discountAmount,
      total,
    }));
  };

  useEffect(() => {
    calculateTotals();
  }, [invoiceData.lineItems, invoiceData.taxRate, invoiceData.discountPercentage]);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setContextInvoiceData(invoiceData);
  //   navigate("/preview-invoice");
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContextInvoiceData(invoiceData);
    setIsPreviewModalOpen(true); // Open the preview modal instead of navigating
  };

  const handleCloseModal = () => {
    setIsPreviewModalOpen(false);
  };

  const handleAcceptInvoice = async () => {
    setIsPreviewModalOpen(false);
    
    try {
      const token = localStorage.getItem('token');
      const formattedInvoiceData = {
        ...invoiceData,
        invoiceDate: new Date(invoiceData.invoiceDate || ''),
        // Add any other necessary transformations here
      };
      const response = await axios.post(
        'http://localhost:5000/api/invoices/create',
        formattedInvoiceData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Invoice saved:', response.data);
      // You can add a success notification here if needed
      navigate("/download-options");
    } catch (error) {
      console.error('Error saving invoice:', error);
      // You can add an error notification here if needed
    }
  };

  return (
    <div className="p-6">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="font-mono">Create New Invoice</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Invoice Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={invoiceData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="invoiceNumber">Invoice Number</Label>
                <Input
                  id="invoiceNumber"
                  name="invoiceNumber"
                  value={invoiceData.invoiceNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="invoiceDate">Invoice Date</Label>
                <Input
                  id="invoiceDate"
                  name="invoiceDate"
                  type="date"
                  value={invoiceData.invoiceDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="terms">Terms</Label>
                <Input
                  id="terms"
                  name="terms"
                  value={invoiceData.terms}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="font-semibold">From (Your Details)</h3>
                <div>
                  <Label htmlFor="fromName">Name</Label>
                  <Input
                    id="fromName"
                    name="fromName"
                    value={invoiceData.fromName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="fromEmail">Email</Label>
                  <Input
                    id="fromEmail"
                    name="fromEmail"
                    type="email"
                    value={invoiceData.fromEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="fromAddress">Address</Label>
                  <Textarea
                    id="fromAddress"
                    name="fromAddress"
                    value={invoiceData.fromAddress}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="fromPhone">Phone</Label>
                  <Input
                    id="fromPhone"
                    name="fromPhone"
                    value={invoiceData.fromPhone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">To (Client Details)</h3>
                <div>
                  <Label htmlFor="toName">Name</Label>
                  <Input
                    id="toName"
                    name="toName"
                    value={invoiceData.toName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="toEmail">Email</Label>
                  <Input
                    id="toEmail"
                    name="toEmail"
                    type="email"
                    value={invoiceData.toEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="toAddress">Address</Label>
                  <Textarea
                    id="toAddress"
                    name="toAddress"
                    value={invoiceData.toAddress}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="toPhone">Phone</Label>
                  <Input
                    id="toPhone"
                    name="toPhone"
                    value={invoiceData.toPhone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Bank Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input
                    id="bankName"
                    name="bankName"
                    value={invoiceData.bankName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="accountName">Account Name</Label>
                  <Input
                    id="accountName"
                    name="accountName"
                    value={invoiceData.accountName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="bsb">BSB</Label>
                  <Input
                    id="bsb"
                    name="bsb"
                    value={invoiceData.bsb}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    name="accountNumber"
                    value={invoiceData.accountNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Line Items</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Description</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoiceData.lineItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Input
                          placeholder="Enter item description"
                          value={item.description}
                          onChange={(e) =>
                            handleLineItemChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          placeholder="Qty"
                          value={item.quantity}
                          onChange={(e) =>
                            handleLineItemChange(
                              index,
                              "quantity",
                              Number(e.target.value)
                            )
                          }
                          required
                          min="1"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          placeholder="Price"
                          value={item.price}
                          onChange={(e) =>
                            handleLineItemChange(
                              index,
                              "price",
                              Number(e.target.value)
                            )
                          }
                          required
                          min="0"
                          step="0.01"
                        />
                      </TableCell>
                      <TableCell>
                        ${item.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          onClick={() => removeLineItem(index)}
                          variant="destructive"
                          size="sm"
                        >
                          <MinusIcon className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button
                type="button"
                onClick={addLineItem}
                variant="outline"
                className="mt-2"
              >
                <PlusIcon className="h-4 w-4 mr-2" /> Add Item
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${invoiceData.subTotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="taxRate">Tax Rate (%)</Label>
                <Input
                  id="taxRate"
                  name="taxRate"
                  type="number"
                  value={invoiceData.taxRate}
                  onChange={handleInputChange}
                  className="w-24"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
              <div className="flex justify-between">
                <span>Tax Amount:</span>
                <span>${invoiceData.taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="discountPercentage">Discount (%)</Label>
                <Input
                  id="discountPercentage"
                  name="discountPercentage"
                  type="number"
                  value={invoiceData.discountPercentage}
                  onChange={handleInputChange}
                  className="w-24"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
              <div className="flex justify-between">
                <span>Discount Amount:</span>
                <span>${invoiceData.discountAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${invoiceData.total.toFixed(2)}</span>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Preview Invoice
            </Button>
          </form>
        </CardContent>
      </Card>
      <InvoicePreviewModal
        isOpen={isPreviewModalOpen}
        onClose={handleCloseModal}
        onAccept={handleAcceptInvoice}
        invoiceData={invoiceData}
      />
    </div>
  );
};

export default InvoiceForm;