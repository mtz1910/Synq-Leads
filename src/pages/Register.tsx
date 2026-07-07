import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { lovable } from '@/integrations/lovable/index';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Zap, Eye, EyeOff, CheckCircle2, MailCheck } from 'lucide-react';
import { toast } from 'sonner';
import { validatePassword, passwordStrength } from '@/lib/passwordValidation';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [awaitingConfirm, setAwaitingConfirm] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const strength = passwordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const check = validatePassword(password);
    if (!check.valid) {
      toast.error(check.message!);
      return;
    }
    setIsLoading(true);
    const { error } = await signUp(email, password, displayName);
    if (error) {
      const msg = error.message.toLowerCase();
      if (msg.includes('already registered') || msg.includes('user already')) {
        toast.error('Este email já está cadastrado. Faça login.');
      } else {
        toast.error('Erro ao criar conta', { description: error.message });
      }
      setIsLoading(false);
    } else {
      setAwaitingConfirm(true);
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    const result = await lovable.auth.signInWithOAuth('google', {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error('Erro ao entrar com Google', { description: result.error.message });
      setGoogleLoading(false);
      return;
    }
    if (result.redirected) return;
    navigate('/dashboard');
  };

  const perks = [
    '100 leads recuperados/mês',
    '50 criativos IA por mês',
    '1 número WhatsApp conectado',
    'Dashboard completo',
  ];

  if (awaitingConfirm) {
    return (
      <div className="min-h-screen bg-[#0F172A] text-white flex items-center justify-center p-4 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#10B981]/15 blur-[140px]" />
        </div>
        <div className="w-full max-w-md relative z-10">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 shadow-2xl text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#10B981]/15 flex items-center justify-center mb-4">
              <MailCheck className="w-8 h-8 text-[#10B981]" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Confirme seu email</h1>
            <p className="text-white/60 mb-6">
              Enviamos um link de confirmação para <span className="text-white font-medium">{email}</span>. Clique no link para ativar sua conta.
            </p>
            <Link to="/login">
              <Button className="w-full h-11 bg-[#10B981] hover:bg-[#10B981]/90 text-white">
                Ir para o login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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

          <Button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading || isLoading}
            className="w-full h-11 mb-4 bg-white text-slate-900 hover:bg-white/90 font-medium"
          >
            {googleLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            Continuar com Google
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10" /></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0F172A] px-2 text-white/40">ou com email</span>
            </div>
          </div>

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
                  id="password" type={showPassword ? 'text' : 'password'} placeholder="Mínimo 8 caracteres"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  required disabled={isLoading} minLength={8}
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
              {password.length > 0 && (
                <div className="space-y-1">
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          i < strength.score ? strength.color : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-white/50">Força: <span className="text-white/80">{strength.label}</span> · 8+ caracteres, maiúscula, minúscula, número e caractere especial.</p>
                </div>
              )}
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
