import React from 'react';
import type { Invoice } from '../types';

interface InvoicePreviewProps {
  invoice: Invoice;
}

export default function InvoicePreview({ invoice }: InvoicePreviewProps) {
  const total = invoice.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg" id="invoice-preview">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">INVOICE</h1>
          <p className="text-gray-600 mt-1">#{invoice.number}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600">Date: {invoice.date}</p>
          <p className="text-gray-600">Due Date: {invoice.dueDate}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-700">From</h2>
          <div className="mt-2">
            <p className="text-gray-600">Your Company Name</p>
            <p className="text-gray-600">123 Business Street</p>
            <p className="text-gray-600">City, State 12345</p>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-700">Bill To</h2>
          <div className="mt-2">
            <p className="text-gray-900 font-medium">{invoice.clientName}</p>
            <p className="text-gray-600">{invoice.clientEmail}</p>
            <p className="text-gray-600 whitespace-pre-line">{invoice.clientAddress}</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoice.items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{item.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">${item.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">${(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="px-6 py-4 text-sm font-medium text-gray-900 text-right">Total</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">${total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {invoice.notes && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-700">Notes</h2>
          <p className="mt-2 text-gray-600 whitespace-pre-line">{invoice.notes}</p>
        </div>
      )}
    </div>
  );
}