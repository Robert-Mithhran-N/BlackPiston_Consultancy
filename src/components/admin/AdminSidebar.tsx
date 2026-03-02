import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Car, Users, ShoppingBag, Package, Plus,
    ChevronLeft, ChevronRight, ChevronDown,
    X, LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface AdminSidebarProps {
    collapsed: boolean;
    onToggle: () => void;
    mobileOpen: boolean;
    onMobileClose: () => void;
}

const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { label: 'Purchase Requests', icon: ShoppingBag, path: '/admin/purchase-requests' },
    {
        label: 'Inventory', icon: Package, children: [
            { label: 'Drafts', path: '/admin/inventory/drafts' },
            { label: 'Published', path: '/admin/inventory/published' },
            { label: 'Create New', path: '/admin/inventory/create', icon: Plus },
        ]
    },
    { label: 'Listings (Legacy)', icon: Car, path: '/admin/listings' },
    { label: 'Users', icon: Users, path: '/admin/users' },
];

export function AdminSidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: AdminSidebarProps) {
    const navigate = useNavigate();
    const [inventoryOpen, setInventoryOpen] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/admin-login');
    };

    return (
        <aside
            className={cn(
                'fixed top-0 left-0 z-50 h-full bg-gradient-to-b from-[#0B2E22] to-[#0F3D2E] text-white flex flex-col transition-all duration-300 shadow-luxury-lg',
                'hidden lg:flex',
                collapsed ? 'w-[72px]' : 'w-[260px]',
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
                        <span className="font-heading font-bold text-sm truncate text-[#D4B06A]">
                            Admin Console
                        </span>
                    </div>
                )}
                {collapsed && (
                    <div className="w-8 h-8 rounded-lg bg-[#C9A14A] flex items-center justify-center font-heading font-bold text-[#0B2E22] text-sm mx-auto">
                        BP
                    </div>
                )}
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
                {navItems.map((item) => {
                    // Items with children (Inventory submenu)
                    if ('children' in item && item.children) {
                        return (
                            <div key={item.label}>
                                <button
                                    onClick={() => !collapsed && setInventoryOpen(!inventoryOpen)}
                                    className={cn(
                                        'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                                        collapsed && 'justify-center px-0',
                                        'text-white/70 hover:text-white hover:bg-white/10'
                                    )}
                                >
                                    <item.icon className="w-5 h-5 shrink-0" />
                                    {!collapsed && (
                                        <>
                                            <span className="flex-1 text-left truncate">{item.label}</span>
                                            <ChevronDown className={cn('w-4 h-4 transition-transform', inventoryOpen && 'rotate-180')} />
                                        </>
                                    )}
                                </button>
                                {!collapsed && inventoryOpen && (
                                    <div className="ml-4 mt-1 space-y-0.5 border-l border-white/10 pl-3">
                                        {item.children.map((child) => (
                                            <NavLink
                                                key={child.path}
                                                to={child.path}
                                                onClick={onMobileClose}
                                                className={({ isActive }) => cn(
                                                    'flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200',
                                                    isActive
                                                        ? 'bg-[#C9A14A]/20 text-[#C9A14A]'
                                                        : 'text-white/60 hover:text-white hover:bg-white/5'
                                                )}
                                            >
                                                {'icon' in child && child.icon && <child.icon className="w-3.5 h-3.5" />}
                                                <span>{child.label}</span>
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    }

                    // Regular nav items
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path!}
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
                            <item.icon className="w-5 h-5 shrink-0" />
                            {!collapsed && <span className="truncate">{item.label}</span>}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="px-2 pb-2">
                <button
                    onClick={handleLogout}
                    className={cn(
                        'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                        'text-[#C9A14A]/70 hover:text-[#C9A14A] hover:bg-[#C9A14A]/10 border border-transparent hover:border-[#C9A14A]/20',
                        collapsed && 'justify-center px-0'
                    )}
                    aria-label="Sign out"
                >
                    <LogOut className="w-5 h-5 shrink-0" />
                    {!collapsed && <span>Sign Out</span>}
                </button>
            </div>

            {/* Collapse toggle */}
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
