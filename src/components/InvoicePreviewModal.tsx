import React from "react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InvoiceData, LineItem } from "@/types/invoice";

interface InvoicePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  invoiceData: InvoiceData;
  isExistingInvoice: boolean;
}

const InvoicePreviewModal: React.FC<InvoicePreviewModalProps> = ({
  isOpen,
  onClose,
  onAccept,
  invoiceData,
  isExistingInvoice,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
          w-full max-w-4xl
          max-h-[calc(100vh-4rem)] 
          overflow-y-auto
        "
      >
        <div
          className="p-8 bg-white rounded shadow"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          {/* Invoice Header */}
          <div className="text-right mb-6">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">INVOICE</h1>
            <p className="text-gray-600">{invoiceData.title}</p>
          </div>

          {/* Invoice Info */}
          <div className="flex justify-between mb-8">
            <div>
              <p className="font-bold text-gray-700">Invoice Number:</p>
              <p>{invoiceData.invoiceNumber}</p>
              <p className="font-bold text-gray-700 mt-2">Invoice Date:</p>
              <p>{invoiceData.invoiceDate}</p>
              <p className="font-bold text-gray-700 mt-2">Terms:</p>
              <p>{invoiceData.terms}</p>
            </div>
          </div>

          {/* From and To Addresses */}
          <div className="flex justify-between mb-8">
            <div className="w-1/2 pr-4">
              <h2 className="text-xl font-bold text-blue-600 mb-2">From:</h2>
              <p>{invoiceData.fromName}</p>
              <p>{invoiceData.fromAddress}</p>
              <p>{invoiceData.fromPhone}</p>
              <p>{invoiceData.fromEmail}</p>
            </div>
            <div className="w-1/2 pl-4">
              <h2 className="text-xl font-bold text-blue-600 mb-2">To:</h2>
              <p>{invoiceData.toName}</p>
              <p>{invoiceData.toAddress}</p>
              <p>{invoiceData.toPhone}</p>
              <p>{invoiceData.toEmail}</p>
            </div>
          </div>

          {/* Bank Details */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-blue-600 mb-2">
              Bank Details:
            </h2>
            <p>Bank: {invoiceData.bankName}</p>
            <p>Account Name: {invoiceData.accountName}</p>
            <p>BSB: {invoiceData.bsb}</p>
            <p>Account Number: {invoiceData.accountNumber}</p>
          </div>

          {/* Line Items */}
          <table className="w-full mb-8">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-2 font-bold text-gray-700">
                  Description
                </th>
                <th className="text-right p-2 font-bold text-gray-700">
                  Quantity
                </th>
                <th className="text-right p-2 font-bold text-gray-700">
                  Price
                </th>
                <th className="text-right p-2 font-bold text-gray-700">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.lineItems.map((item: LineItem, index: number) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{item.description}</td>
                  <td className="text-right p-2">{item.quantity}</td>
                  <td className="text-right p-2">${item.price.toFixed(2)}</td>
                  <td className="text-right p-2">${item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="w-1/2 ml-auto">
            <div className="flex justify-between mb-2">
              <span className="font-bold text-gray-700">Subtotal:</span>
              <span>${invoiceData.subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-bold text-gray-700">
                Tax ({invoiceData.taxRate}%):
              </span>
              <span>${invoiceData.taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-bold text-gray-700">
                Discount ({invoiceData.discountPercentage}%):
              </span>
              <span>${invoiceData.discountAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total:</span>
              <span>${invoiceData.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Edit
          </Button>
          <Button onClick={onAccept}>
            {isExistingInvoice ? "Update Invoice" : "Create Invoice"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvoicePreviewModal;
