import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, X } from 'lucide-react';
import { Account } from '../types';
import { mockAccounts } from '../data/mockData';

const emptyAccount: Omit<Account, 'id' | 'createdAt'> = {
  name: '',
  industry: '',
  website: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  country: 'USA',
  revenue: undefined,
  employees: undefined,
  status: 'Active',
  owner: 'Admin User',
};

export default function Accounts() {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [form, setForm] = useState<Omit<Account, 'id' | 'createdAt'>>(emptyAccount);

  const filtered = accounts.filter(a => {
    const q = search.toLowerCase();
    return (
      a.name.toLowerCase().includes(q) ||
      a.industry.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q)
    );
  });

  const formatCurrency = (val?: number) =>
    val ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0, notation: 'compact' }).format(val) : '-';

  const openCreate = () => {
    setEditingAccount(null);
    setForm(emptyAccount);
    setModalOpen(true);
  };

  const openEdit = (account: Account) => {
    setEditingAccount(account);
    setForm({
      name: account.name,
      industry: account.industry,
      website: account.website || '',
      phone: account.phone,
      email: account.email,
      address: account.address,
      city: account.city,
      country: account.country,
      revenue: account.revenue,
      employees: account.employees,
      status: account.status,
      owner: account.owner,
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name) return;
    if (editingAccount) {
      setAccounts(prev => prev.map(a => a.id === editingAccount.id ? { ...a, ...form } : a));
    } else {
      const newAccount: Account = {
        ...form,
        id: `acc-${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setAccounts(prev => [...prev, newAccount]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this account?')) {
      setAccounts(prev => prev.filter(a => a.id !== id));
    }
  };

  const statusColors: Record<string, string> = {
    Active: 'bg-green-100 text-green-700',
    Inactive: 'bg-gray-100 text-gray-600',
    Prospect: 'bg-blue-100 text-blue-700',
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Accounts</h1>
          <p className="text-gray-500 text-sm mt-1">{accounts.length} total accounts</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-[#0078d4] text-white px-4 py-2 rounded-md hover:bg-[#106ebe] transition-colors text-sm font-medium"
        >
          <Plus size={16} />
          New Account
        </button>
      </div>

      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search accounts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4] bg-white"
        />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Name</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Industry</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Phone</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">City</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Revenue</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Employees</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((account, idx) => (
              <tr key={account.id} className={`border-b border-gray-100 hover:bg-gray-50 ${idx % 2 === 0 ? '' : 'bg-gray-50/30'}`}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-[#243a5e] rounded flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                      {account.name[0]}
                    </div>
                    <span className="font-medium text-gray-800">{account.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{account.industry}</td>
                <td className="px-4 py-3 text-gray-600">{account.phone}</td>
                <td className="px-4 py-3 text-gray-600">{account.city}, {account.country}</td>
                <td className="px-4 py-3 text-gray-600">{formatCurrency(account.revenue)}</td>
                <td className="px-4 py-3 text-gray-600">{account.employees?.toLocaleString() ?? '-'}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[account.status]}`}>{account.status}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button onClick={() => openEdit(account)} className="p-1.5 text-gray-400 hover:text-[#0078d4] hover:bg-blue-50 rounded transition-colors">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => handleDelete(account.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-400">No accounts found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-gray-800">{editingAccount ? 'Edit Account' : 'New Account'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="px-6 py-4 grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Account Name *</label>
                <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Industry</label>
                <input type="text" value={form.industry} onChange={e => setForm(f => ({ ...f, industry: e.target.value }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
                <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as Account['status'] }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Prospect">Prospect</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Phone</label>
                <input type="text" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Website</label>
                <input type="text" value={form.website || ''} onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">City</label>
                <input type="text" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Country</label>
                <input type="text" value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Revenue ($)</label>
                <input type="number" value={form.revenue || ''} onChange={e => setForm(f => ({ ...f, revenue: Number(e.target.value) || undefined }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Employees</label>
                <input type="number" value={form.employees || ''} onChange={e => setForm(f => ({ ...f, employees: Number(e.target.value) || undefined }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 text-sm bg-[#0078d4] text-white rounded-md hover:bg-[#106ebe] font-medium">
                {editingAccount ? 'Save Changes' : 'Create Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
