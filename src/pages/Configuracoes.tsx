import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { LogOut } from 'lucide-react';

const NOTIF_KEYS = ['new_leads', 'daily_digest', 'campaign_alerts'] as const;
type NotifKey = typeof NOTIF_KEYS[number];

const defaultNotifs: Record<NotifKey, boolean> = {
  new_leads: true,
  daily_digest: true,
  campaign_alerts: true,
};

export default function Configuracoes() {
  const { user, profile, refreshProfile, subscription, signOut } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(profile?.display_name || '');
  const [saving, setSaving] = useState(false);
  const [notifs, setNotifs] = useState<Record<NotifKey, boolean>>(defaultNotifs);
  const storageKey = user ? `notif_prefs_${user.id}` : 'notif_prefs_guest';

  useEffect(() => {
    setName(profile?.display_name || '');
  }, [profile]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setNotifs({ ...defaultNotifs, ...JSON.parse(raw) });
    } catch {}
  }, [storageKey]);

  const save = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from('profiles').update({ display_name: name }).eq('user_id', user.id);
    localStorage.setItem(storageKey, JSON.stringify(notifs));
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    await refreshProfile();
    toast.success('Configurações salvas');
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const planName = subscription?.plan?.display_name || 'Starter';

  const notifItems: { key: NotifKey; label: string; desc: string }[] = [
    { key: 'new_leads', label: 'Alertas de novos leads', desc: 'Receba notificação quando a IA encontrar leads quentes' },
    { key: 'daily_digest', label: 'Resumo diário por email', desc: 'Métricas e receita recuperada todos os dias às 9h' },
    { key: 'campaign_alerts', label: 'Avisos de campanha', desc: 'Status de início, pausa e conclusão' },
  ];

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
          {notifItems.map((n) => (
            <div key={n.key} className="flex items-start justify-between gap-4">
              <div>
                <div className="font-medium">{n.label}</div>
                <div className="text-xs text-white/50 mt-0.5">{n.desc}</div>
              </div>
              <Switch
                checked={notifs[n.key]}
                onCheckedChange={(v) => setNotifs((p) => ({ ...p, [n.key]: v }))}
              />
            </div>
          ))}
          <p className="text-xs text-white/40">Clique em "Salvar alterações" no card ao lado para gravar suas preferências.</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6 lg:col-span-2">
          <h3 className="font-bold mb-1">Plano atual</h3>
          <p className="text-sm text-white/60 mb-4">Você está no plano <span className="text-[#10B981] font-semibold">{planName}</span>.</p>
          <Button
            onClick={() => navigate('/#pricing')}
            className="bg-[#10B981] hover:bg-[#10B981]/90 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)]"
          >
            Ver planos
          </Button>
        </div>

        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 backdrop-blur p-6 lg:col-span-2">
          <h3 className="font-bold mb-1">Zona de perigo</h3>
          <p className="text-sm text-white/60 mb-4">Sair da conta em todos os dispositivos deste navegador.</p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300">
                <LogOut className="w-4 h-4 mr-2" /> Sair da conta
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#0F172A] border-white/10 text-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Sair da conta?</AlertDialogTitle>
                <AlertDialogDescription className="text-white/60">
                  Você precisará entrar novamente para acessar o dashboard.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10">Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleSignOut} className="bg-red-500 hover:bg-red-600 text-white">
                  Sair
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </DashboardLayout>
  );
}
