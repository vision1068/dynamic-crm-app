import { useState } from 'react'
import { Search, Plus, Phone, Mail, Users, CheckSquare, MoreVertical } from 'lucide-react'
import { mockActivities } from '../data/mockData'
import { Activity } from '../types'

const typeIcons = {
  call: Phone,
  email: Mail,
  meeting: Users,
  task: CheckSquare,
}

const typeColors = {
  call: 'bg-green-100 text-green-700',
  email: 'bg-blue-100 text-blue-700',
  meeting: 'bg-purple-100 text-purple-700',
  task: 'bg-orange-100 text-orange-700',
}

const statusColors: Record<Activity['status'], string> = {
  open: 'bg-yellow-100 text-yellow-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function Activities() {
  const [activities] = useState<Activity[]>(mockActivities)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | Activity['type']>('all')

  const filtered = activities.filter(a => {
    const matchSearch = `${a.subject} ${a.relatedTo} ${a.description}`.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || a.type === filter
    return matchSearch && matchFilter
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Activities</h1>
          <p className="text-gray-500 text-sm mt-1">{activities.length} total activities</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          <Plus size={16} />
          New Activity
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search activities..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-1">
            {(['all', 'call', 'email', 'meeting', 'task'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filter === f ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="divide-y divide-gray-50">
          {filtered.map(activity => {
            const Icon = typeIcons[activity.type]
            return (
              <div key={activity.id} className="px-4 py-3 hover:bg-gray-50 flex items-start gap-3">
                <div className={`p-2 rounded-lg mt-0.5 ${typeColors[activity.type]}`}>
                  <Icon size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-medium text-gray-800 text-sm">{activity.subject}</span>
                    <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${statusColors[activity.status]}`}>
                      {activity.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mb-1">{activity.description}</div>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>Related to: <span className="text-blue-600">{activity.relatedTo}</span></span>
                    <span>Due: {activity.dueDate}</span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 mt-1"><MoreVertical size={15} /></button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
