import { ReactNode, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Zap, LogOut, MessageCircle, Bot, Sparkles, BarChart3,
  Settings, Users, Activity, Megaphone, Menu,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: BarChart3, label: 'Dashboard' },
  { to: '/leads', icon: Users, label: 'Leads' },
  { to: '/recuperacao', icon: Bot, label: 'Recuperação IA' },
  { to: '/criativos', icon: Sparkles, label: 'Criativos IA' },
  { to: '/whatsapp', icon: MessageCircle, label: 'WhatsApp' },
  { to: '/campanhas', icon: Megaphone, label: 'Campanhas' },
  { to: '/analytics', icon: Activity, label: 'Analytics' },
  { to: '/configuracoes', icon: Settings, label: 'Configurações' },
];

interface Props {
  title: string;
  subtitle?: string;
  headerRight?: ReactNode;
  children: ReactNode;
}

function SidebarContent({ onNavigate, onLogoutClick }: { onNavigate?: () => void; onLogoutClick: () => void }) {
  const { user, profile } = useAuth();
  const initial = (profile?.display_name || user?.email || '?').charAt(0).toUpperCase();

  return (
    <div className="flex flex-col h-full bg-[#0a0f1c]/95 backdrop-blur-xl">
      <Link to="/" onClick={onNavigate} className="flex items-center gap-2 px-6 h-16 border-b border-white/5 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
          <Zap className="w-4 h-4 text-white" fill="white" />
        </div>
        <span className="font-bold tracking-tight">Synq <span className="text-[#10B981]">Leads</span></span>
      </Link>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            onClick={onNavigate}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                isActive
                  ? 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                  : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
              }`
            }
          >
            <item.icon className="w-4 h-4 shrink-0" />
            <span className="truncate">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-white/5 shrink-0">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#10B981] to-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{profile?.display_name || 'Usuário'}</div>
            <div className="text-xs text-white/40 truncate">{user?.email}</div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onLogoutClick}
            className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/5 shrink-0"
            aria-label="Sair"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayout({ title, subtitle, headerRight, children }: Props) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleSignOut = async () => {
    setLogoutOpen(false);
    setMobileOpen(false);
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 border-r border-white/5 sticky top-0 h-screen shrink-0">
        <SidebarContent onLogoutClick={() => setLogoutOpen(true)} />
      </aside>

      <main className="flex-1 min-w-0 overflow-auto">
        <header className="h-16 border-b border-white/5 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 bg-[#0F172A]/70 backdrop-blur-xl sticky top-0 z-20">
          <div className="flex items-center gap-2 min-w-0">
            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-white/70 hover:text-white shrink-0">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0 bg-[#0a0f1c] border-white/10 text-white">
                <SidebarContent
                  onNavigate={() => setMobileOpen(false)}
                  onLogoutClick={() => { setMobileOpen(false); setLogoutOpen(true); }}
                />
              </SheetContent>
            </Sheet>
            <div className="min-w-0">
              <h1 className="font-bold truncate">{title}</h1>
              {subtitle && <p className="text-xs text-white/50 truncate hidden sm:block">{subtitle}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {headerRight ?? (
              <Badge className="bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20 hover:bg-[#10B981]/15 hidden sm:flex">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mr-2 animate-pulse" />
                WhatsApp conectado
              </Badge>
            )}
          </div>
        </header>
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>

      <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <AlertDialogContent className="bg-[#0a0f1c] border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Sair da conta?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/60">
              Você precisará entrar novamente com seu email e senha para acessar o dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleSignOut} className="bg-[#10B981] hover:bg-[#10B981]/90 text-white">
              Sair
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
