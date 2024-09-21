import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusIcon, MinusIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

interface LineItem {
  description: string;
  quantity: number;
  price: number;
}

interface InvoiceData {
  title: string;
  fromName: string;
  fromEmail: string;
  fromAddress: string;
  fromPhone: string;
  toName: string;
  toEmail: string;
  toAddress: string;
  toPhone: string;
  invoiceNumber: string;
  invoiceDate: string;
  terms: string;
  lineItems: LineItem[];
  taxRate: number;
}

const InvoiceForm: React.FC = () => {
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    title: '',
    fromName: '',
    fromEmail: '',
    fromAddress: '',
    fromPhone: '',
    toName: '',
    toEmail: '',
    toAddress: '',
    toPhone: '',
    invoiceNumber: '',
    invoiceDate: '',
    terms: '',
    lineItems: [{ description: '', quantity: 1, price: 0 }],
    taxRate: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInvoiceData(prev => ({ ...prev, [name]: value }));
  };

  const handleLineItemChange = (index: number, field: keyof LineItem, value: string | number) => {
    const newLineItems = [...invoiceData.lineItems];
    newLineItems[index] = { ...newLineItems[index], [field]: value };
    setInvoiceData(prev => ({ ...prev, lineItems: newLineItems }));
  };

  const addLineItem = () => {
    setInvoiceData(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, { description: '', quantity: 1, price: 0 }],
    }));
  };

  const removeLineItem = (index: number) => {
    setInvoiceData(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter((_, i) => i !== index),
    }));
  };

  const calculateSubtotal = () => {
    return invoiceData.lineItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * (invoiceData.taxRate / 100);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
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
    <div className="">
      {/* <Button onClick={() => navigate('/dashboard')} className="mb-4">
        Back to Dashboard
      </Button> */}
      <Card className="w-full max-w-4xl p-6">
        <CardHeader>
          <CardTitle>Create New Invoice</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="font-semibold">From</h3>
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
                    type="tel"
                    value={invoiceData.fromPhone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">To</h3>
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
                    type="tel"
                    value={invoiceData.toPhone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
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
                  required
                />
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Line Items</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Description</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Total</TableHead>
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
                          onChange={(e) => handleLineItemChange(index, 'description', e.target.value)}
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          placeholder="Qty"
                          value={item.quantity}
                          onChange={(e) => handleLineItemChange(index, 'quantity', Number(e.target.value))}
                          required
                          min="1"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          placeholder="Price per unit"
                          value={item.price}
                          onChange={(e) => handleLineItemChange(index, 'price', Number(e.target.value))}
                          required
                          min="0"
                          step="0.01"
                        />
                      </TableCell>
                      <TableCell>
                        ${(item.quantity * item.price).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Button type="button" onClick={() => removeLineItem(index)} variant="destructive" size="sm">
                          <MinusIcon className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button type="button" onClick={addLineItem} variant="outline" className="mt-2">
                <PlusIcon className="h-4 w-4 mr-2" /> Add Item
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
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
                <span>Tax:</span>
                <span>${calculateTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
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