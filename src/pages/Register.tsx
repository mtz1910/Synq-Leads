import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Zap, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres');
      return;
    }
    setIsLoading(true);
    const { error } = await signUp(email, password, displayName);
    if (error) {
      toast.error('Erro ao criar conta', { description: error.message });
      setIsLoading(false);
    } else {
      toast.success('Conta criada! Bem-vindo ao Synq Leads 🚀');
      navigate('/dashboard');
    }
  };

  const perks = [
    '100 leads recuperados/mês',
    '50 criativos IA por mês',
    '1 número WhatsApp conectado',
    'Dashboard completo',
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#10B981]/15 blur-[140px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
              <Zap className="w-5 h-5 text-white" fill="white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">Synq <span className="text-[#10B981]">Leads</span></span>
          </Link>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 shadow-2xl">
          <h1 className="text-2xl font-bold mb-1">Crie sua conta grátis</h1>
          <p className="text-sm text-white/50 mb-6">Comece a recuperar leads em menos de 5 minutos.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName" className="text-white/80">Nome</Label>
              <Input
                id="displayName" type="text" placeholder="Seu nome"
                value={displayName} onChange={(e) => setDisplayName(e.target.value)}
                disabled={isLoading}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#10B981]/40 focus-visible:border-[#10B981]/40 h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">Email</Label>
              <Input
                id="email" type="email" placeholder="voce@empresa.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
                required disabled={isLoading}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#10B981]/40 focus-visible:border-[#10B981]/40 h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/80">Senha</Label>
              <div className="relative">
                <Input
                  id="password" type={showPassword ? 'text' : 'password'} placeholder="Mínimo 6 caracteres"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  required disabled={isLoading} minLength={6}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#10B981]/40 focus-visible:border-[#10B981]/40 h-11 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-[#10B981]/20 bg-[#10B981]/5 p-4 space-y-2">
              <p className="text-xs font-semibold text-[#10B981] uppercase tracking-wide">Plano Starter — grátis para sempre</p>
              <ul className="space-y-1.5">
                {perks.map((p, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-[#10B981] hover:bg-[#10B981]/90 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]"
              disabled={isLoading}
            >
              {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Criando conta...</> : 'Criar conta grátis'}
            </Button>

            <p className="text-sm text-white/50 text-center pt-2">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-[#10B981] hover:text-[#10B981]/80 font-medium">Entrar</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
