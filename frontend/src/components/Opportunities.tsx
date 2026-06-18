import { useState } from 'react'
import { Search, Plus, MoreVertical } from 'lucide-react'
import { mockOpportunities } from '../data/mockData'
import { Opportunity } from '../types'

const stageColors: Record<Opportunity['stage'], string> = {
  prospecting: 'bg-gray-100 text-gray-600',
  qualification: 'bg-blue-100 text-blue-700',
  proposal: 'bg-purple-100 text-purple-700',
  negotiation: 'bg-orange-100 text-orange-700',
  'closed-won': 'bg-green-100 text-green-700',
  'closed-lost': 'bg-red-100 text-red-700',
}

export default function Opportunities() {
  const [opportunities] = useState<Opportunity[]>(mockOpportunities)
  const [search, setSearch] = useState('')

  const filtered = opportunities.filter(o =>
    `${o.name} ${o.accountName} ${o.contactName}`.toLowerCase().includes(search.toLowerCase())
  )

  const totalPipeline = opportunities
    .filter(o => !['closed-won', 'closed-lost'].includes(o.stage))
    .reduce((sum, o) => sum + o.value, 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Opportunities</h1>
          <p className="text-gray-500 text-sm mt-1">{opportunities.length} deals · Pipeline: ${totalPipeline.toLocaleString()}</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          <Plus size={16} />
          New Opportunity
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search opportunities..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Opportunity</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Account</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Contact</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Stage</th>
                <th className="text-right px-4 py-3 text-gray-500 font-medium">Value</th>
                <th className="text-right px-4 py-3 text-gray-500 font-medium">Probability</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Close Date</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(opp => (
                <tr key={opp.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-blue-600">{opp.name}</td>
                  <td className="px-4 py-3 text-gray-600">{opp.accountName}</td>
                  <td className="px-4 py-3 text-gray-600">{opp.contactName}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${stageColors[opp.stage]}`}>
                      {opp.stage.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-gray-700">${opp.value.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 bg-gray-100 rounded-full h-1.5">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${opp.probability}%` }} />
                      </div>
                      <span className="text-gray-600 text-xs">{opp.probability}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{opp.closeDate}</td>
                  <td className="px-4 py-3">
                    <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={15} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
