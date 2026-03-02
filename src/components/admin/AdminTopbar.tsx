import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, Sun, Moon, LogOut, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface AdminTopbarProps {
    onMenuClick: () => void;
    sidebarCollapsed: boolean;
}

export function AdminTopbar({ onMenuClick }: AdminTopbarProps) {
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-xl border-b border-border flex items-center justify-between px-4 md:px-6 lg:px-8">
            {/* Left: Menu + Search */}
            <div className="flex items-center gap-3 flex-1">
                <button
                    className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                    onClick={onMenuClick}
                    aria-label="Open menu"
                >
                    <Menu className="w-5 h-5" />
                </button>

                <div className="relative hidden md:block w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search listings, users, orders..."
                        className="pl-10 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-[#C9A14A]/50 h-9"
                    />
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
                {/* Theme toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    className="h-9 w-9 text-muted-foreground hover:text-foreground"
                    aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>

                {/* Notifications */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground relative">
                            <Bell className="w-4 h-4" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C9A14A] rounded-full ring-2 ring-background" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <div className="px-3 py-2 font-heading font-semibold text-sm">Notifications</div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                            <span className="text-sm font-medium">New listing pending review</span>
                            <span className="text-xs text-muted-foreground">2024 Harley-Davidson Street Bob — 2 minutes ago</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                            <span className="text-sm font-medium">VIN alert flagged</span>
                            <span className="text-xs text-muted-foreground">Kawasaki Ninja ZX-10R — suspicious VIN pattern — 1 hour ago</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                            <span className="text-sm font-medium">Refund request</span>
                            <span className="text-xs text-muted-foreground">$2,500 refund for Ducati Panigale V4 — 5 hours ago</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* User Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-muted transition-colors">
                            <div className="w-8 h-8 rounded-full bg-[#0B2E22] flex items-center justify-center text-[#C9A14A] font-heading font-bold text-xs">
                                RK
                            </div>
                            <div className="hidden md:block text-left">
                                <div className="text-sm font-medium leading-none">Rajesh Kumar</div>
                                <div className="text-xs text-muted-foreground">Superadmin</div>
                            </div>
                            <ChevronDown className="w-3 h-3 text-muted-foreground hidden md:block" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem>
                            <User className="w-4 h-4 mr-2" />
                            My Profile
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigate('/admin/login')} className="text-destructive">
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
