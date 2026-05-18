import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export default function Configuracoes() {
  const { user, profile, refreshProfile, subscription } = useAuth();
  const [name, setName] = useState(profile?.display_name || '');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from('profiles').update({ display_name: name }).eq('user_id', user.id);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    await refreshProfile();
    toast.success('Perfil atualizado');
  };

  const planName = subscription?.plan?.display_name || 'Starter';

  return (
    <DashboardLayout title="Configurações" subtitle="Conta, equipe e preferências">
      <div className="grid lg:grid-cols-2 gap-6 max-w-5xl">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6 space-y-4">
          <h3 className="font-bold">Perfil</h3>
          <div className="space-y-2">
            <Label className="text-white/80">Nome</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="bg-white/5 border-white/10 text-white" />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Email</Label>
            <Input value={user?.email || ''} disabled className="bg-white/5 border-white/10 text-white/60" />
          </div>
          <Button onClick={save} disabled={saving} className="bg-[#10B981] hover:bg-[#10B981]/90 text-white">
            {saving ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6 space-y-5">
          <h3 className="font-bold">Notificações</h3>
          {[
            { label: 'Alertas de novos leads', desc: 'Receba notificação quando a IA encontrar leads quentes' },
            { label: 'Resumo diário por email', desc: 'Métricas e receita recuperada todos os dias às 9h' },
            { label: 'Avisos de campanha', desc: 'Status de início, pausa e conclusão' },
          ].map((n, i) => (
            <div key={i} className="flex items-start justify-between gap-4">
              <div>
                <div className="font-medium">{n.label}</div>
                <div className="text-xs text-white/50 mt-0.5">{n.desc}</div>
              </div>
              <Switch defaultChecked />
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6 lg:col-span-2">
          <h3 className="font-bold mb-1">Plano atual</h3>
          <p className="text-sm text-white/60 mb-4">Você está no plano <span className="text-[#10B981] font-semibold">{planName}</span>.</p>
          <Link to="/">
            <Button className="bg-[#10B981] hover:bg-[#10B981]/90 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)]">
              Ver planos
            </Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
