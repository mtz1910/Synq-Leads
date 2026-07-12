import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import Leads from '@/pages/Leads';
import RecuperacaoIA from '@/pages/RecuperacaoIA';
import CriativosIA from '@/pages/CriativosIA';
import WhatsApp from '@/pages/WhatsApp';
import Campanhas from '@/pages/Campanhas';
import Analytics from '@/pages/Analytics';
import Configuracoes from '@/pages/Configuracoes';
import ResetPassword from '@/pages/ResetPassword';
import NotFound from '@/pages/NotFound';
import ComingSoon from '@/pages/ComingSoon';
import ScrollToTop from '@/components/ScrollToTop';

const queryClient = new QueryClient();

// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-emerald"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

// Public route - redirects to dashboard if already logged in
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-emerald"></div>
      </div>
    );
  }
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } 
      />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/leads" element={<ProtectedRoute><Leads /></ProtectedRoute>} />
      <Route path="/recuperacao" element={<ProtectedRoute><RecuperacaoIA /></ProtectedRoute>} />
      <Route path="/criativos" element={<ProtectedRoute><CriativosIA /></ProtectedRoute>} />
      <Route path="/whatsapp" element={<ProtectedRoute><WhatsApp /></ProtectedRoute>} />
      <Route path="/campanhas" element={<ProtectedRoute><Campanhas /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      <Route path="/configuracoes" element={<ProtectedRoute><Configuracoes /></ProtectedRoute>} />
      <Route path="/automacoes" element={<ProtectedRoute><ComingSoon title="Automações" kicker="Automações" subtitle="Editor visual de fluxos — chegando na próxima fase." /></ProtectedRoute>} />
      <Route path="/agentes" element={<ProtectedRoute><ComingSoon title="Agentes IA" kicker="Agentes IA" subtitle="Configure persona, instruções e ativação dos seus agentes." /></ProtectedRoute>} />
      <Route path="/projetos" element={<ProtectedRoute><ComingSoon title="Projetos" kicker="Projetos" /></ProtectedRoute>} />
      <Route path="/pipeline" element={<ProtectedRoute><ComingSoon title="Pipeline de Leads" kicker="Pipeline" subtitle="Kanban dos leads em cada etapa do fluxo." /></ProtectedRoute>} />
      <Route path="/comentarios" element={<ProtectedRoute><ComingSoon title="Comentários" kicker="Comentários" /></ProtectedRoute>} />
      <Route path="/inbox" element={<ProtectedRoute><ComingSoon title="E-mail Inbox" kicker="Inbox" /></ProtectedRoute>} />
      <Route path="/integracoes" element={<ProtectedRoute><ComingSoon title="Conexões com o mundo" kicker="Integrações" subtitle="Conecte as plataformas que você usa e deixe o Synq Leads cuidar das mensagens." /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <div className="min-h-screen bg-background text-foreground">
            <AppRoutes />
          </div>
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
