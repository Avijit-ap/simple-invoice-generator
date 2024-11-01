export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  items: InvoiceItem[];
  notes: string;
}

export interface InvoiceFormProps {
  onSubmit: (invoice: Invoice) => void;
  initialData?: Invoice;
}