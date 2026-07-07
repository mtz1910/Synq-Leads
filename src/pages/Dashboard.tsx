import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import {
  Sparkles, Users, TrendingUp, DollarSign, Send, Activity,
  ArrowUpRight, Clock, Inbox,
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';

interface Lead {
  id: string;
  name: string;
  status: string;
  value: number | null;
  created_at: string;
}

interface DailyMetric {
  date: string;
  revenue_recovered: number;
  leads_recovered: number;
  messages_sent: number;
}

const fmtBRL = (n: number) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

const statusColor = (s: string) => {
  const k = s.toLowerCase();
  if (k.includes('convert')) return 'text-[#10B981]';
  if (k.includes('respond')) return 'text-blue-400';
  if (k.includes('follow')) return 'text-yellow-400';
  return 'text-white/50';
};

export default function Dashboard() {
  const { user, profile } = useAuth();
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [metrics, setMetrics] = useState<DailyMetric[]>([]);
  const [totals, setTotals] = useState({ recovered: 0, revenue: 0, messages: 0, responseRate: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [leadsRes, metricsRes] = await Promise.all([
        supabase.from('leads').select('id,name,status,value,created_at').eq('user_id', user.id).order('created_at', { ascending: false }).limit(5),
        supabase.from('metrics_daily').select('date,revenue_recovered,leads_recovered,messages_sent').eq('user_id', user.id).order('date', { ascending: true }).limit(14),
      ]);
      setRecentLeads(leadsRes.data ?? []);
      setMetrics(metricsRes.data ?? []);

      const m = metricsRes.data ?? [];
      const recovered = m.reduce((s, d) => s + (d.leads_recovered ?? 0), 0);
      const revenue = m.reduce((s, d) => s + Number(d.revenue_recovered ?? 0), 0);
      const messages = m.reduce((s, d) => s + (d.messages_sent ?? 0), 0);
      setTotals({ recovered, revenue, messages, responseRate: 0 });
      setLoading(false);
    })();
  }, [user]);

  const firstName = profile?.display_name?.split(' ')[0] || 'pronto para faturar';
  const hasData = metrics.length > 0;

  const chartData = metrics.map(d => ({
    date: new Date(d.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    receita: Number(d.revenue_recovered ?? 0),
  }));

  const stats = [
    { label: 'Leads recuperados', value: totals.recovered.toLocaleString('pt-BR'), icon: Users },
    { label: 'Receita gerada', value: fmtBRL(totals.revenue), icon: DollarSign },
    { label: 'Mensagens enviadas', value: totals.messages.toLocaleString('pt-BR'), icon: Send },
    { label: 'Taxa de resposta', value: `${totals.responseRate}%`, icon: TrendingUp },
  ];

  const headerRight = (
    <Link to="/criativos">
      <Button className="bg-[#10B981] hover:bg-[#10B981]/90 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)]">
        <Sparkles className="w-4 h-4 mr-2" /> Gerar criativo IA
      </Button>
    </Link>
  );

  return (
    <DashboardLayout title="Visão geral" subtitle="Acompanhe sua operação em tempo real" headerRight={headerRight}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Olá, {firstName} 👋</h2>
          <p className="text-white/50 mt-1">
            {hasData
              ? <>Receita recuperada nos últimos 14 dias: <span className="text-[#10B981] font-semibold">{fmtBRL(totals.revenue)}</span></>
              : 'Sua conta está pronta. Conecte o WhatsApp e importe seus leads para começar a recuperar receita.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur p-5 hover:border-[#10B981]/30 transition-colors">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold">Receita recuperada</h3>
                <p className="text-xs text-white/50">Últimos 14 dias</p>
              </div>
              {hasData && <Badge variant="outline" className="border-[#10B981]/30 bg-[#10B981]/10 text-[#10B981]">{fmtBRL(totals.revenue)}</Badge>}
            </div>
            <div className="h-56">
              {hasData ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                    <defs>
                      <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity={0.55} />
                        <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="date" stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `R$${v}`} />
                    <Tooltip
                      contentStyle={{ background: '#0F172A', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 8, fontSize: 12 }}
                      labelStyle={{ color: 'rgba(255,255,255,0.6)' }}
                      formatter={(v: number) => [fmtBRL(v), 'Receita']}
                    />
                    <Area type="monotone" dataKey="receita" stroke="#10B981" strokeWidth={2} fill="url(#rev)" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-white/40">
                  <Activity className="w-8 h-8 mb-2" />
                  <p className="text-sm">Sem dados ainda. Suas métricas aparecerão aqui após a primeira recuperação.</p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Atividade recente</h3>
              <Activity className="w-4 h-4 text-[#10B981]" />
            </div>
            {recentLeads.length === 0 ? (
              <div className="py-8 text-center text-white/40">
                <Inbox className="w-7 h-7 mx-auto mb-2" />
                <p className="text-sm">Nenhum lead ainda</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentLeads.map((l) => (
                  <div key={l.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.03] transition">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-medium">
                      {l.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{l.name}</div>
                      <div className={`text-xs ${statusColor(l.status)}`}>{l.status}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{fmtBRL(Number(l.value ?? 0))}</div>
                      <div className="text-xs text-white/40 flex items-center gap-1 justify-end">
                        <Clock className="w-3 h-3" /> {new Date(l.created_at).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {!loading && !hasData && (
          <div className="rounded-2xl border border-[#10B981]/20 bg-gradient-to-br from-[#10B981]/10 via-white/[0.03] to-transparent backdrop-blur p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold mb-1">Comece em 2 passos</h3>
              <p className="text-sm text-white/60">Conecte seu WhatsApp e importe seus leads para a IA começar a trabalhar.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to="/whatsapp"><Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">Conectar WhatsApp</Button></Link>
              <Link to="/leads"><Button className="bg-[#10B981] hover:bg-[#10B981]/90 text-white">Importar leads <ArrowUpRight className="w-4 h-4 ml-2" /></Button></Link>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
