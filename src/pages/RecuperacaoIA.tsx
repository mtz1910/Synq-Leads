import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, Sparkles, Play, Pause, ArrowUpRight } from 'lucide-react';

const sequences = [
  { name: 'Carrinho abandonado · 3 toques', status: 'Ativa', leads: 482, conv: '34%', revenue: 'R$ 18.420' },
  { name: 'Lead frio 7 dias · oferta com bônus', status: 'Ativa', leads: 217, conv: '21%', revenue: 'R$ 8.110' },
  { name: 'Reativação clientes inativos', status: 'Pausada', leads: 0, conv: '—', revenue: 'R$ 0' },
];

const samples = [
  { from: 'IA', text: 'Oi Carlos! 👋 Notei que você esteve perto de garantir o seu kit ontem. Separei um cupom de 15% que vence em 3h: KIT15. Posso reservar pra você?' },
  { from: 'Lead', text: 'Hmm, tava em dúvida no tamanho.' },
  { from: 'IA', text: 'Tranquilo! O M veste do 38 ao 42 e tem troca grátis em 30 dias. Fechamos com o cupom?' },
];

export default function RecuperacaoIA() {
  return (
    <DashboardLayout title="Recuperação IA" subtitle="Sequências automáticas que reativam leads frios no WhatsApp">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <h3 className="font-bold">Sequências ativas</h3>
              <Button className="bg-[#10B981] hover:bg-[#10B981]/90 text-white">
                <Sparkles className="w-4 h-4 mr-2" /> Criar com IA
              </Button>
            </div>
            <div className="divide-y divide-white/5">
              {sequences.map((s, i) => (
                <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-[#10B981]" />
                    </div>
                    <div>
                      <div className="font-medium">{s.name}</div>
                      <div className="text-xs text-white/50 mt-0.5">
                        {s.leads} leads · conv. {s.conv} · {s.revenue}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={s.status === 'Ativa'
                      ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20'
                      : 'bg-white/5 text-white/50 border-white/10'}>
                      {s.status}
                    </Badge>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-white/60 hover:text-white">
                      {s.status === 'Ativa' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#10B981]/20 bg-gradient-to-br from-[#10B981]/10 to-transparent p-6 backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-bold mb-1">A IA encontrou 47 leads quentes para recuperar</h3>
                <p className="text-sm text-white/60">Receita estimada: <span className="text-[#10B981] font-semibold">R$ 6.420</span></p>
              </div>
              <Button className="bg-[#10B981] hover:bg-[#10B981]/90 text-white">
                Disparar <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-5">
          <h3 className="font-bold mb-4">Pré-visualização da conversa</h3>
          <div className="space-y-3">
            {samples.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'IA' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${
                  m.from === 'IA'
                    ? 'bg-[#10B981]/15 text-white rounded-bl-sm border border-[#10B981]/20'
                    : 'bg-white/10 text-white rounded-br-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
