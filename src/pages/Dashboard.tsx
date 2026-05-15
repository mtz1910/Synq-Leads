import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Bot, Sparkles, Users, TrendingUp, DollarSign, Send, Activity,
  ArrowUpRight, CheckCircle2, Clock,
} from 'lucide-react';

const stats = [
  { label: 'Leads recuperados', value: '1.284', delta: '+24%', icon: Users },
  { label: 'Receita gerada', value: 'R$ 87.430', delta: '+38%', icon: DollarSign },
  { label: 'Mensagens enviadas', value: '8.921', delta: '+15%', icon: Send },
  { label: 'Taxa de resposta', value: '64%', delta: '+12%', icon: TrendingUp },
];

const chartData = [42, 58, 51, 67, 60, 78, 72, 85, 79, 91, 86, 98, 92, 100];

const recentLeads = [
  { name: 'Carlos Mendes', status: 'Convertido', value: 'R$ 297', time: '2min', color: 'text-[#10B981]' },
  { name: 'Mariana Silva', status: 'Respondeu', value: 'R$ 197', time: '8min', color: 'text-blue-400' },
  { name: 'João Pereira', status: 'Em follow-up', value: 'R$ 497', time: '14min', color: 'text-yellow-400' },
  { name: 'Beatriz Costa', status: 'Convertido', value: 'R$ 197', time: '23min', color: 'text-[#10B981]' },
  { name: 'Rafael Souza', status: 'Aguardando', value: 'R$ 97', time: '38min', color: 'text-white/50' },
];

export default function Dashboard() {
  const { profile } = useAuth();
  const firstName = profile?.display_name?.split(' ')[0] || 'pronto para faturar';

  const headerRight = (
    <>
      <Badge className="bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20 hover:bg-[#10B981]/15">
        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mr-2 animate-pulse" />
        WhatsApp conectado
      </Badge>
      <Button className="bg-[#10B981] hover:bg-[#10B981]/90 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)]">
        <Sparkles className="w-4 h-4 mr-2" /> Gerar criativo IA
      </Button>
    </>
  );

  return (
    <DashboardLayout title="Visão geral" subtitle="Acompanhe sua operação em tempo real" headerRight={headerRight}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Olá, {firstName} 👋</h2>
          <p className="text-white/50 mt-1">A IA recuperou <span className="text-[#10B981] font-semibold">R$ 4.280</span> nas últimas 24h.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur p-5 hover:border-[#10B981]/30 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center">
                  <s.icon className="w-4 h-4 text-[#10B981]" />
                </div>
                <span className="text-xs text-[#10B981] flex items-center gap-1 font-medium">
                  <ArrowUpRight className="w-3 h-3" /> {s.delta}
                </span>
              </div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-white/50 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold">Receita recuperada</h3>
                <p className="text-xs text-white/50">Últimos 14 dias</p>
              </div>
              <Badge variant="outline" className="border-white/10 bg-white/5 text-white/70">+38% vs período anterior</Badge>
            </div>
            <div className="h-56 flex items-end gap-2">
              {chartData.map((h, i) => (
                <div key={i} className="flex-1 group">
                  <div className="w-full rounded-t-md bg-gradient-to-t from-[#10B981]/20 to-[#10B981] transition-all group-hover:shadow-[0_0_15px_rgba(16,185,129,0.5)]" style={{ height: `${h}%` }} />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Atividade recente</h3>
              <Activity className="w-4 h-4 text-[#10B981]" />
            </div>
            <div className="space-y-3">
              {recentLeads.map((l, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.03] transition">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-medium">
                    {l.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{l.name}</div>
                    <div className={`text-xs ${l.color}`}>{l.status}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">{l.value}</div>
                    <div className="text-xs text-white/40 flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3" /> {l.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#10B981]/20 bg-gradient-to-br from-[#10B981]/10 via-white/[0.03] to-transparent backdrop-blur p-5 sm:p-6 shadow-[0_0_40px_rgba(16,185,129,0.1)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3 sm:gap-4 min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] shrink-0">
                <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-[#10B981]" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-bold text-sm sm:text-base">A IA encontrou 47 leads quentes para recuperar</h3>
                  <Badge className="bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Pronto
                  </Badge>
                </div>
                <p className="text-sm text-white/60">
                  Sequência personalizada com gatilhos de urgência e prova social. Receita estimada: <span className="text-[#10B981] font-semibold">R$ 6.420</span>.
                </p>
              </div>
            </div>
            <Button className="bg-[#10B981] hover:bg-[#10B981]/90 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] w-full md:w-auto shrink-0">
              Disparar campanha <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
