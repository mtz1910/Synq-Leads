import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  LogOut, 
  Target, 
  Trophy, 
  History, 
  Settings,
  Crown,
  Zap,
  BarChart3,
  Bell
} from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

export default function Dashboard() {
  const { user, profile, subscription, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <Skeleton className="h-20 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const planName = subscription?.plan?.display_name || 'Gratuito';
  const predictionsLimit = subscription?.plan?.predictions_per_day || 5;
  const isPro = subscription?.plan?.name === 'pro';
  const isPremium = subscription?.plan?.name === 'premium';

  const stats = [
    { 
      label: 'Predições Hoje', 
      value: '3', 
      limit: predictionsLimit === -1 ? '∞' : predictionsLimit.toString(),
      icon: Target,
      color: 'text-accent-blue'
    },
    { 
      label: 'Taxa de Acerto', 
      value: '68%', 
      icon: Trophy,
      color: 'text-accent-emerald'
    },
    { 
      label: 'Lucro Mensal', 
      value: '+R$ 850', 
      icon: TrendingUp,
      color: 'text-accent-purple'
    },
  ];

  const quickActions = [
    { label: 'Nova Predição', icon: Zap, href: '/predict', primary: true },
    { label: 'Histórico', icon: History, href: '/history' },
    { label: 'Estatísticas', icon: BarChart3, href: '/stats' },
    { label: 'Configurações', icon: Settings, href: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent-emerald flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">BetPredict AI</span>
            </Link>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium">{profile?.display_name || user.email}</p>
                  <Badge variant={isPremium ? 'default' : isPro ? 'secondary' : 'outline'} className="text-xs">
                    {isPremium && <Crown className="w-3 h-3 mr-1" />}
                    {planName}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon" onClick={signOut}>
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome */}
        <div>
          <h1 className="text-3xl font-bold">
            Olá, {profile?.display_name?.split(' ')[0] || 'Apostador'}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Pronto para fazer predições inteligentes hoje?
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-3xl font-bold">{stat.value}</span>
                      {stat.limit && (
                        <span className="text-sm text-muted-foreground">/ {stat.limit}</span>
                      )}
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.href}>
              <Card className={`border-border/50 hover:border-accent-emerald/50 transition-colors cursor-pointer ${action.primary ? 'bg-accent-emerald text-white' : ''}`}>
                <CardContent className="p-4 flex items-center gap-3">
                  <action.icon className="w-5 h-5" />
                  <span className="font-medium">{action.label}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Matches */}
          <Card className="lg:col-span-2 border-border/50">
            <CardHeader>
              <CardTitle>Jogos de Hoje</CardTitle>
              <CardDescription>Partidas disponíveis para predição</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { home: 'Flamengo', away: 'Palmeiras', league: 'Brasileirão', time: '16:00', confidence: 72 },
                  { home: 'Real Madrid', away: 'Barcelona', league: 'La Liga', time: '17:00', confidence: 65 },
                  { home: 'Liverpool', away: 'Man City', league: 'Premier League', time: '13:30', confidence: 58 },
                ].map((match, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{match.home}</span>
                        <span className="text-muted-foreground">vs</span>
                        <span className="font-medium">{match.away}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{match.league}</Badge>
                        <span className="text-xs text-muted-foreground">{match.time}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Confiança</div>
                      <div className={`font-bold ${match.confidence >= 70 ? 'text-accent-emerald' : match.confidence >= 60 ? 'text-accent-blue' : 'text-muted-foreground'}`}>
                        {match.confidence}%
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-4">
                      <Zap className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upgrade Card */}
          {!isPremium && (
            <Card className="border-accent-purple/30 bg-gradient-to-br from-accent-purple/5 to-accent-blue/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-accent-purple" />
                  Upgrade para Premium
                </CardTitle>
                <CardDescription>
                  Desbloqueie todo o potencial do BetPredict AI
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
                    Predições ilimitadas
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
                    Alertas via Telegram
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
                    Kelly Criterion
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
                    API access
                  </li>
                </ul>
                <Button className="w-full bg-accent-purple hover:bg-accent-purple/90">
                  Fazer Upgrade
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
