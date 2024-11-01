import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FileText, Printer, Plus } from 'lucide-react';
import type { Invoice } from './types';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';

function App() {
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem('invoices');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const previewRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => previewRef.current,
  });

  const saveInvoice = (invoice: Invoice) => {
    const updatedInvoices = selectedInvoice
      ? invoices.map(inv => inv.id === invoice.id ? invoice : inv)
      : [...invoices, invoice];
    
    setInvoices(updatedInvoices);
    localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
    setSelectedInvoice(null);
    setIsCreating(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Invoice Generator</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {!isCreating && !selectedInvoice ? (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Your Invoices</h2>
                <button
                  onClick={() => setIsCreating(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  New Invoice
                </button>
              </div>

              {invoices.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No invoices</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by creating a new invoice.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Number</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {invoices.map((invoice) => (
                        <tr key={invoice.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.number}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.clientName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => setSelectedInvoice(invoice)}
                              className="text-blue-600 hover:text-blue-900 mr-4"
                            >
                              View
                            </button>
                            <button
                              onClick={() => {
                                setSelectedInvoice(invoice);
                                handlePrint();
                              }}
                              className="text-green-600 hover:text-green-900"
                            >
                              Print
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              {isCreating || selectedInvoice ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {isCreating ? 'Create New Invoice' : 'Edit Invoice'}
                    </h2>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => {
                          setIsCreating(false);
                          setSelectedInvoice(null);
                        }}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      {selectedInvoice && (
                        <button
                          onClick={handlePrint}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                        >
                          <Printer className="h-5 w-5 mr-2" />
                          Print
                        </button>
                      )}
                    </div>
                  </div>
                  <InvoiceForm
                    onSubmit={saveInvoice}
                    initialData={selectedInvoice || undefined}
                  />
                </div>
              ) : null}
            </div>
          </div>
        )}

        <div className="hidden">
          <div ref={previewRef}>
            {selectedInvoice && <InvoicePreview invoice={selectedInvoice} />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;