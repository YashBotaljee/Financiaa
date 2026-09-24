import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Invoice } from '../../types';
import { CLIENTS } from '../../data/mock/clients';
import { formatINR } from '../../utils/formatters';

export interface AddInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddInvoice: (inv: Omit<Invoice, 'id'>) => void;
}

export const AddInvoiceModal: React.FC<AddInvoiceModalProps> = ({
  isOpen,
  onClose,
  onAddInvoice,
}) => {
  const [selectedClientId, setSelectedClientId] = useState(CLIENTS[0].id);
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [description, setDescription] = useState('');
  const [rate, setRate] = useState('');
  const [hoursOrQty, setHoursOrQty] = useState('1');
  const [notes, setNotes] = useState('Net 15 days payment terms apply.');

  const client = CLIENTS.find((c) => c.id === selectedClientId) || CLIENTS[0];

  const subtotal = (parseFloat(rate) || 0) * (parseFloat(hoursOrQty) || 1);
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !rate) return;

    onAddInvoice({
      client: client.name,
      clientCompany: client.company,
      clientEmail: client.email,
      clientAddress: `${client.city}, India`,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate,
      items: [
        {
          id: '1',
          description,
          hoursOrQty: parseFloat(hoursOrQty) || 1,
          rate: parseFloat(rate) || 0,
          amount: subtotal,
        },
      ],
      subtotal,
      tax,
      total,
      status: 'Pending',
      notes,
    });

    setDescription('');
    setRate('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Invoice"
      subtitle="Issue a professional GST tax invoice to an enterprise client"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Client *
            </label>
            <select
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
            >
              {CLIENTS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.company})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Due Date *
            </label>
            <input
              type="date"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Service / Item Description *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Monthly Dedicated Cloud Architecture Engineering"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Rate per Unit (₹ INR) *
            </label>
            <input
              type="number"
              required
              placeholder="e.g. 150000"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Quantity / Months / Hours
            </label>
            <input
              type="number"
              min="1"
              value={hoursOrQty}
              onChange={(e) => setHoursOrQty(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            />
          </div>
        </div>

        {/* GST Preview Calculation */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal:</span>
            <span className="font-semibold text-slate-800">{formatINR(subtotal)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>GST (18% Integrated Tax):</span>
            <span className="font-semibold text-slate-800">{formatINR(tax)}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-slate-900 pt-1.5 border-t border-slate-200">
            <span>Payable Amount:</span>
            <span className="text-indigo-600 font-sans">{formatINR(total)}</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Payment Terms & Notes
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
          <Button variant="secondary" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit">
            Generate Invoice
          </Button>
        </div>
      </form>
    </Modal>
  );
};
