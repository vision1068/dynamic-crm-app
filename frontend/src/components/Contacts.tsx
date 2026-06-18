import { useState } from 'react'
import { Search, Plus, Mail, Phone, MoreVertical } from 'lucide-react'
import { mockContacts } from '../data/mockData'
import { Contact } from '../types'

export default function Contacts() {
  const [contacts] = useState<Contact[]>(mockContacts)
  const [search, setSearch] = useState('')

  const filtered = contacts.filter(c =>
    `${c.firstName} ${c.lastName} ${c.email} ${c.company}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Contacts</h1>
          <p className="text-gray-500 text-sm mt-1">{contacts.length} total contacts</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          <Plus size={16} />
          New Contact
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts..."
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
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Job Title</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Contact</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Status</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Created</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(contact => (
                <tr key={contact.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">
                        {contact.firstName[0]}{contact.lastName[0]}
                      </div>
                      <span className="font-medium text-gray-800">{contact.firstName} {contact.lastName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{contact.company}</td>
                  <td className="px-4 py-3 text-gray-600">{contact.jobTitle}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <a href={`mailto:${contact.email}`} className="text-gray-400 hover:text-blue-500"><Mail size={15} /></a>
                      <a href={`tel:${contact.phone}`} className="text-gray-400 hover:text-green-500"><Phone size={15} /></a>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      contact.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {contact.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{contact.createdAt}</td>
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
