export interface LineItem {
  description: string;
  quantity: number;
  price: number;
  amount: number;
}

export interface InvoiceData {
  // Invoice Details
  title: string;
  invoiceNumber: string;
  invoiceDate: string;
  terms: string;

  // From (Company) Details
  fromName: string;
  fromEmail: string;
  fromAddress: string;
  fromPhone: string;

  // To (Client) Details
  toName: string;
  toEmail: string;
  toAddress: string;
  toPhone: string;

  // Bank Details
  bankName: string;
  accountName: string;
  bsb: string;
  accountNumber: string;

  // Invoice Items
  lineItems: LineItem[];

  // Totals
  subTotal: number;
  taxRate: number;
  taxAmount: number;
  discountPercentage: number;
  discountAmount: number;
  total: number;
}