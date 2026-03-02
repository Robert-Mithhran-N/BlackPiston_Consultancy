import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard, Car, Users, Shield, CreditCard, Settings,
    ChevronLeft, ChevronRight, FileText, BarChart3, Gavel,
    HelpCircle, FolderOpen, Ticket, X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminSidebarProps {
    collapsed: boolean;
    onToggle: () => void;
    mobileOpen: boolean;
    onMobileClose: () => void;
}

const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { label: 'Listings', icon: Car, path: '/admin/listings' },
    { label: 'Users', icon: Users, path: '/admin/users' },
    { label: 'Sellers', icon: FileText, path: '/admin/sellers' },
    { label: 'Moderation', icon: Shield, path: '/admin/moderation' },
    { label: 'Orders', icon: Ticket, path: '/admin/orders' },
    { label: 'Finance', icon: CreditCard, path: '/admin/finance' },
    { label: 'Reports', icon: BarChart3, path: '/admin/reports' },
    { label: 'Audit Logs', icon: Gavel, path: '/admin/audit' },
    { label: 'File Manager', icon: FolderOpen, path: '/admin/files' },
    { label: 'Settings', icon: Settings, path: '/admin/settings' },
    { label: 'Help', icon: HelpCircle, path: '/admin/help' },
];

export function AdminSidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: AdminSidebarProps) {
    return (
        <aside
            className={cn(
                'fixed top-0 left-0 z-50 h-full bg-gradient-to-b from-[#0B2E22] to-[#0F3D2E] text-white flex flex-col transition-all duration-300 shadow-luxury-lg',
                // Desktop
                'hidden lg:flex',
                collapsed ? 'w-[72px]' : 'w-[260px]',
                // Mobile override
                mobileOpen && '!flex w-[280px]'
            )}
            role="navigation"
            aria-label="Admin navigation"
        >
            {/* Logo / Brand */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
                {!collapsed && (
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-[#C9A14A] flex items-center justify-center font-heading font-bold text-[#0B2E22] text-sm shrink-0">
                            BP
                        </div>
                        <span className="font-heading font-bold text-sm truncate text-[#E7D3A3]">
                            Admin Console
                        </span>
                    </div>
                )}
                {collapsed && (
                    <div className="w-8 h-8 rounded-lg bg-[#C9A14A] flex items-center justify-center font-heading font-bold text-[#0B2E22] text-sm mx-auto">
                        BP
                    </div>
                )}
                {/* Mobile close */}
                <button
                    className="lg:hidden p-1 rounded hover:bg-white/10 transition-colors"
                    onClick={onMobileClose}
                    aria-label="Close sidebar"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Nav items */}
            <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/admin'}
                        onClick={onMobileClose}
                        className={({ isActive }) => cn(
                            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group',
                            collapsed && 'justify-center px-0',
                            isActive
                                ? 'bg-[#C9A14A]/20 text-[#C9A14A] shadow-sm'
                                : 'text-white/70 hover:text-white hover:bg-white/10'
                        )}
                    >
                        <item.icon className={cn('w-5 h-5 shrink-0', collapsed && 'w-5 h-5')} />
                        {!collapsed && <span className="truncate">{item.label}</span>}
                    </NavLink>
                ))}
            </nav>

            {/* Collapse toggle — desktop only */}
            <div className="hidden lg:flex border-t border-white/10 p-3">
                <button
                    onClick={onToggle}
                    className="flex items-center justify-center w-full p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                    aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                    {!collapsed && <span className="ml-2 text-xs">Collapse</span>}
                </button>
            </div>
        </aside>
    );
}
