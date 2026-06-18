import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, X, DollarSign, TrendingUp, BarChart2 } from 'lucide-react';
import { Opportunity } from '../types';
import { mockOpportunities } from '../data/mockData';

const STAGES: Opportunity['stage'][] = ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

const stageColors: Record<string, string> = {
  Prospecting: 'bg-gray-100 text-gray-700',
  Qualification: 'bg-blue-100 text-blue-700',
  Proposal: 'bg-yellow-100 text-yellow-700',
  Negotiation: 'bg-orange-100 text-orange-700',
  'Closed Won': 'bg-green-100 text-green-700',
  'Closed Lost': 'bg-red-100 text-red-700',
};

const emptyOpp: Omit<Opportunity, 'id' | 'createdAt'> = {
  name: '',
  accountId: '',
  accountName: '',
  contactName: '',
  stage: 'Prospecting',
  probability: 15,
  amount: 0,
  closeDate: '',
  owner: 'Admin User',
  description: '',
};

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOpp, setEditingOpp] = useState<Opportunity | null>(null);
  const [form, setForm] = useState<Omit<Opportunity, 'id' | 'createdAt'>>(emptyOpp);

  const filtered = opportunities.filter(o => {
    const q = search.toLowerCase();
    return o.name.toLowerCase().includes(q) || o.accountName.toLowerCase().includes(q) || o.owner.toLowerCase().includes(q);
  });

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  const totalPipeline = opportunities.filter(o => o.stage !== 'Closed Lost').reduce((s, o) => s + o.amount, 0);
  const wonCount = opportunities.filter(o => o.stage === 'Closed Won').length;
  const avgDeal = opportunities.length ? opportunities.reduce((s, o) => s + o.amount, 0) / opportunities.length : 0;

  const openCreate = () => {
    setEditingOpp(null);
    setForm(emptyOpp);
    setModalOpen(true);
  };

  const openEdit = (opp: Opportunity) => {
    setEditingOpp(opp);
    setForm({
      name: opp.name, accountId: opp.accountId, accountName: opp.accountName,
      contactId: opp.contactId, contactName: opp.contactName, stage: opp.stage,
      probability: opp.probability, amount: opp.amount, closeDate: opp.closeDate,
      owner: opp.owner, description: opp.description,
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name) return;
    if (editingOpp) {
      setOpportunities(prev => prev.map(o => o.id === editingOpp.id ? { ...o, ...form } : o));
    } else {
      setOpportunities(prev => [...prev, { ...form, id: `opp-${Date.now()}`, createdAt: new Date().toISOString().split('T')[0] }]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this opportunity?')) setOpportunities(prev => prev.filter(o => o.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Opportunities</h1>
          <p className="text-gray-500 text-sm mt-1">{opportunities.length} total opportunities</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#0078d4] text-white px-4 py-2 rounded-md hover:bg-[#106ebe] transition-colors text-sm font-medium">
          <Plus size={16} />New Opportunity
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <DollarSign size={20} className="text-blue-600" />
          </div>
          <div>
            <div className="text-lg font-bold text-gray-800">{formatCurrency(totalPipeline)}</div>
            <div className="text-xs text-gray-500">Total Pipeline</div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <TrendingUp size={20} className="text-green-600" />
          </div>
          <div>
            <div className="text-lg font-bold text-gray-800">{wonCount}</div>
            <div className="text-xs text-gray-500">Deals Won</div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <BarChart2 size={20} className="text-purple-600" />
          </div>
          <div>
            <div className="text-lg font-bold text-gray-800">{formatCurrency(avgDeal)}</div>
            <div className="text-xs text-gray-500">Avg Deal Size</div>
          </div>
        </div>
      </div>

      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Search opportunities..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4] bg-white" />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Opportunity</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Account</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Stage</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Amount</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Probability</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Close Date</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Owner</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((opp, idx) => (
              <tr key={opp.id} className={`border-b border-gray-100 hover:bg-gray-50 ${idx % 2 === 0 ? '' : 'bg-gray-50/30'}`}>
                <td className="px-4 py-3 font-medium text-gray-800">{opp.name}</td>
                <td className="px-4 py-3 text-gray-600">{opp.accountName}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${stageColors[opp.stage]}`}>{opp.stage}</span>
                </td>
                <td className="px-4 py-3 font-medium text-gray-800">{formatCurrency(opp.amount)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-100 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full bg-[#0078d4]" style={{ width: `${opp.probability}%` }} />
                    </div>
                    <span className="text-xs text-gray-600">{opp.probability}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{opp.closeDate}</td>
                <td className="px-4 py-3 text-gray-600">{opp.owner}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button onClick={() => openEdit(opp)} className="p-1.5 text-gray-400 hover:text-[#0078d4] hover:bg-blue-50 rounded transition-colors"><Edit2 size={14} /></button>
                    <button onClick={() => handleDelete(opp.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-400">No opportunities found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-gray-800">{editingOpp ? 'Edit Opportunity' : 'New Opportunity'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="px-6 py-4 grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Opportunity Name *</label>
                <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Account Name</label>
                <input type="text" value={form.accountName} onChange={e => setForm(f => ({ ...f, accountName: e.target.value }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Contact Name</label>
                <input type="text" value={form.contactName || ''} onChange={e => setForm(f => ({ ...f, contactName: e.target.value }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Stage</label>
                <select value={form.stage} onChange={e => setForm(f => ({ ...f, stage: e.target.value as Opportunity['stage'] }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]">
                  {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Probability (%)</label>
                <input type="number" min="0" max="100" value={form.probability} onChange={e => setForm(f => ({ ...f, probability: Number(e.target.value) }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Amount ($)</label>
                <input type="number" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: Number(e.target.value) }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Close Date</label>
                <input type="date" value={form.closeDate} onChange={e => setForm(f => ({ ...f, closeDate: e.target.value }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Owner</label>
                <input type="text" value={form.owner} onChange={e => setForm(f => ({ ...f, owner: e.target.value }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                <textarea value={form.description || ''} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 text-sm bg-[#0078d4] text-white rounded-md hover:bg-[#106ebe] font-medium">
                {editingOpp ? 'Save Changes' : 'Create Opportunity'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
