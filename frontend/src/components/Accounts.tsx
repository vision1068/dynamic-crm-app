import { useState } from 'react'
import { Search, Plus, Globe, Phone, MoreVertical } from 'lucide-react'
import { mockAccounts } from '../data/mockData'
import { Account } from '../types'

export default function Accounts() {
  const [accounts] = useState<Account[]>(mockAccounts)
  const [search, setSearch] = useState('')

  const filtered = accounts.filter(a =>
    `${a.name} ${a.industry} ${a.city}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Accounts</h1>
          <p className="text-gray-500 text-sm mt-1">{accounts.length} total accounts</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          <Plus size={16} />
          New Account
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search accounts..."
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
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Account Name</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Industry</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Revenue</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Employees</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Location</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Links</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(account => (
                <tr key={account.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center text-xs font-bold">
                        {account.name[0]}
                      </div>
                      <span className="font-medium text-gray-800">{account.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{account.industry}</td>
                  <td className="px-4 py-3 text-gray-700 font-medium">${(account.revenue / 1000000).toFixed(1)}M</td>
                  <td className="px-4 py-3 text-gray-600">{account.employees.toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-600">{account.city}, {account.country}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <a href={`https://${account.website}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500"><Globe size={15} /></a>
                      <a href={`tel:${account.phone}`} className="text-gray-400 hover:text-green-500"><Phone size={15} /></a>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      account.status === 'active' ? 'bg-green-100 text-green-700' :
                      account.status === 'prospect' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {account.status}
                    </span>
                  </td>
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
