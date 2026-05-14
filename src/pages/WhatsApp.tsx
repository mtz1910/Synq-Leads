import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Smartphone, CheckCircle2, RefreshCw } from 'lucide-react';

export default function WhatsApp() {
  return (
    <DashboardLayout title="WhatsApp" subtitle="Conecte e gerencie seus números">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Número principal</h3>
            <Badge className="bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20">
              <CheckCircle2 className="w-3 h-3 mr-1" /> Conectado
            </Badge>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-[#10B981]" />
            </div>
            <div className="flex-1">
              <div className="font-semibold">+55 11 99999-0001</div>
              <div className="text-xs text-white/50">Loja Principal · 8.921 mensagens enviadas</div>
            </div>
            <Button variant="outline" size="sm" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
              <RefreshCw className="w-3.5 h-3.5 mr-1" /> Sincronizar
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-[#10B981]/20 bg-gradient-to-br from-[#10B981]/10 to-transparent backdrop-blur p-6">
          <h3 className="font-bold mb-1">Adicionar novo número</h3>
          <p className="text-sm text-white/60 mb-5">Escaneie o QR Code com seu WhatsApp</p>
          <div className="aspect-square max-w-[240px] mx-auto rounded-2xl bg-white p-4 flex items-center justify-center">
            <div className="grid grid-cols-12 gap-0.5">
              {Array.from({ length: 144 }).map((_, i) => (
                <div key={i} className={`w-3 h-3 ${Math.random() > 0.5 ? 'bg-[#0F172A]' : 'bg-white'} ${[0,11,132,143].includes(i) ? 'bg-[#10B981]' : ''}`} />
              ))}
            </div>
          </div>
          <p className="text-xs text-white/50 text-center mt-4">QR válido por 5 minutos</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
