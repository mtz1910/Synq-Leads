import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Megaphone } from 'lucide-react';

const campaigns = [
  { name: 'Black Friday · Carrinho abandonado', status: 'Ativa', sent: 1820, conv: '38%', revenue: 'R$ 24.190' },
  { name: 'Lançamento Curso · Lista quente', status: 'Ativa', sent: 642, conv: '27%', revenue: 'R$ 12.480' },
  { name: 'Reativação 60 dias', status: 'Agendada', sent: 0, conv: '—', revenue: 'R$ 0' },
  { name: 'Pós-venda upsell', status: 'Concluída', sent: 412, conv: '19%', revenue: 'R$ 5.870' },
];

export default function Campanhas() {
  return (
    <DashboardLayout title="Campanhas" subtitle="Disparos em massa e automações sazonais">
      <div className="space-y-5">
        <div className="flex items-center justify-end">
          <Button className="bg-[#10B981] hover:bg-[#10B981]/90 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)]">
            <Plus className="w-4 h-4 mr-2" /> Nova campanha
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {campaigns.map((c, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-5 hover:border-[#10B981]/30 transition">
              <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center shrink-0">
                    <Megaphone className="w-5 h-5 text-[#10B981]" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold truncate">{c.name}</div>
                    <div className="text-xs text-white/50 truncate">{c.sent} mensagens enviadas</div>
                  </div>
                </div>
                <Badge className={`shrink-0 ${
                  c.status === 'Ativa' ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20' :
                  c.status === 'Agendada' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                  'bg-white/5 text-white/50 border-white/10'
                }`}>{c.status}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                <div>
                  <div className="text-xs text-white/50">Conversão</div>
                  <div className="font-bold mt-0.5">{c.conv}</div>
                </div>
                <div>
                  <div className="text-xs text-white/50">Receita</div>
                  <div className="font-bold mt-0.5 text-[#10B981]">{c.revenue}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
