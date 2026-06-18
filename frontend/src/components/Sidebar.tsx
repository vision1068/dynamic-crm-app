import { LayoutDashboard, Users, Building2, TrendingUp, Target, Calendar, Settings, ChevronRight } from 'lucide-react'
import { Page } from '../App'

interface SidebarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

const navItems = [
  { id: 'dashboard' as Page, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'contacts' as Page, label: 'Contacts', icon: Users },
  { id: 'accounts' as Page, label: 'Accounts', icon: Building2 },
  { id: 'leads' as Page, label: 'Leads', icon: TrendingUp },
  { id: 'opportunities' as Page, label: 'Opportunities', icon: Target },
  { id: 'activities' as Page, label: 'Activities', icon: Calendar },
]

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <aside className="w-64 bg-blue-900 text-white flex flex-col">
      <div className="p-4 border-b border-blue-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center font-bold text-sm">D</div>
          <div>
            <div className="font-semibold text-sm">Dynamics 365</div>
            <div className="text-xs text-blue-300">CRM Platform</div>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3">
        {navItems.map(item => {
          const Icon = item.icon
          const isActive = currentPage === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-200 hover:bg-blue-800 hover:text-white'
              }`}
            >
              <Icon size={18} />
              <span className="flex-1 text-left">{item.label}</span>
              {isActive && <ChevronRight size={14} />}
            </button>
          )
        })}
      </nav>
      <div className="p-3 border-t border-blue-800">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-blue-200 hover:bg-blue-800 hover:text-white transition-colors">
          <Settings size={18} />
          <span>Settings</span>
        </button>
        <div className="mt-3 flex items-center gap-2 px-3">
          <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">JD</div>
          <div>
            <div className="text-xs font-medium">John Doe</div>
            <div className="text-xs text-blue-400">Admin</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
