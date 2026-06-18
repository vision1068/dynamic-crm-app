import { useState } from 'react';
import { Plus, Phone, Mail, Calendar, CheckCircle, FileText, X, Check } from 'lucide-react';
import { Activity, ActivityType } from '../types';
import { mockActivities } from '../data/mockData';

const TYPE_TABS: (ActivityType | 'All')[] = ['All', 'Call', 'Email', 'Meeting', 'Task', 'Note'];

const typeIcons: Record<string, React.ReactNode> = {
  Call: <Phone size={14} />,
  Email: <Mail size={14} />,
  Meeting: <Calendar size={14} />,
  Task: <CheckCircle size={14} />,
  Note: <FileText size={14} />,
};

const typeColors: Record<string, string> = {
  Call: 'bg-blue-100 text-blue-700 border-blue-200',
  Email: 'bg-green-100 text-green-700 border-green-200',
  Meeting: 'bg-purple-100 text-purple-700 border-purple-200',
  Task: 'bg-orange-100 text-orange-700 border-orange-200',
  Note: 'bg-gray-100 text-gray-700 border-gray-200',
};

const statusColors: Record<string, string> = {
  Planned: 'bg-blue-100 text-blue-700',
  Completed: 'bg-green-100 text-green-700',
  Cancelled: 'bg-gray-100 text-gray-500',
};

const emptyActivity: Omit<Activity, 'id' | 'createdAt'> = {
  type: 'Call',
  subject: '',
  description: '',
  relatedTo: '',
  status: 'Planned',
  owner: 'Admin User',
};

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [activeTab, setActiveTab] = useState<ActivityType | 'All'>('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<Omit<Activity, 'id' | 'createdAt'>>(emptyActivity);

  const filtered = activeTab === 'All' ? activities : activities.filter(a => a.type === activeTab);

  const markComplete = (id: string) => {
    setActivities(prev => prev.map(a => a.id === id ? { ...a, status: 'Completed', completedAt: new Date().toISOString() } : a));
  };

  const handleDelete = (id: string) => {
    setActivities(prev => prev.filter(a => a.id !== id));
  };

  const handleSave = () => {
    if (!form.subject) return;
    const newActivity: Activity = {
      ...form,
      id: `act-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setActivities(prev => [newActivity, ...prev]);
    setModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Activities</h1>
          <p className="text-gray-500 text-sm mt-1">{activities.length} total activities</p>
        </div>
        <button
          onClick={() => { setForm(emptyActivity); setModalOpen(true); }}
          className="flex items-center gap-2 bg-[#0078d4] text-white px-4 py-2 rounded-md hover:bg-[#106ebe] transition-colors text-sm font-medium"
        >
          <Plus size={16} />New Activity
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 mb-4 bg-white border border-gray-200 rounded-lg p-1 w-fit">
        {TYPE_TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
              activeTab === tab ? 'bg-[#0078d4] text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Activity List */}
      <div className="space-y-3">
        {filtered.map(activity => (
          <div key={activity.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start gap-4">
              <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border flex-shrink-0 ${typeColors[activity.type]}`}>
                {typeIcons[activity.type]}
                {activity.type}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-medium text-gray-800">{activity.subject}</div>
                    {activity.description && (
                      <div className="text-sm text-gray-500 mt-0.5 line-clamp-2">{activity.description}</div>
                    )}
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                      {activity.relatedTo && <span>Related: <span className="text-gray-600">{activity.relatedTo}</span></span>}
                      <span>Owner: <span className="text-gray-600">{activity.owner}</span></span>
                      <span>{activity.completedAt
                        ? new Date(activity.completedAt).toLocaleDateString()
                        : activity.dueDate
                        ? `Due: ${new Date(activity.dueDate).toLocaleDateString()}`
                        : activity.createdAt}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[activity.status]}`}>
                      {activity.status}
                    </span>
                    {activity.status === 'Planned' && (
                      <button
                        onClick={() => markComplete(activity.id)}
                        title="Mark as complete"
                        className="p-1.5 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded transition-colors"
                      >
                        <Check size={14} />
                      </button>
                    )}
                    <button onClick={() => handleDelete(activity.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors">
                      <X size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-400">
            No activities found
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-gray-800">New Activity</h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="px-6 py-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
                <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as ActivityType }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]">
                  {['Call','Email','Meeting','Task','Note'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
                <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as Activity['status'] }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]">
                  <option value="Planned">Planned</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Subject *</label>
                <input type="text" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                <textarea value={form.description || ''} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Related To</label>
                <input type="text" value={form.relatedTo || ''} onChange={e => setForm(f => ({ ...f, relatedTo: e.target.value }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Owner</label>
                <input type="text" value={form.owner} onChange={e => setForm(f => ({ ...f, owner: e.target.value }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Due Date</label>
                <input type="datetime-local" value={form.dueDate ? form.dueDate.slice(0, 16) : ''} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value ? new Date(e.target.value).toISOString() : undefined }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078d4]" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 text-sm bg-[#0078d4] text-white rounded-md hover:bg-[#106ebe] font-medium">Create Activity</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
