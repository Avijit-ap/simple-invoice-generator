import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import type { Invoice, InvoiceFormProps, InvoiceItem } from '../types';

export default function InvoiceForm({ onSubmit, initialData }: InvoiceFormProps) {
  const [invoice, setInvoice] = useState<Invoice>(
    initialData || {
      id: uuidv4(),
      number: `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      clientName: '',
      clientEmail: '',
      clientAddress: '',
      items: [],
      notes: '',
    }
  );

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { id: uuidv4(), description: '', quantity: 1, price: 0 }],
    });
  };

  const removeItem = (id: string) => {
    setInvoice({
      ...invoice,
      items: invoice.items.filter(item => item.id !== id),
    });
  };

  const updateItem = (id: string, updates: Partial<InvoiceItem>) => {
    setInvoice({
      ...invoice,
      items: invoice.items.map(item =>
        item.id === id ? { ...item, ...updates } : item
      ),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(invoice);
  };

  const total = invoice.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Invoice Number</label>
          <input
            type="text"
            value={invoice.number}
            onChange={e => setInvoice({ ...invoice, number: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={invoice.date}
            onChange={e => setInvoice({ ...invoice, date: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Client Information</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={invoice.clientName}
              onChange={e => setInvoice({ ...invoice, clientName: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={invoice.clientEmail}
              onChange={e => setInvoice({ ...invoice, clientEmail: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              value={invoice.clientAddress}
              onChange={e => setInvoice({ ...invoice, clientAddress: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Items</h3>
          <button
            type="button"
            onClick={addItem}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Item
          </button>
        </div>
        
        <div className="space-y-4">
          {invoice.items.map((item) => (
            <div key={item.id} className="flex gap-4 items-start">
              <div className="flex-1">
                <input
                  type="text"
                  value={item.description}
                  onChange={e => updateItem(item.id, { description: e.target.value })}
                  placeholder="Description"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="w-24">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={e => updateItem(item.id, { quantity: Number(e.target.value) })}
                  placeholder="Qty"
                  min="1"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="w-32">
                <input
                  type="number"
                  value={item.price}
                  onChange={e => updateItem(item.id, { price: Number(e.target.value) })}
                  placeholder="Price"
                  min="0"
                  step="0.01"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="p-2 text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          value={invoice.notes}
          onChange={e => setInvoice({ ...invoice, notes: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <div className="text-lg font-semibold">
          Total: ${total.toFixed(2)}
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Invoice
        </button>
      </div>
    </form>
  );
}