import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Transaction } from '../../types';

export interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (txn: Omit<Transaction, 'id'>) => void;
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  onAddTransaction,
}) => {
  const [type, setType] = useState<'Income' | 'Expense'>('Income');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Client Retainer');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('NEFT / RTGS');
  const [notes, setNotes] = useState('');

  const incomeCategories = ['Client Retainer', 'Software Sales', 'Consulting', 'Milestone Payment', 'Other Income'];
  const expenseCategories = ['Salaries', 'Marketing', 'Operations', 'Software', 'Office', 'Legal & Tax', 'Other'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;

    onAddTransaction({
      date,
      description,
      category,
      type,
      amount: parseFloat(amount),
      status: 'Completed',
      paymentMethod,
      notes,
    });

    // Reset
    setAmount('');
    setDescription('');
    setNotes('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Transaction"
      subtitle="Record a new income receipt or business expense"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type Selector (Income vs Expense) */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Transaction Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setType('Income');
                setCategory('Client Retainer');
              }}
              className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                type === 'Income'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 ring-2 ring-emerald-500/20'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              + Income (Receivable)
            </button>
            <button
              type="button"
              onClick={() => {
                setType('Expense');
                setCategory('Software');
              }}
              className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                type === 'Expense'
                  ? 'bg-rose-50 text-rose-700 border-rose-300 ring-2 ring-rose-500/20'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              - Expense (Payable)
            </button>
          </div>
        </div>

        {/* Amount & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Amount (₹ INR) *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">₹</span>
              <input
                type="number"
                required
                placeholder="e.g. 75000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-7 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Transaction Date *
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            />
          </div>
        </div>

        {/* Category & Payment Method */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
            >
              {(type === 'Income' ? incomeCategories : expenseCategories).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
            >
              <option value="NEFT / RTGS">NEFT / RTGS</option>
              <option value="Corporate Credit Card">Corporate Credit Card</option>
              <option value="UPI Corporate">UPI Corporate</option>
              <option value="Net Banking">Net Banking</option>
              <option value="Razorpay PG">Razorpay PG</option>
              <option value="Cheque / Draft">Cheque / Draft</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Description / Reference Title *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. AWS Cloud Cluster Invoice - August"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Notes / Audit Reference
          </label>
          <textarea
            rows={2}
            placeholder="Add any internal memo or purchase order number..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
          <Button variant="secondary" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit">
            Save Record
          </Button>
        </div>
      </form>
    </Modal>
  );
};
