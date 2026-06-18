import { useState } from 'react'
import { Search, Plus, MoreVertical } from 'lucide-react'
import { mockLeads } from '../data/mockData'
import { Lead } from '../types'

const stageColors: Record<Lead['stage'], string> = {
  new: 'bg-gray-100 text-gray-600',
  contacted: 'bg-blue-100 text-blue-700',
  qualified: 'bg-yellow-100 text-yellow-700',
  proposal: 'bg-purple-100 text-purple-700',
  closed: 'bg-green-100 text-green-700',
}

export default function Leads() {
  const [leads] = useState<Lead[]>(mockLeads)
  const [search, setSearch] = useState('')

  const filtered = leads.filter(l =>
    `${l.firstName} ${l.lastName} ${l.company} ${l.email}`.toLowerCase().includes(search.toLowerCase())
  )

  const totalValue = leads.reduce((sum, l) => sum + l.value, 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Leads</h1>
          <p className="text-gray-500 text-sm mt-1">{leads.length} leads · Total value ${totalValue.toLocaleString()}</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          <Plus size={16} />
          New Lead
        </button>
      </div>

      <div className="grid grid-cols-5 gap-3 mb-6">
        {(['new', 'contacted', 'qualified', 'proposal', 'closed'] as Lead['stage'][]).map(stage => {
          const count = leads.filter(l => l.stage === stage).length
          return (
            <div key={stage} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-center">
              <div className="text-xl font-bold text-gray-800">{count}</div>
              <div className={`text-xs mt-1 px-2 py-0.5 rounded-full inline-block font-medium ${stageColors[stage]}`}>
                {stage.charAt(0).toUpperCase() + stage.slice(1)}
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads..."
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
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Name</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Company</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Source</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Stage</th>
                <th className="text-right px-4 py-3 text-gray-500 font-medium">Value</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Created</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(lead => (
                <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-xs font-bold">
                        {lead.firstName[0]}{lead.lastName[0]}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{lead.firstName} {lead.lastName}</div>
                        <div className="text-xs text-gray-400">{lead.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{lead.company}</td>
                  <td className="px-4 py-3 text-gray-600">{lead.source}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${stageColors[lead.stage]}`}>
                      {lead.stage.charAt(0).toUpperCase() + lead.stage.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-gray-700">${lead.value.toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-500">{lead.createdAt}</td>
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
