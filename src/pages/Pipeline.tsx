import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { GripVertical, User, DollarSign } from 'lucide-react';

type Lead = { id: string; name: string; status: string; value: number | null; created_at: string };

const columns: { key: string; label: string; color: string }[] = [
  { key: 'novo',        label: 'Novo',        color: '#64748B' },
  { key: 'contato',     label: 'Em contato',  color: '#3B82F6' },
  { key: 'qualificado', label: 'Qualificado', color: '#8B5CF6' },
  { key: 'proposta',    label: 'Proposta',    color: '#F59E0B' },
  { key: 'convertido',  label: 'Convertido',  color: '#10B981' },
];

const fmtBRL = (n: number) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

const bucketOf = (status: string) => {
  const s = (status || '').toLowerCase();
  if (s.includes('convert')) return 'convertido';
  if (s.includes('propost')) return 'proposta';
  if (s.includes('qualif')) return 'qualificado';
  if (s.includes('contat') || s.includes('respond')) return 'contato';
  return 'novo';
};

export default function Pipeline() {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase.from('leads')
        .select('id,name,status,value,created_at')
        .eq('user_id', user.id).order('created_at', { ascending: false }).limit(80);
      setLeads(data ?? []);
    })();
  }, [user]);

  return (
    <DashboardLayout
      kicker="Pipeline"
      title="Pipeline de leads"
      subtitle="Acompanhe cada lead pelas etapas do seu funil."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        {columns.map((col) => {
          const items = leads.filter((l) => bucketOf(l.status) === col.key);
          const total = items.reduce((s, l) => s + Number(l.value ?? 0), 0);
          return (
            <div key={col.key} className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-3 min-h-[400px]">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: col.color, boxShadow: `0 0 8px ${col.color}` }} />
                  <div className="text-sm font-bold">{col.label}</div>
                  <Badge variant="outline" className="border-white/10 text-white/50 text-[10px] h-5">{items.length}</Badge>
                </div>
              </div>
              <div className="text-[10px] uppercase tracking-wider text-white/40 mb-3 px-1">{fmtBRL(total)}</div>
              <div className="space-y-2">
                {items.map((l) => (
                  <div key={l.id}
                    className="group rounded-xl border border-white/10 bg-[#0F172A]/60 p-3 hover:border-[#10B981]/30 cursor-grab active:cursor-grabbing transition">
                    <div className="flex items-start gap-2">
                      <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <User className="w-3.5 h-3.5 text-white/60" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium truncate">{l.name}</div>
                        <div className="flex items-center gap-1 text-xs text-white/50 mt-0.5">
                          <DollarSign className="w-3 h-3" />
                          {fmtBRL(Number(l.value ?? 0))}
                        </div>
                      </div>
                      <GripVertical className="w-3.5 h-3.5 text-white/20 group-hover:text-white/40 shrink-0" />
                    </div>
                  </div>
                ))}
                {items.length === 0 && (
                  <div className="rounded-xl border border-dashed border-white/10 p-4 text-center text-xs text-white/30">
                    Nenhum lead
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
