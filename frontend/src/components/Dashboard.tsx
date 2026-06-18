import { Users, Building2, Target, TrendingUp, Calendar, DollarSign, CheckCircle, Phone, Mail, Clock } from 'lucide-react';
import { mockContacts, mockAccounts, mockLeads, mockOpportunities, mockActivities } from '../data/mockData';

const activityIcons: Record<string, React.ReactNode> = {
  Call: <Phone size={14} />,
  Email: <Mail size={14} />,
  Meeting: <Calendar size={14} />,
  Task: <CheckCircle size={14} />,
  Note: <Clock size={14} />,
};

const activityColors: Record<string, string> = {
  Call: 'bg-blue-100 text-blue-700',
  Email: 'bg-green-100 text-green-700',
  Meeting: 'bg-purple-100 text-purple-700',
  Task: 'bg-orange-100 text-orange-700',
  Note: 'bg-gray-100 text-gray-700',
};

export default function Dashboard() {
  const openLeads = mockLeads.filter(l => !['Closed Won', 'Closed Lost'].includes(l.stage)).length;
  const openOpps = mockOpportunities.filter(o => !['Closed Won', 'Closed Lost'].includes(o.stage)).length;
  const totalPipelineValue = mockOpportunities
    .filter(o => o.stage !== 'Closed Lost')
    .reduce((sum, o) => sum + o.amount, 0);
  const wonRevenue = mockOpportunities
    .filter(o => o.stage === 'Closed Won')
    .reduce((sum, o) => sum + o.amount, 0);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  const stageColors: Record<string, string> = {
    Prospecting: 'bg-gray-400',
    Qualification: 'bg-blue-400',
    Proposal: 'bg-yellow-400',
    Negotiation: 'bg-orange-400',
    'Closed Won': 'bg-green-500',
    'Closed Lost': 'bg-red-400',
  };

  const oppsByStage = mockOpportunities.reduce<Record<string, number>>((acc, o) => {
    acc[o.stage] = (acc[o.stage] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Users size={22} className="text-blue-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800">{mockContacts.length}</div>
            <div className="text-sm text-gray-500">Total Contacts</div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <Building2 size={22} className="text-green-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800">{mockAccounts.length}</div>
            <div className="text-sm text-gray-500">Total Accounts</div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <Target size={22} className="text-orange-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800">{openLeads}</div>
            <div className="text-sm text-gray-500">Open Leads</div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <TrendingUp size={22} className="text-purple-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800">{openOpps}</div>
            <div className="text-sm text-gray-500">Open Opportunities</div>
          </div>
        </div>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-[#0078d4] rounded-lg p-5 text-white">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={18} />
            <span className="text-sm font-medium opacity-90">Total Pipeline Value</span>
          </div>
          <div className="text-3xl font-bold">{formatCurrency(totalPipelineValue)}</div>
          <div className="text-sm opacity-75 mt-1">{openOpps} active opportunities</div>
        </div>
        <div className="bg-green-600 rounded-lg p-5 text-white">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={18} />
            <span className="text-sm font-medium opacity-90">Won Revenue</span>
          </div>
          <div className="text-3xl font-bold">{formatCurrency(wonRevenue)}</div>
          <div className="text-sm opacity-75 mt-1">{mockOpportunities.filter(o => o.stage === 'Closed Won').length} deals closed</div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Opportunity Pipeline */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Opportunity Pipeline</h2>
          <div className="space-y-3">
            {Object.entries(oppsByStage).map(([stage, count]) => (
              <div key={stage} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-32 flex-shrink-0">{stage}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${stageColors[stage] || 'bg-blue-400'}`}
                    style={{ width: `${(count / mockOpportunities.length) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 w-4 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Recent Activities</h2>
          <div className="space-y-3">
            {mockActivities.slice(0, 5).map(activity => (
              <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                <span className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${activityColors[activity.type]} flex-shrink-0`}>
                  {activityIcons[activity.type]}
                  {activity.type}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-gray-800 truncate">{activity.subject}</div>
                  <div className="text-xs text-gray-500">{activity.owner} · {activity.createdAt}</div>
                </div>
                <span className={`ml-auto text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                  activity.status === 'Completed' ? 'bg-green-100 text-green-700' :
                  activity.status === 'Planned' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                }`}>{activity.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
