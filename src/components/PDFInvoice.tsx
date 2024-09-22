import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { InvoiceData } from "@/types/invoice";

// Register fonts (you'll need to provide the correct paths to your font files)
Font.register({
  family: 'Roboto',
  fonts: [
    { src: '/path/to/Roboto-Regular.ttf' },
    { src: '/path/to/Roboto-Bold.ttf', fontWeight: 'bold' },
  ]
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    // fontFamily: 'Roboto',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'right',
    color: '#3B82F6', // Blue color for header
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'right',
    color: '#6B7280', // Gray color for subtitle
  },
  invoiceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoGroup: {
    flexDirection: 'column',
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#4B5563', // Dark gray for labels
    marginBottom: 2,
  },
  value: {
    fontSize: 10,
    marginBottom: 5,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#3B82F6', // Blue color for section titles
  },
  table: {
    display: 'table',
    width: 'auto',
    marginTop: 10,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    borderBottomStyle: 'solid',
    alignItems: 'center',
    height: 24,
    fontStyle: 'bold',
  },
  tableColHeader: {
    width: '25%',
    paddingHorizontal: 5,
  },
  tableCol: {
    width: '25%',
    paddingHorizontal: 5,
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#4B5563',
  },
  tableCell: {
    fontSize: 10,
  },
  totals: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  totalLabel: {
    width: '70%',
    textAlign: 'right',
    paddingRight: 10,
    fontSize: 10,
  },
  totalValue: {
    width: '30%',
    textAlign: 'right',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

interface PDFInvoiceProps {
  invoiceData: InvoiceData;
}

const PDFInvoice: React.FC<PDFInvoiceProps> = ({ invoiceData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>INVOICE</Text>
      <Text style={styles.title}>{invoiceData.title}</Text>
      
      <View style={styles.invoiceInfo}>
        <View style={styles.infoGroup}>
          <Text style={styles.label}>Invoice Number:</Text>
          <Text style={styles.value}>{invoiceData.invoiceNumber}</Text>
          <Text style={styles.label}>Invoice Date:</Text>
          <Text style={styles.value}>{invoiceData.invoiceDate}</Text>
          <Text style={styles.label}>Terms:</Text>
          <Text style={styles.value}>{invoiceData.terms}</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>From:</Text>
        <Text style={styles.value}>{invoiceData.fromName}</Text>
        <Text style={styles.value}>{invoiceData.fromAddress}</Text>
        <Text style={styles.value}>{invoiceData.fromPhone}</Text>
        <Text style={styles.value}>{invoiceData.fromEmail}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>To:</Text>
        <Text style={styles.value}>{invoiceData.toName}</Text>
        <Text style={styles.value}>{invoiceData.toAddress}</Text>
        <Text style={styles.value}>{invoiceData.toPhone}</Text>
        <Text style={styles.value}>{invoiceData.toEmail}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bank Details:</Text>
        <Text style={styles.value}>Bank: {invoiceData.bankName}</Text>
        <Text style={styles.value}>Account Name: {invoiceData.accountName}</Text>
        <Text style={styles.value}>BSB: {invoiceData.bsb}</Text>
        <Text style={styles.value}>Account Number: {invoiceData.accountNumber}</Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>DESCRIPTION</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>QUANTITY</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>PRICE</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>AMOUNT</Text>
          </View>
        </View>
        {invoiceData.lineItems.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.description}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.quantity}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>${item.price.toFixed(2)}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>${item.amount.toFixed(2)}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.totals}>
        <Text style={styles.totalLabel}>Subtotal:</Text>
        <Text style={styles.totalValue}>${invoiceData.subTotal.toFixed(2)}</Text>
      </View>
      <View style={styles.totals}>
        <Text style={styles.totalLabel}>Tax ({invoiceData.taxRate}%):</Text>
        <Text style={styles.totalValue}>${invoiceData.taxAmount.toFixed(2)}</Text>
      </View>
      <View style={styles.totals}>
        <Text style={styles.totalLabel}>Discount ({invoiceData.discountPercentage}%):</Text>
        <Text style={styles.totalValue}>${invoiceData.discountAmount.toFixed(2)}</Text>
      </View>
      <View style={styles.totals}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalValue}>${invoiceData.total.toFixed(2)}</Text>
      </View>
    </Page>
  </Document>
);

export default PDFInvoice;