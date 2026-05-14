import { ReactNode } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Zap, LogOut, MessageCircle, Bot, Sparkles, BarChart3,
  Settings, Users, Activity, Megaphone,
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

export default function DashboardLayout({ title, subtitle, headerRight, children }: Props) {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const initial = (profile?.display_name || user?.email || '?').charAt(0).toUpperCase();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex">
      <aside className="w-64 border-r border-white/5 bg-[#0a0f1c]/80 backdrop-blur-xl flex flex-col sticky top-0 h-screen">
        <Link to="/" className="flex items-center gap-2 px-6 h-16 border-b border-white/5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            <Zap className="w-4 h-4 text-white" fill="white" />
          </div>
          <span className="font-bold tracking-tight">LeadVolt <span className="text-[#10B981]">AI</span></span>
        </Link>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  isActive
                    ? 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                    : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-white/5 shrink-0">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#10B981] to-emerald-700 flex items-center justify-center text-xs font-bold">
              {initial}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{profile?.display_name || 'Usuário'}</div>
              <div className="text-xs text-white/40 truncate">{user?.email}</div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleSignOut} className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/5">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="h-16 border-b border-white/5 px-8 flex items-center justify-between bg-[#0F172A]/70 backdrop-blur-xl sticky top-0 z-10">
          <div>
            <h1 className="font-bold">{title}</h1>
            {subtitle && <p className="text-xs text-white/50">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-3">
            {headerRight ?? (
              <Badge className="bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20 hover:bg-[#10B981]/15">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mr-2 animate-pulse" />
                WhatsApp conectado
              </Badge>
            )}
          </div>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
