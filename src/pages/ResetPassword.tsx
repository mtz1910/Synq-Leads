import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Zap, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { validatePassword } from '@/lib/passwordValidation';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recoveryReady, setRecoveryReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase parses the recovery hash and fires PASSWORD_RECOVERY
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
        setRecoveryReady(true);
      }
    });
    // If hash already contains recovery token, allow submission
    if (window.location.hash.includes('type=recovery')) {
      setRecoveryReady(true);
    }
    return () => data.subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const check = validatePassword(password);
    if (!check.valid) {
      toast.error(check.message!);
      return;
    }
    if (password !== confirm) {
      toast.error('As senhas não coincidem');
      return;
    }
    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      toast.error('Erro ao atualizar senha', { description: error.message });
      setIsLoading(false);
      return;
    }
    toast.success('Senha atualizada! Faça login novamente.');
    await supabase.auth.signOut();
    navigate('/login');
  };

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
          <h1 className="text-2xl font-bold mb-1">Definir nova senha</h1>
          <p className="text-sm text-white/50 mb-6">
            {recoveryReady
              ? 'Escolha uma senha forte para sua conta.'
              : 'Link inválido ou expirado. Solicite um novo link no login.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/80">Nova senha</Label>
              <div className="relative">
                <Input
                  id="password" type={showPassword ? 'text' : 'password'} placeholder="Mínimo 8 caracteres"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  required disabled={isLoading || !recoveryReady}
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
              <p className="text-xs text-white/40">8+ caracteres, maiúscula, minúscula, número e caractere especial.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm" className="text-white/80">Confirmar senha</Label>
              <Input
                id="confirm" type={showPassword ? 'text' : 'password'} placeholder="Repita a senha"
                value={confirm} onChange={(e) => setConfirm(e.target.value)}
                required disabled={isLoading || !recoveryReady}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#10B981]/40 focus-visible:border-[#10B981]/40 h-11"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-[#10B981] hover:bg-[#10B981]/90 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]"
              disabled={isLoading || !recoveryReady}
            >
              {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Atualizando...</> : 'Atualizar senha'}
            </Button>

            <p className="text-sm text-white/50 text-center pt-2">
              <Link to="/login" className="text-[#10B981] hover:text-[#10B981]/80 font-medium">Voltar para o login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
