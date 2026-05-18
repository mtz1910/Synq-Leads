import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Bot, Sparkles, Play, Pause, Inbox } from 'lucide-react';
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

export default function RecuperacaoIA() {
  const { user } = useAuth();
  const [seqs, setSeqs] = useState<Campaign[]>([]);

  const load = async () => {
    if (!user) return;
    const { data } = await supabase.from('campaigns').select('id,name,status,leads_count,conversion_rate,revenue').eq('user_id', user.id).order('created_at', { ascending: false });
    setSeqs(data ?? []);
  };
  useEffect(() => { load(); }, [user]);

  const toggle = async (c: Campaign) => {
    const next = c.status === 'ativa' ? 'pausada' : 'ativa';
    const { error } = await supabase.from('campaigns').update({ status: next }).eq('id', c.id);
    if (error) { toast.error(error.message); return; }
    toast.success(next === 'ativa' ? 'Sequência ativada' : 'Sequência pausada');
    load();
  };

  return (
    <DashboardLayout title="Recuperação IA" subtitle="Sequências automáticas que reativam leads frios no WhatsApp">
      <div className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <h3 className="font-bold">Sequências</h3>
            <Link to="/campanhas">
              <Button className="bg-[#10B981] hover:bg-[#10B981]/90 text-white">
                <Sparkles className="w-4 h-4 mr-2" /> Criar sequência
              </Button>
            </Link>
          </div>
          {seqs.length === 0 ? (
            <div className="py-16 text-center text-white/40">
              <Inbox className="w-10 h-10 mx-auto mb-3" />
              <p className="font-medium text-white/70">Nenhuma sequência ainda</p>
              <p className="text-sm mt-1">Crie sua primeira sequência em "Campanhas".</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {seqs.map((s) => (
                <div key={s.id} className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition gap-3">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center shrink-0">
                      <Bot className="w-5 h-5 text-[#10B981]" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium truncate">{s.name}</div>
                      <div className="text-xs text-white/50 mt-0.5 truncate">
                        {s.leads_count ?? 0} leads · conv. {Number(s.conversion_rate ?? 0).toFixed(0)}% · {fmtBRL(Number(s.revenue ?? 0))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Badge className={s.status === 'ativa'
                      ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20'
                      : 'bg-white/5 text-white/50 border-white/10'}>
                      {s.status}
                    </Badge>
                    <Button size="icon" variant="ghost" onClick={() => toggle(s)} className="h-8 w-8 text-white/60 hover:text-white">
                      {s.status === 'ativa' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
