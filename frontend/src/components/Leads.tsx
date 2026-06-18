import { useState } from 'react';
import { Plus, X, ChevronRight } from 'lucide-react';
import { Lead } from '../types';
import { mockLeads } from '../data/mockData';

const STAGES: Lead['stage'][] = ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

const stageColors: Record<string, string> = {
  New: 'bg-blue-50 border-blue-200',
  Contacted: 'bg-cyan-50 border-cyan-200',
  Qualified: 'bg-green-50 border-green-200',
  Proposal: 'bg-yellow-50 border-yellow-200',
  Negotiation: 'bg-orange-50 border-orange-200',
  'Closed Won': 'bg-emerald-50 border-emerald-300',
  'Closed Lost': 'bg-red-50 border-red-200',
};

const stageHeaderColors: Record<string, string> = {
  New: 'bg-blue-500',
  Contacted: 'bg-cyan-500',
  Qualified: 'bg-green-500',
  Proposal: 'bg-yellow-500',
  Negotiation: 'bg-orange-500',
  'Closed Won': 'bg-emerald-600',
  'Closed Lost': 'bg-red-500',
};

const sourceColors: Record<string, string> = {
  Web: 'bg-blue-100 text-blue-700',
  Phone: 'bg-green-100 text-green-700',
  Email: 'bg-purple-100 text-purple-700',
  Referral: 'bg-yellow-100 text-yellow-700',
  'Social Media': 'bg-pink-100 text-pink-700',
  'Trade Show': 'bg-orange-100 text-orange-700',
};

const emptyLead: Omit<Lead, 'id' | 'createdAt'> = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  jobTitle: '',
  source: 'Web',
  stage: 'New',
  estimatedValue: undefined,
  owner: 'Admin User',
  notes: '',
};

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<Omit<Lead, 'id' | 'createdAt'>>(emptyLead);

  const leadsByStage = STAGES.reduce<Record<string, Lead[]>>((acc, stage) => {
    acc[stage] = leads.filter(l => l.stage === stage);
    return acc;
  }, {} as Record<string, Lead[]>);

  const formatCurrency = (val?: number) =>
    val ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val) : '';

  const moveToNextStage = (lead: Lead) => {
    const currentIdx = STAGES.indexOf(lead.stage);
    if (currentIdx < STAGES.length - 1) {
      setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, stage: STAGES[currentIdx + 1] } : l));
    }
  };

  const handleSave = () => {
    if (!form.firstName || !form.lastName) return;
    const newLead: Lead = {
      ...form,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setLeads(prev => [...prev, newLead]);
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Leads Pipeline</h1>
          <p className="text-gray-500 text-sm mt-1">{leads.length} total leads</p>
        </div>
        <button
          onClick={() => { setForm(emptyLead); setModalOpen(true); }}
          className="flex items-center gap-2 bg-[#0078d4] text-white px-4 py-2 rounded-md hover:bg-[#106ebe] transition-colors text-sm font-medium"
        >
          <Plus size={16} />
          New Lead
        </button>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-3 overflow-x-auto pb-4" style={{ minHeight: '60vh' }}>
        {STAGES.map(stage => (
          <div key={stage} className="flex-shrink-0 w-56">
            <div className={`rounded-t-md px-3 py-2 flex items-center justify-between ${stageHeaderColors[stage]}`}>
              <span className="text-white text-xs font-semibold">{stage}</span>
              <span className="bg-white/30 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">{leadsByStage[stage].length}</span>
            </div>
            <div className={`rounded-b-md border-x border-b ${stageColors[stage]} min-h-32 p-2 space-y-2`}>
              {leadsByStage[stage].map(lead => (
                <div key={lead.id} className="bg-white rounded-md border border-gray-200 p-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-1">
                    <div className="font-medium text-gray-800 text-sm">{lead.firstName} {lead.lastName}</div>
                    <button onClick={() => handleDelete(lead.id)} className="text-gray-300 hover:text-red-400 ml-1 flex-shrink-0">
                      <X size={12} />
                    </button>
                  </div>
                  <div className="text-xs text-gray-500 mb-1">{lead.company}</div>
                  <div className="text-xs text-gray-400 mb-2">{lead.jobTitle}</div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${sourceColors[lead.source]}`}>{lead.source}</span>
                    {lead.estimatedValue && (
                      <span className="text-xs font-semibold text-gray-700">{formatCurrency(lead.estimatedValue)}</span>
                    )}
                  </div>
                  {STAGES.indexOf(lead.stage) < STAGES.length - 1 && (
                    <button
                      onClick={() => moveToNextStage(lead)}
                      className="mt-2 w-full flex items-center justify-center gap-1 text-xs text-[#0078d4] hover:text-[#106ebe] border border-[#0078d4]/30 rounded py-1 hover:bg-blue-50 transition-colors"
                    >
                      Advance <ChevronRight size={12} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-gray-800">New Lead</h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="px-6 py-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">First Name *</label>
                <input type="text" value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Last Name *</label>
                <input type="text" value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Phone</label>
                <input type="text" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Company</label>
                <input type="text" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Job Title</label>
                <input type="text" value={form.jobTitle} onChange={e => setForm(f => ({ ...f, jobTitle: e.target.value }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Source</label>
                <select value={form.source} onChange={e => setForm(f => ({ ...f, source: e.target.value as Lead['source'] }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]">
                  {['Web','Phone','Email','Referral','Social Media','Trade Show'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Stage</label>
                <select value={form.stage} onChange={e => setForm(f => ({ ...f, stage: e.target.value as Lead['stage'] }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]">
                  {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Estimated Value ($)</label>
                <input type="number" value={form.estimatedValue || ''} onChange={e => setForm(f => ({ ...f, estimatedValue: Number(e.target.value) || undefined }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Owner</label>
                <input type="text" value={form.owner} onChange={e => setForm(f => ({ ...f, owner: e.target.value }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Notes</label>
                <textarea value={form.notes || ''} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={3}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 text-sm bg-[#0078d4] text-white rounded-md hover:bg-[#106ebe] font-medium">Create Lead</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
