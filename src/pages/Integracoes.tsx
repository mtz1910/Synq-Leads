import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import {
  MessageCircle, Instagram, Facebook, Mail, Send, ShoppingBag,
  ArrowUpRight, Check,
} from 'lucide-react';

type Integration = {
  id: string;
  name: string;
  desc: string;
  icon: any;
  color: string;
  connected?: boolean;
  href?: string;
};

const integrations: Integration[] = [
  { id: 'whatsapp', name: 'WhatsApp Business', desc: 'Envie e receba mensagens automaticamente via a API oficial.', icon: MessageCircle, color: '#25D366', href: '/whatsapp' },
  { id: 'instagram', name: 'Instagram Direct',  desc: 'Responda DMs de comentários e stories com automações.', icon: Instagram, color: '#E1306C' },
  { id: 'facebook', name: 'Facebook Messenger', desc: 'Centralize conversas do Messenger no seu inbox.', icon: Facebook, color: '#1877F2' },
  { id: 'email',    name: 'E-mail Marketing',   desc: 'Dispare campanhas de recuperação por e-mail.', icon: Mail, color: '#F59E0B' },
  { id: 'telegram', name: 'Telegram',           desc: 'Bots e canais integrados ao seu fluxo.', icon: Send, color: '#0088CC' },
  { id: 'shopify',  name: 'Shopify',            desc: 'Recupere carrinhos abandonados em tempo real.', icon: ShoppingBag, color: '#95BF47' },
];

export default function Integracoes() {
  return (
    <DashboardLayout
      kicker="Integrações"
      title="Conexões com o mundo"
      subtitle="Conecte as plataformas que você usa e deixe o Synq Leads cuidar das mensagens."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {integrations.map((it) => {
          const Icon = it.icon;
          const card = (
            <div className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur p-6 hover:border-[#10B981]/40 transition-all overflow-hidden">
              <div
                className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"
                style={{ background: it.color }}
              />
              <div className="relative flex items-start justify-between mb-5">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ background: `${it.color}22`, boxShadow: `0 0 24px ${it.color}33` }}
                >
                  <Icon className="w-6 h-6" style={{ color: it.color }} />
                </div>
                {it.connected ? (
                  <Badge className="bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 hover:bg-[#10B981]/15">
                    <Check className="w-3 h-3 mr-1" /> Conectado
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-white/10 text-white/50">Disponível</Badge>
                )}
              </div>
              <h3 className="relative font-bold text-lg mb-1">{it.name}</h3>
              <p className="relative text-sm text-white/50 mb-5 leading-relaxed">{it.desc}</p>
              <Button
                variant="outline"
                className="relative border-white/10 bg-white/5 text-white hover:bg-white/10 w-full justify-between"
              >
                {it.connected ? 'Gerenciar' : 'Conectar'}
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
          );
          return it.href ? (
            <Link key={it.id} to={it.href}>{card}</Link>
          ) : (
            <div key={it.id}>{card}</div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
