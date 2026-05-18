import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Plus, Megaphone, Inbox } from 'lucide-react';
import { toast } from 'sonner';

interface Campaign {
  id: string;
  name: string;
  status: string;
  leads_count: number | null;
  conversion_rate: number | null;
  revenue: number | null;
}

const fmtBRL = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export default function Campanhas() {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', sequence_type: 'Carrinho abandonado' });

  const load = async () => {
    if (!user) return;
    const { data } = await supabase.from('campaigns').select('id,name,status,leads_count,conversion_rate,revenue').eq('user_id', user.id).order('created_at', { ascending: false });
    setCampaigns(data ?? []);
  };
  useEffect(() => { load(); }, [user]);

  const create = async () => {
    if (!user || !form.name.trim()) { toast.error('Nome obrigatório'); return; }
    const { error } = await supabase.from('campaigns').insert({
      user_id: user.id, name: form.name.trim(), sequence_type: form.sequence_type, status: 'rascunho',
    });
    if (error) { toast.error(error.message); return; }
    toast.success('Campanha criada');
    setForm({ name: '', sequence_type: 'Carrinho abandonado' });
    setOpen(false);
    load();
  };

  return (
    <DashboardLayout title="Campanhas" subtitle="Disparos em massa e automações sazonais">
      <div className="space-y-5">
        <div className="flex items-center justify-end">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#10B981] hover:bg-[#10B981]/90 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)]">
                <Plus className="w-4 h-4 mr-2" /> Nova campanha
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0F172A] border-white/10 text-white">
              <DialogHeader><DialogTitle>Nova campanha</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div className="space-y-1.5"><Label>Nome *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-white/5 border-white/10" /></div>
                <div className="space-y-1.5"><Label>Tipo de sequência</Label><Input value={form.sequence_type} onChange={(e) => setForm({ ...form, sequence_type: e.target.value })} className="bg-white/5 border-white/10" /></div>
              </div>
              <DialogFooter><Button onClick={create} className="bg-[#10B981] hover:bg-[#10B981]/90 text-white">Criar</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {campaigns.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur py-16 text-center text-white/40">
            <Inbox className="w-10 h-10 mx-auto mb-3" />
            <p className="font-medium text-white/70">Nenhuma campanha ainda</p>
            <p className="text-sm mt-1">Clique em "Nova campanha" para criar a primeira.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {campaigns.map((c) => (
              <div key={c.id} className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-5 hover:border-[#10B981]/30 transition">
                <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center shrink-0">
                      <Megaphone className="w-5 h-5 text-[#10B981]" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{c.name}</div>
                      <div className="text-xs text-white/50 truncate">{c.leads_count ?? 0} leads</div>
                    </div>
                  </div>
                  <Badge className={`shrink-0 ${
                    c.status === 'ativa' ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20' :
                    c.status === 'agendada' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                    'bg-white/5 text-white/50 border-white/10'
                  }`}>{c.status}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                  <div>
                    <div className="text-xs text-white/50">Conversão</div>
                    <div className="font-bold mt-0.5">{Number(c.conversion_rate ?? 0).toFixed(0)}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/50">Receita</div>
                    <div className="font-bold mt-0.5 text-[#10B981]">{fmtBRL(Number(c.revenue ?? 0))}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
