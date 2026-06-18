import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Building2, Target, TrendingUp, Calendar, ChevronRight } from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/contacts', label: 'Contacts', icon: Users },
  { path: '/accounts', label: 'Accounts', icon: Building2 },
  { path: '/leads', label: 'Leads', icon: Target },
  { path: '/opportunities', label: 'Opportunities', icon: TrendingUp },
  { path: '/activities', label: 'Activities', icon: Calendar },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#243a5e] flex flex-col h-full flex-shrink-0">
      {/* Header */}
      <div className="px-4 py-4 border-b border-[#1a2d4a]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#0078d4] rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <div>
            <div className="text-white font-semibold text-sm">Dynamics 365</div>
            <div className="text-blue-300 text-xs">CRM Platform</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors group ${
                isActive
                  ? 'bg-[#0078d4] text-white'
                  : 'text-blue-200 hover:bg-[#1a2d4a] hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
            <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-50" />
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-[#1a2d4a]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#0078d4] rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">A</span>
          </div>
          <div>
            <div className="text-white text-sm font-medium">Admin User</div>
            <div className="text-blue-300 text-xs">administrator</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
