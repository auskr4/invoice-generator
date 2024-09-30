
import { pdf } from '@react-pdf/renderer';
import PDFInvoice from '../components/PDFInvoice';
import { InvoiceData } from "@/types/invoice";

export const downloadPDF = async (invoiceData: InvoiceData) => {
  const blob = await pdf(<PDFInvoice invoiceData={invoiceData} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `invoice-${invoiceData.invoiceNumber}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
};