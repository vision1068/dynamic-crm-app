import { Users, Building2, TrendingUp, Target, DollarSign, Award } from 'lucide-react'
import { mockContacts, mockAccounts, mockLeads, mockOpportunities } from '../data/mockData'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const pipelineData = [
  { stage: 'Prospecting', value: 35000 },
  { stage: 'Qualification', value: 45000 },
  { stage: 'Proposal', value: 280000 },
  { stage: 'Negotiation', value: 150000 },
  { stage: 'Closed Won', value: 95000 },
]

const leadSourceData = [
  { name: 'Website', value: 35 },
  { name: 'Referral', value: 25 },
  { name: 'Trade Show', value: 20 },
  { name: 'LinkedIn', value: 15 },
  { name: 'Cold Call', value: 5 },
]

const COLORS = ['#0078d4', '#106ebe', '#005a9e', '#004578', '#002c4e']

const stats = [
  { label: 'Total Contacts', value: mockContacts.length, icon: Users, color: 'bg-blue-500', change: '+12%' },
  { label: 'Total Accounts', value: mockAccounts.length, icon: Building2, color: 'bg-indigo-500', change: '+8%' },
  { label: 'Active Leads', value: mockLeads.filter(l => l.stage !== 'closed').length, icon: TrendingUp, color: 'bg-cyan-500', change: '+23%' },
  { label: 'Opportunities', value: mockOpportunities.length, icon: Target, color: 'bg-purple-500', change: '+5%' },
  { label: 'Pipeline Value', value: '$605K', icon: DollarSign, color: 'bg-green-500', change: '+18%' },
  { label: 'Won Deals', value: mockOpportunities.filter(o => o.stage === 'closed-won').length, icon: Award, color: 'bg-orange-500', change: '+2' },
]

export default function Dashboard() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here's what's happening.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {stats.map(stat => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className={`${stat.color} text-white p-2 rounded-lg`}>
                  <Icon size={20} />
                </div>
                <span className="text-green-500 text-xs font-medium">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-700 mb-4">Pipeline by Stage</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={pipelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="stage" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, 'Value']} />
              <Bar dataKey="value" fill="#0078d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-700 mb-4">Lead Sources</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={leadSourceData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                {leadSourceData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => [`${v}%`, 'Share']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {leadSourceData.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-medium text-gray-700">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-700 mb-3">Recent Opportunities</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 text-gray-500 font-medium">Opportunity</th>
                <th className="text-left py-2 text-gray-500 font-medium">Account</th>
                <th className="text-left py-2 text-gray-500 font-medium">Stage</th>
                <th className="text-right py-2 text-gray-500 font-medium">Value</th>
                <th className="text-right py-2 text-gray-500 font-medium">Probability</th>
              </tr>
            </thead>
            <tbody>
              {mockOpportunities.slice(0, 5).map(opp => (
                <tr key={opp.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2.5 font-medium text-blue-600">{opp.name}</td>
                  <td className="py-2.5 text-gray-600">{opp.accountName}</td>
                  <td className="py-2.5">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      opp.stage === 'closed-won' ? 'bg-green-100 text-green-700' :
                      opp.stage === 'closed-lost' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {opp.stage.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                    </span>
                  </td>
                  <td className="py-2.5 text-right font-medium">${opp.value.toLocaleString()}</td>
                  <td className="py-2.5 text-right text-gray-600">{opp.probability}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
