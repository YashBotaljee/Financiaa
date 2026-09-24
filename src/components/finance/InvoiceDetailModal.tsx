import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Invoice } from '../../types';
import { formatINR, formatDate } from '../../utils/formatters';
import { Printer, Send, Download, CheckCircle2, AlertCircle } from 'lucide-react';
import { useToast } from '../common/Toast';

export interface InvoiceDetailModalProps {
  invoice: Invoice | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InvoiceDetailModal: React.FC<InvoiceDetailModalProps> = ({
  invoice,
  isOpen,
  onClose,
}) => {
  const { showToast } = useToast();

  if (!invoice) return null;

  const getStatusBadge = (status: Invoice['status']) => {
    switch (status) {
      case 'Paid':
        return <Badge variant="success" dot>Paid</Badge>;
      case 'Pending':
        return <Badge variant="warning" dot>Pending</Badge>;
      case 'Overdue':
        return <Badge variant="danger" dot>Overdue</Badge>;
      case 'Draft':
        return <Badge variant="neutral" dot>Draft</Badge>;
    }
  };

  const handlePrint = () => {
    showToast(`Generating high-resolution PDF for ${invoice.id}...`, 'info');
  };

  const handleSendReminder = () => {
    showToast(`Payment reminder dispatched to ${invoice.clientEmail}`, 'success');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Tax Invoice — ${invoice.id}`}
      subtitle={`Created on ${formatDate(invoice.issueDate)} • Due by ${formatDate(invoice.dueDate)}`}
      maxWidth="3xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={<Printer className="w-3.5 h-3.5" />}
              onClick={handlePrint}
            >
              Print
            </Button>
            <Button
              variant="secondary"
              size="sm"
              icon={<Download className="w-3.5 h-3.5" />}
              onClick={handlePrint}
            >
              Download PDF
            </Button>
          </div>
          <div className="flex items-center gap-2">
            {invoice.status !== 'Paid' && (
              <Button
                variant="primary"
                size="sm"
                icon={<Send className="w-3.5 h-3.5" />}
                onClick={handleSendReminder}
              >
                Send Reminder
              </Button>
            )}
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      }
    >
      <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-2xs space-y-6">
        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Apex Nova Tech Pvt Ltd
              </span>
              {getStatusBadge(invoice.status)}
            </div>
            <div className="text-xs text-slate-500 mt-1 space-y-0.5">
              <p>Indiranagar 100ft Road, Bengaluru, KA - 560038</p>
              <p>GSTIN: 29ABCDE1234F1Z5 • PAN: ABCDE1234F</p>
              <p>Email: billing@apexnova.in • Phone: +91 80 4912 3000</p>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Invoice Total
            </span>
            <span className="text-2xl font-black text-slate-900 font-sans">
              {formatINR(invoice.total)}
            </span>
            <div className="text-xs text-slate-500 mt-1">
              <div>Invoice No: <strong>{invoice.id}</strong></div>
              <div>Due Date: <strong className={invoice.status === 'Overdue' ? 'text-rose-600' : ''}>{formatDate(invoice.dueDate)}</strong></div>
            </div>
          </div>
        </div>

        {/* Bill To Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50/70 border border-slate-100">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Billed To
            </span>
            <h4 className="text-xs font-bold text-slate-900">{invoice.client}</h4>
            <p className="text-xs text-slate-600">{invoice.clientCompany}</p>
            <p className="text-xs text-slate-500 mt-0.5">{invoice.clientAddress}</p>
            <p className="text-xs text-indigo-600 mt-1">{invoice.clientEmail}</p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Payment Settlement Details
            </span>
            <div className="text-xs text-slate-600 space-y-0.5">
              <p>Bank: <strong>HDFC Bank Ltd</strong></p>
              <p>Account No: <strong>50200088192841</strong></p>
              <p>IFSC Code: <strong>HDFC0000129</strong></p>
              <p>UPI VPA: <strong>apexnova@hdfcbank</strong></p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50">
                <th className="py-2.5 px-3">Description</th>
                <th className="py-2.5 px-3 text-center">Qty / Hours</th>
                <th className="py-2.5 px-3 text-right">Unit Rate</th>
                <th className="py-2.5 px-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoice.items.map((item) => (
                <tr key={item.id}>
                  <td className="py-3 px-3 font-medium text-slate-800">
                    {item.description}
                  </td>
                  <td className="py-3 px-3 text-center text-slate-600">
                    {item.hoursOrQty}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-600">
                    {formatINR(item.rate)}
                  </td>
                  <td className="py-3 px-3 text-right font-semibold text-slate-900">
                    {formatINR(item.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Calculation Summary */}
        <div className="flex justify-end pt-2">
          <div className="w-full sm:w-64 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-medium text-slate-900">{formatINR(invoice.subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Integrated GST (18%)</span>
              <span className="font-medium text-slate-900">{formatINR(invoice.tax)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
              <span>Grand Total</span>
              <span className="text-indigo-600">{formatINR(invoice.total)}</span>
            </div>
          </div>
        </div>

        {/* Notes & Disclaimer */}
        {invoice.notes && (
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Remarks: </span>
            {invoice.notes}
          </div>
        )}
      </div>
    </Modal>
  );
};
