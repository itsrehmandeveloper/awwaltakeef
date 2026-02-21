import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Users, DollarSign, LogOut, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Invoice {
  id: string;
  date: string;
  customerName: string;
  customerPhone: string;
  description: string;
  price: number;
  vat: number;
  total: number;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [form, setForm] = useState({ customerName: '', customerPhone: '', description: '', price: '' });
  const [activeTab, setActiveTab] = useState<'invoice' | 'customers'>('invoice');

  useEffect(() => {
    if (localStorage.getItem('awwal_admin') !== 'true') {
      navigate('/adminskt');
      return;
    }
    const saved = localStorage.getItem('awwal_invoices');
    if (saved) setInvoices(JSON.parse(saved));
  }, [navigate]);

  const saveInvoices = (inv: Invoice[]) => {
    setInvoices(inv);
    localStorage.setItem('awwal_invoices', JSON.stringify(inv));
  };

  const priceNum = parseFloat(form.price) || 0;
  const vatAmount = priceNum * 0.15;
  const totalAmount = priceNum + vatAmount;

  const generateInvoiceId = () => {
    const year = new Date().getFullYear();
    const num = String(invoices.length + 1).padStart(4, '0');
    return `INV-${year}-${num}`;
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customerName || !priceNum) return;

    const newInvoice: Invoice = {
      id: generateInvoiceId(),
      date: new Date().toISOString().split('T')[0],
      customerName: form.customerName,
      customerPhone: form.customerPhone,
      description: form.description,
      price: priceNum,
      vat: vatAmount,
      total: totalAmount,
    };

    saveInvoices([newInvoice, ...invoices]);
    generatePDF(newInvoice);
    setForm({ customerName: '', customerPhone: '', description: '', price: '' });
  };

  const generatePDF = (inv: Invoice) => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.setTextColor(14, 165, 233);
    doc.text('AwwalTakeef', 20, 25);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('HVAC & Appliance Repair', 20, 32);

    doc.setFontSize(10);
    doc.setTextColor(60);
    doc.text(`Invoice: ${inv.id}`, 140, 20);
    doc.text(`Date: ${inv.date}`, 140, 27);

    doc.setFontSize(12);
    doc.setTextColor(30);
    doc.text('Billed To:', 20, 50);
    doc.setFontSize(10);
    doc.text(inv.customerName, 20, 58);
    doc.text(inv.customerPhone, 20, 64);

    autoTable(doc, {
      startY: 80,
      head: [['Description', 'Price (SAR)', 'VAT 15%', 'Total (SAR)']],
      body: [[inv.description, inv.price.toFixed(2), inv.vat.toFixed(2), inv.total.toFixed(2)]],
      theme: 'striped',
      headStyles: { fillColor: [14, 165, 233] },
    });

    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text('AwwalTakeef | +966 50 285 5830 | awwaltakeef@gmail.com', 20, pageHeight - 20);
    doc.text('VAT Number: [To be added]', 20, pageHeight - 14);

    doc.save(`${inv.id}.pdf`);
  };

  const totalRevenue = invoices.reduce((sum, i) => sum + i.total, 0);

  const logout = () => {
    localStorage.removeItem('awwal_admin');
    navigate('/adminskt');
  };

  return (
    <div className="min-h-screen bg-secondary/30" dir="ltr">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary">AwwalTakeef Admin</h1>
        <Button variant="ghost" onClick={logout} className="text-muted-foreground">
          <LogOut size={18} className="mr-2" /> Logout
        </Button>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-5xl">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-xl p-5 border border-border/50 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Invoices</p>
                <p className="text-2xl font-bold text-foreground">{invoices.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-5 border border-border/50 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-foreground">{totalRevenue.toFixed(2)} SAR</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-5 border border-border/50 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Customers</p>
                <p className="text-2xl font-bold text-foreground">{new Set(invoices.map(i => i.customerPhone)).size}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === 'invoice' ? 'default' : 'outline'}
            onClick={() => setActiveTab('invoice')}
            className={activeTab === 'invoice' ? 'bg-primary text-primary-foreground' : ''}
          >
            <Plus size={16} className="mr-1" /> New Invoice
          </Button>
          <Button
            variant={activeTab === 'customers' ? 'default' : 'outline'}
            onClick={() => setActiveTab('customers')}
            className={activeTab === 'customers' ? 'bg-primary text-primary-foreground' : ''}
          >
            <Users size={16} className="mr-1" /> Customers
          </Button>
        </div>

        {activeTab === 'invoice' && (
          <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
            <h2 className="text-lg font-bold text-foreground mb-4">Create Invoice</h2>
            <form onSubmit={handleCreateInvoice} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Customer Name</label>
                  <Input
                    required
                    value={form.customerName}
                    onChange={e => setForm(f => ({ ...f, customerName: e.target.value }))}
                    maxLength={100}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Customer Phone</label>
                  <Input
                    value={form.customerPhone}
                    onChange={e => setForm(f => ({ ...f, customerPhone: e.target.value }))}
                    placeholder="+966..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Service Description</label>
                <Textarea
                  required
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  maxLength={500}
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price (SAR, pre-VAT)</label>
                <Input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                />
              </div>

              {priceNum > 0 && (
                <div className="bg-accent/50 rounded-lg p-4 text-sm space-y-1">
                  <div className="flex justify-between"><span>Price:</span><span>{priceNum.toFixed(2)} SAR</span></div>
                  <div className="flex justify-between"><span>VAT (15%):</span><span>{vatAmount.toFixed(2)} SAR</span></div>
                  <div className="flex justify-between font-bold text-base border-t border-border pt-2 mt-2">
                    <span>Total:</span><span>{totalAmount.toFixed(2)} SAR</span>
                  </div>
                </div>
              )}

              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <FileText size={16} className="mr-2" /> Generate Invoice & PDF
              </Button>
            </form>
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary">
                  <tr>
                    <th className="text-start p-3 font-medium">Invoice</th>
                    <th className="text-start p-3 font-medium">Customer</th>
                    <th className="text-start p-3 font-medium">Phone</th>
                    <th className="text-start p-3 font-medium">Service</th>
                    <th className="text-start p-3 font-medium">Total (SAR)</th>
                    <th className="text-start p-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.length === 0 ? (
                    <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">No invoices yet</td></tr>
                  ) : invoices.map(inv => (
                    <tr key={inv.id} className="border-t border-border/50 hover:bg-secondary/50">
                      <td className="p-3 font-mono text-xs">{inv.id}</td>
                      <td className="p-3">{inv.customerName}</td>
                      <td className="p-3 font-mono text-xs">{inv.customerPhone}</td>
                      <td className="p-3 max-w-[200px] truncate">{inv.description}</td>
                      <td className="p-3 font-semibold">{inv.total.toFixed(2)}</td>
                      <td className="p-3 text-muted-foreground">{inv.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
