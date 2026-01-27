import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Target, 
  Zap, 
  Shield, 
  BarChart3, 
  Brain,
  CheckCircle,
  ArrowRight,
  Crown
} from 'lucide-react';

export default function Landing() {
  const features = [
    {
      icon: Brain,
      title: 'IA Avançada',
      description: 'Modelos de machine learning analisam milhares de variáveis para predições precisas'
    },
    {
      icon: BarChart3,
      title: 'Expected Value (+EV)',
      description: 'Identifica apostas com valor positivo comparando probabilidades reais vs odds oferecidas'
    },
    {
      icon: Target,
      title: 'Kelly Criterion',
      description: 'Calcula o stake ideal para maximizar lucros e minimizar riscos'
    },
    {
      icon: Zap,
      title: 'Alertas em Tempo Real',
      description: 'Receba notificações no Telegram quando a IA identificar oportunidades +EV'
    },
    {
      icon: Shield,
      title: 'Backtesting Transparente',
      description: 'Histórico completo de acertos e erros para você avaliar a performance'
    },
    {
      icon: TrendingUp,
      title: 'Estatísticas Detalhadas',
      description: 'Acompanhe seu ROI, taxa de acerto e evolução ao longo do tempo'
    }
  ];

  const plans = [
    {
      name: 'Gratuito',
      price: 'R$ 0',
      period: '/mês',
      description: 'Para começar a explorar',
      features: ['5 predições/dia', 'Estatísticas básicas', 'Dashboard personalizado'],
      cta: 'Começar Grátis',
      popular: false
    },
    {
      name: 'Pro',
      price: 'R$ 29,90',
      period: '/mês',
      description: 'Para apostadores sérios',
      features: ['50 predições/dia', 'Alertas Telegram', 'Estatísticas avançadas', 'Histórico completo', 'Suporte prioritário'],
      cta: 'Assinar Pro',
      popular: true
    },
    {
      name: 'Premium',
      price: 'R$ 79,90',
      period: '/mês',
      description: 'Máximo potencial',
      features: ['Predições ilimitadas', 'Alertas prioritários', 'Kelly Criterion', 'API access', 'Suporte VIP', 'Consultoria mensal'],
      cta: 'Assinar Premium',
      popular: false,
      premium: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent-emerald flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">BetPredict AI</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost">Entrar</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-accent-emerald hover:bg-accent-emerald/90">
                  Começar Grátis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-6">
            <Zap className="w-3 h-3 mr-1" /> Powered by AI
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            Predições Esportivas com{' '}
            <span className="text-accent-emerald">Inteligência Artificial</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Identifique apostas com valor positivo (+EV) usando modelos de machine learning 
            treinados com milhares de partidas. Maximize seus lucros de forma inteligente.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-accent-emerald hover:bg-accent-emerald/90 text-lg px-8">
                Começar Grátis <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Ver Demo
            </Button>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-muted-foreground">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">68%</div>
              <div className="text-sm">Taxa de acerto</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">2.500+</div>
              <div className="text-sm">Usuários ativos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">+12%</div>
              <div className="text-sm">ROI médio mensal</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Nossa IA analisa dados em tempo real para encontrar as melhores oportunidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 hover:border-accent-emerald/50 transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-accent-emerald/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-accent-emerald" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Escolha Seu Plano
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comece gratuitamente e faça upgrade quando quiser
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative ${plan.popular ? 'border-accent-emerald shadow-lg scale-105' : plan.premium ? 'border-accent-purple/50' : 'border-border/50'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-accent-emerald">Mais Popular</Badge>
                  </div>
                )}
                {plan.premium && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-accent-purple">
                      <Crown className="w-3 h-3 mr-1" /> Premium
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="pt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className={`w-4 h-4 ${plan.premium ? 'text-accent-purple' : 'text-accent-emerald'}`} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/register">
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-accent-emerald hover:bg-accent-emerald/90' : plan.premium ? 'bg-accent-purple hover:bg-accent-purple/90' : ''}`}
                      variant={plan.popular || plan.premium ? 'default' : 'outline'}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-accent-emerald/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Pronto para Apostar com Inteligência?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Comece gratuitamente e descubra o poder das predições baseadas em dados
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-accent-emerald hover:bg-accent-emerald/90 text-lg px-8">
              Criar Conta Grátis <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent-emerald flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold">BetPredict AI</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © 2024 BetPredict AI. Aposte com responsabilidade. +18
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
