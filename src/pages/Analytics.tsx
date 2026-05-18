import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { TrendingUp, DollarSign, Users, Send, Activity } from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';

interface DailyMetric {
  date: string;
  revenue_recovered: number;
  leads_recovered: number;
  messages_sent: number;
  leads_new: number;
}

const fmtBRL = (n: number) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

export default function Analytics() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<DailyMetric[]>([]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from('metrics_daily')
        .select('date,revenue_recovered,leads_recovered,messages_sent,leads_new')
        .eq('user_id', user.id)
        .order('date', { ascending: true })
        .limit(30);
      setMetrics(data ?? []);
    })();
  }, [user]);

  const totals = metrics.reduce(
    (a, d) => ({
      revenue: a.revenue + Number(d.revenue_recovered ?? 0),
      recovered: a.recovered + (d.leads_recovered ?? 0),
      messages: a.messages + (d.messages_sent ?? 0),
      newLeads: a.newLeads + (d.leads_new ?? 0),
    }),
    { revenue: 0, recovered: 0, messages: 0, newLeads: 0 }
  );

  const stats = [
    { label: 'Receita 30d', value: fmtBRL(totals.revenue), icon: DollarSign },
    { label: 'Leads recuperados', value: totals.recovered.toLocaleString('pt-BR'), icon: Users },
    { label: 'Mensagens', value: totals.messages.toLocaleString('pt-BR'), icon: Send },
    { label: 'Novos leads', value: totals.newLeads.toLocaleString('pt-BR'), icon: TrendingUp },
  ];

  const chartData = metrics.map((d) => ({
    date: new Date(d.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    receita: Number(d.revenue_recovered ?? 0),
  }));

  const hasData = metrics.length > 0;

  return (
    <DashboardLayout title="Analytics" subtitle="Métricas detalhadas da sua operação">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center">
                  <s.icon className="w-4 h-4 text-[#10B981]" />
                </div>
              </div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-white/50 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6">
          <h3 className="font-bold mb-1">Receita recuperada</h3>
          <p className="text-xs text-white/50 mb-6">Últimos 30 dias</p>
          <div className="h-72">
            {hasData ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `R$${v}`} />
                  <Tooltip
                    contentStyle={{ background: '#0F172A', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 8, fontSize: 12 }}
                    labelStyle={{ color: 'rgba(255,255,255,0.6)' }}
                    formatter={(v: number) => [fmtBRL(v), 'Receita']}
                    cursor={{ fill: 'rgba(16,185,129,0.08)' }}
                  />
                  <Bar dataKey="receita" fill="#10B981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-white/40">
                <Activity className="w-8 h-8 mb-2" />
                <p className="text-sm">Sem dados ainda. As métricas aparecerão conforme a operação rodar.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
