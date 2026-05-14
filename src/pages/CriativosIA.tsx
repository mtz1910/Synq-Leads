import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Copy, Wand2 } from 'lucide-react';
import { toast } from 'sonner';

const samples = [
  { type: 'Headline', text: 'Pare de perder vendas: recupere 64% dos leads esquecidos no WhatsApp em 24h.' },
  { type: 'Hook UGC', text: 'Eu não acreditava que uma IA podia trazer R$ 18 mil de volta no meu Shopify... até testar isso.' },
  { type: 'Copy Meta', text: '🚨 Seus leads estão esfriando. Cada hora sem follow-up = -7% de conversão. A LeadVolt AI cuida disso por você no automático. Teste grátis →' },
  { type: 'CTA', text: 'Quero recuperar minhas vendas perdidas agora →' },
];

export default function CriativosIA() {
  const [generating, setGenerating] = useState(false);

  const generate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); toast.success('4 novos criativos gerados!'); }, 1200);
  };

  const copy = (t: string) => { navigator.clipboard.writeText(t); toast.success('Copiado!'); };

  return (
    <DashboardLayout title="Criativos IA" subtitle="Gere headlines, hooks e copies de anúncio em segundos">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6 space-y-4">
          <h3 className="font-bold">Briefing</h3>
          <div className="space-y-2">
            <Label className="text-white/80">Produto / oferta</Label>
            <Input placeholder="Ex: Curso de marketing digital" className="bg-white/5 border-white/10 text-white placeholder:text-white/40" />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Público</Label>
            <Input placeholder="Ex: Afiliados iniciantes" className="bg-white/5 border-white/10 text-white placeholder:text-white/40" />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Diferencial</Label>
            <Textarea placeholder="O que torna sua oferta única..." className="bg-white/5 border-white/10 text-white placeholder:text-white/40 min-h-24" />
          </div>
          <Button onClick={generate} disabled={generating} className="w-full bg-[#10B981] hover:bg-[#10B981]/90 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)]">
            <Wand2 className="w-4 h-4 mr-2" /> {generating ? 'Gerando...' : 'Gerar criativos com IA'}
          </Button>
        </div>

        <div className="lg:col-span-2 space-y-3">
          {samples.map((s, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-5 hover:border-[#10B981]/30 transition">
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20">
                  <Sparkles className="w-3 h-3 mr-1" /> {s.type}
                </Badge>
                <Button size="sm" variant="ghost" onClick={() => copy(s.text)} className="text-white/60 hover:text-white hover:bg-white/5">
                  <Copy className="w-3.5 h-3.5 mr-1" /> Copiar
                </Button>
              </div>
              <p className="text-white/85 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
