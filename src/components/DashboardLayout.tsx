import { ReactNode, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Zap, LogOut, MessageCircle, Bot, BarChart3,
  Settings, Users, Activity, Menu, LayoutDashboard, Workflow,
  FolderKanban, MessagesSquare, KanbanSquare, MessageSquareText,
  Inbox, Plug, ChevronsLeft, ChevronsRight, Lock,
} from 'lucide-react';

type NavItem = { to: string; icon: any; label: string; locked?: boolean };
type NavSection = { title: string; items: NavItem[] };

const sections: NavSection[] = [
  {
    title: 'Principal',
    items: [
      { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { to: '/analytics', icon: BarChart3, label: 'Analytics' },
      { to: '/automacoes', icon: Workflow, label: 'Automações' },
      { to: '/agentes', icon: Bot, label: 'Agentes IA' },
      { to: '/projetos', icon: FolderKanban, label: 'Projetos' },
    ],
  },
  {
    title: 'Atendimento',
    items: [
      { to: '/whatsapp', icon: MessagesSquare, label: 'Chat Ao Vivo' },
      { to: '/leads', icon: Users, label: 'Contatos' },
      { to: '/pipeline', icon: KanbanSquare, label: 'Pipeline' },
      { to: '/comentarios', icon: MessageSquareText, label: 'Comentários' },
      { to: '/inbox', icon: Inbox, label: 'E-mail Inbox', locked: true },
    ],
  },
  {
    title: 'Conta',
    items: [
      { to: '/integracoes', icon: Plug, label: 'Integrações' },
      { to: '/configuracoes', icon: Settings, label: 'Configurações' },
    ],
  },
];

interface Props {
  title: string;
  subtitle?: string;
  headerRight?: ReactNode;
  kicker?: string;
  children: ReactNode;
}

function SidebarInner({
  collapsed,
  onNavigate,
  onLogoutClick,
  onToggleCollapse,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
  onLogoutClick: () => void;
  onToggleCollapse?: () => void;
}) {
  const { user, profile } = useAuth();
  const initial = (profile?.display_name || user?.email || '?').charAt(0).toUpperCase();

  return (
    <div className="relative flex flex-col h-full bg-[#0a0f1c]/95 backdrop-blur-xl">
      {/* Logo + workspace */}
      <div className={`shrink-0 px-4 pt-5 pb-4 ${collapsed ? 'px-2' : ''}`}>
        <Link to="/dashboard" onClick={onNavigate} className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center shadow-[0_0_18px_rgba(16,185,129,0.45)] shrink-0">
            <Zap className="w-4 h-4 text-white" fill="white" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="font-bold tracking-tight leading-none">
                Synq<span className="text-[#10B981]"> Leads</span>
              </div>
              <div className="text-[10px] text-white/40 mt-1 tracking-[0.18em] uppercase">
                Workspace · Beta
              </div>
            </div>
          )}
        </Link>
      </div>

      {/* Nav sections */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-5">
        {sections.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 px-2 mb-1.5">
                {section.title}
              </div>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      `group relative w-full flex items-center gap-3 pl-3 pr-2 py-2 rounded-lg text-sm transition-all ${
                        isActive
                          ? 'bg-[#10B981]/12 text-[#10B981]'
                          : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full transition-all ${
                            isActive ? 'bg-[#10B981] shadow-[0_0_8px_#10B981]' : 'bg-white/20 group-hover:bg-white/40'
                          }`}
                        />
                        <item.icon className="w-[18px] h-[18px] shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="truncate flex-1">{item.label}</span>
                            {item.locked && <Lock className="w-3 h-3 text-white/30 shrink-0" />}
                          </>
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* User card */}
      <div className="p-3 border-t border-white/5 shrink-0">
        <div className={`flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/5 ${collapsed ? 'p-1.5 justify-center' : 'p-2'}`}>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#10B981] to-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">
            {initial}
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">
                  {profile?.display_name || 'Usuário'}
                </div>
                <div className="text-[11px] text-white/40 truncate">Membro</div>
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
            </>
          )}
        </div>
      </div>

      {/* Collapse toggle (desktop) */}
      {onToggleCollapse && (
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex absolute -right-3 top-16 w-6 h-6 rounded-full bg-[#0a0f1c] border border-white/10 items-center justify-center text-white/60 hover:text-white hover:border-[#10B981]/40 transition-all z-10"
          aria-label="Colapsar menu"
        >
          {collapsed ? <ChevronsRight className="w-3.5 h-3.5" /> : <ChevronsLeft className="w-3.5 h-3.5" />}
        </button>
      )}
    </div>
  );
}

export default function DashboardLayout({ title, subtitle, headerRight, kicker, children }: Props) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleSignOut = async () => {
    setLogoutOpen(false);
    setMobileOpen(false);
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex">
      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex sticky top-0 h-screen shrink-0 border-r border-white/5 transition-[width] duration-200 ${
          collapsed ? 'w-[76px]' : 'w-[248px]'
        }`}
      >
        <SidebarInner
          collapsed={collapsed}
          onLogoutClick={() => setLogoutOpen(true)}
          onToggleCollapse={() => setCollapsed((c) => !c)}
        />
      </aside>

      <main className="flex-1 min-w-0 overflow-auto">
        {/* Top bar (mobile trigger + optional right slot) */}
        <div className="lg:hidden sticky top-0 z-20 h-14 border-b border-white/5 px-4 flex items-center justify-between bg-[#0F172A]/80 backdrop-blur-xl">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[248px] p-0 bg-[#0a0f1c] border-white/10 text-white">
              <SidebarInner
                collapsed={false}
                onNavigate={() => setMobileOpen(false)}
                onLogoutClick={() => { setMobileOpen(false); setLogoutOpen(true); }}
              />
            </SheetContent>
          </Sheet>
          <div className="text-sm font-semibold truncate">{title}</div>
          <div className="w-9" />
        </div>

        {/* Page header (kicker + title + right slot) */}
        <div className="px-6 lg:px-10 pt-8 pb-6 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-[0.24em] text-[#10B981]/90 mb-2">
              {kicker || title}
            </div>
            <h1 className="text-3xl lg:text-[34px] font-black tracking-tight leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-white/50 mt-2 max-w-2xl">{subtitle}</p>
            )}
          </div>
          {headerRight && <div className="shrink-0">{headerRight}</div>}
        </div>

        <div className="px-6 lg:px-10 pb-10">{children}</div>
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
