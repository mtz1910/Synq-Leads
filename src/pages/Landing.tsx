import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Zap, MessageCircle, Sparkles, TrendingUp, Bot, Target,
  ArrowRight, CheckCircle2, BarChart3, Rocket, ShieldCheck, Users
} from 'lucide-react';

const features = [
  { icon: MessageCircle, title: 'Recuperação no WhatsApp', desc: 'A IA reativa leads frios automaticamente com mensagens persuasivas, urgência e prova social.' },
  { icon: Bot, title: 'Follow-up com IA', desc: 'Sequências inteligentes que adaptam tom, oferta e CTA conforme o comportamento do lead.' },
  { icon: Sparkles, title: 'Criativos de Anúncio IA', desc: 'Gere copies, headlines, hooks virais e roteiros UGC para Meta Ads e TikTok em segundos.' },
  { icon: TrendingUp, title: 'Conversão em escala', desc: 'Aumente seu ROI com automações que transformam contatos esquecidos em receita.' },
  { icon: BarChart3, title: 'Analytics em tempo real', desc: 'Acompanhe receita recuperada, taxa de resposta e performance de cada campanha.' },
  { icon: ShieldCheck, title: 'Setup em minutos', desc: 'Conecte seu WhatsApp via QR Code e comece a recuperar vendas no mesmo dia.' },
];

const plans = [
  {
    name: 'Starter', price: 'R$ 0', period: '/mês', cta: 'Começar grátis',
    desc: 'Para validar o canal',
    features: ['100 leads recuperados/mês', '50 criativos IA/mês', '1 número WhatsApp', 'Dashboard completo'],
  },
  {
    name: 'Growth', price: 'R$ 197', period: '/mês', cta: 'Assinar Growth', popular: true,
    desc: 'Para quem já vende todo dia',
    features: ['5.000 leads/mês', 'Criativos IA ilimitados', '3 números WhatsApp', 'Campanhas automáticas', 'Suporte prioritário'],
  },
  {
    name: 'Scale', price: 'R$ 497', period: '/mês', cta: 'Assinar Scale',
    desc: 'Para operações de alto volume',
    features: ['Leads ilimitados', 'IA de copy avançada', 'WhatsApp ilimitado', 'API + integrações', 'Gerente de sucesso'],
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white relative overflow-x-hidden">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-[#10B981]/10 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#10B981]/5 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 backdrop-blur-xl bg-[#0F172A]/70 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
              <Zap className="w-5 h-5 text-white" fill="white" />
            </div>
            <span className="font-bold text-lg tracking-tight">LeadVolt <span className="text-[#10B981]">AI</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <a href="#features" className="hover:text-white transition">Recursos</a>
            <a href="#pricing" className="hover:text-white transition">Planos</a>
            <a href="#how" className="hover:text-white transition">Como funciona</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login"><Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/5">Entrar</Button></Link>
            <Link to="/register">
              <Button className="bg-[#10B981] hover:bg-[#10B981]/90 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)]">
                Teste Grátis
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 pt-24 pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <Badge variant="outline" className="mb-6 border-[#10B981]/30 bg-[#10B981]/5 text-[#10B981] backdrop-blur">
            <Sparkles className="w-3 h-3 mr-1" /> Powered by AI · Lançamento 2026
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6">
            Recupere clientes esquecidos<br />
            <span className="bg-gradient-to-r from-[#10B981] via-emerald-400 to-[#10B981] bg-clip-text text-transparent">
              automaticamente no WhatsApp
            </span>
            <br />com IA.
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
            Transforme leads frios em vendas automáticas. Follow-up inteligente, criativos de anúncio gerados por IA e dashboard que mostra cada real recuperado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/register">
              <Button size="lg" className="bg-[#10B981] hover:bg-[#10B981]/90 text-white text-base px-8 h-12 shadow-[0_0_30px_rgba(16,185,129,0.45)]">
                Começar grátis <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10 h-12 px-8">
                Ver demo do dashboard
              </Button>
            </Link>
          </div>

          {/* Dashboard mockup */}
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute -inset-4 bg-[#10B981]/20 blur-3xl rounded-3xl" />
            <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl p-2 shadow-2xl">
              <div className="rounded-xl bg-[#0a0f1c] border border-white/5 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="ml-3 text-xs text-white/40">app.leadvolt.ai/dashboard</span>
                </div>
                <div className="grid grid-cols-3 gap-3 p-5">
                  {[
                    { l: 'Leads recuperados', v: '1.284', d: '+24%' },
                    { l: 'Receita gerada', v: 'R$ 87.430', d: '+38%' },
                    { l: 'Taxa de resposta', v: '64%', d: '+12%' },
                  ].map((s, i) => (
                    <div key={i} className="rounded-lg bg-white/[0.03] border border-white/5 p-4 text-left">
                      <div className="text-xs text-white/50">{s.l}</div>
                      <div className="text-2xl font-bold mt-1">{s.v}</div>
                      <div className="text-xs text-[#10B981] mt-1">{s.d} este mês</div>
                    </div>
                  ))}
                </div>
                <div className="px-5 pb-5">
                  <div className="rounded-lg bg-white/[0.03] border border-white/5 h-40 flex items-end gap-2 p-4">
                    {[40, 65, 50, 75, 60, 85, 70, 92, 78, 95, 88, 100].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-[#10B981]/30 to-[#10B981]" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trusted by stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { v: 'R$ 12M+', l: 'Receita recuperada' },
              { v: '2.500+', l: 'Empresas ativas' },
              { v: '64%', l: 'Taxa de resposta média' },
              { v: '7x', l: 'ROI médio mensal' },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-black text-white">{s.v}</div>
                <div className="text-sm text-white/50 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-white/10 bg-white/5 text-white/70">Recursos</Badge>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Tudo que você precisa para <span className="text-[#10B981]">vender mais</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Uma plataforma completa para recuperar leads, criar anúncios e escalar suas campanhas com inteligência artificial.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <Card key={i} className="bg-white/[0.03] border-white/10 hover:border-[#10B981]/40 hover:bg-white/[0.05] transition-all backdrop-blur">
                <CardContent className="p-6">
                  <div className="w-11 h-11 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                    <f.icon className="w-5 h-5 text-[#10B981]" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-white">{f.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="relative z-10 py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Comece em <span className="text-[#10B981]">3 passos</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: '01', icon: MessageCircle, t: 'Conecte o WhatsApp', d: 'Escaneie o QR Code e ative seu canal em menos de 1 minuto.' },
              { n: '02', icon: Users, t: 'Importe seus leads', d: 'Suba CSV, conecte sua plataforma de checkout ou use a API.' },
              { n: '03', icon: Rocket, t: 'A IA recupera tudo', d: 'Sequências automáticas com mensagens, ofertas e follow-ups.' },
            ].map((s, i) => (
              <div key={i} className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur">
                <div className="text-[#10B981]/40 text-5xl font-black absolute top-4 right-5">{s.n}</div>
                <s.icon className="w-8 h-8 text-[#10B981] mb-4" />
                <h3 className="text-xl font-bold mb-2">{s.t}</h3>
                <p className="text-white/60 text-sm">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Planos que crescem com você
            </h2>
            <p className="text-white/60 text-lg">Comece grátis. Atualize quando quiser.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((p, i) => (
              <Card key={i} className={`relative backdrop-blur ${p.popular
                ? 'bg-gradient-to-b from-[#10B981]/15 to-white/[0.02] border-[#10B981]/50 shadow-[0_0_40px_rgba(16,185,129,0.25)]'
                : 'bg-white/[0.03] border-white/10'}`}>
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-[#10B981] text-white border-0">Mais Popular</Badge>
                  </div>
                )}
                <CardContent className="p-7">
                  <h3 className="font-bold text-lg text-white">{p.name}</h3>
                  <p className="text-sm text-white/50 mb-6">{p.desc}</p>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-black">{p.price}</span>
                    <span className="text-white/50 text-sm">{p.period}</span>
                  </div>
                  <Link to="/register">
                    <Button className={`w-full mb-6 ${p.popular
                      ? 'bg-[#10B981] hover:bg-[#10B981]/90 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                      : 'bg-white/10 hover:bg-white/15 text-white border border-white/10'}`}>
                      {p.cta}
                    </Button>
                  </Link>
                  <ul className="space-y-3">
                    {p.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-white/70">
                        <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto rounded-3xl border border-[#10B981]/30 bg-gradient-to-br from-[#10B981]/15 via-[#10B981]/5 to-transparent p-12 text-center backdrop-blur shadow-[0_0_60px_rgba(16,185,129,0.2)]">
          <Target className="w-12 h-12 text-[#10B981] mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Pare de perder vendas hoje.
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Cada lead esquecido é dinheiro deixado na mesa. Ative o LeadVolt AI grátis e veja a receita aparecer.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-[#10B981] hover:bg-[#10B981]/90 text-white text-base h-12 px-8 shadow-[0_0_30px_rgba(16,185,129,0.5)]">
              Criar conta grátis <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="font-bold">LeadVolt AI</span>
          </div>
          <p className="text-sm text-white/40">© 2026 LeadVolt AI. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
