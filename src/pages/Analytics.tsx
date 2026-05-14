import DashboardLayout from '@/components/DashboardLayout';
import { TrendingUp, DollarSign, Users, Send } from 'lucide-react';

const stats = [
  { label: 'Receita 30d', value: 'R$ 87.430', delta: '+38%', icon: DollarSign },
  { label: 'Leads ativos', value: '4.120', delta: '+24%', icon: Users },
  { label: 'Mensagens', value: '8.921', delta: '+15%', icon: Send },
  { label: 'ROI médio', value: '7.4x', delta: '+12%', icon: TrendingUp },
];

const bars = [42, 58, 51, 67, 60, 78, 72, 85, 79, 91, 86, 98, 92, 100];
const sources = [
  { name: 'Carrinho abandonado', pct: 48, value: 'R$ 41.800' },
  { name: 'Anúncios Meta', pct: 27, value: 'R$ 23.610' },
  { name: 'TikTok Ads', pct: 16, value: 'R$ 13.990' },
  { name: 'Orgânico', pct: 9, value: 'R$ 8.030' },
];

export default function Analytics() {
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
                <span className="text-xs text-[#10B981] font-medium">{s.delta}</span>
              </div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-white/50 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6">
            <h3 className="font-bold mb-1">Receita recuperada</h3>
            <p className="text-xs text-white/50 mb-6">Últimos 14 dias</p>
            <div className="h-56 flex items-end gap-2">
              {bars.map((h, i) => (
                <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-[#10B981]/20 to-[#10B981]" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6">
            <h3 className="font-bold mb-5">Origem da receita</h3>
            <div className="space-y-4">
              {sources.map((s, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5 text-sm">
                    <span className="text-white/80">{s.name}</span>
                    <span className="text-white/60">{s.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#10B981] to-emerald-400" style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
