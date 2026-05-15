import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Upload, Plus, MessageCircle, Phone } from 'lucide-react';

const leads = [
  { name: 'Carlos Mendes', phone: '+55 11 98765-4321', source: 'Checkout abandonado', status: 'Convertido', value: 'R$ 297', color: 'text-[#10B981]' },
  { name: 'Mariana Silva', phone: '+55 21 99876-5432', source: 'Anúncio Meta', status: 'Respondeu', value: 'R$ 197', color: 'text-blue-400' },
  { name: 'João Pereira', phone: '+55 11 91234-5678', source: 'Lead orgânico', status: 'Em follow-up', value: 'R$ 497', color: 'text-yellow-400' },
  { name: 'Beatriz Costa', phone: '+55 31 98765-1234', source: 'Checkout abandonado', status: 'Convertido', value: 'R$ 197', color: 'text-[#10B981]' },
  { name: 'Rafael Souza', phone: '+55 41 99988-7766', source: 'TikTok Ads', status: 'Aguardando', value: 'R$ 97', color: 'text-white/50' },
  { name: 'Larissa Lima', phone: '+55 11 95544-3322', source: 'Checkout abandonado', status: 'Em follow-up', value: 'R$ 397', color: 'text-yellow-400' },
  { name: 'Pedro Alves', phone: '+55 51 98877-6655', source: 'Anúncio Meta', status: 'Convertido', value: 'R$ 597', color: 'text-[#10B981]' },
];

export default function Leads() {
  return (
    <DashboardLayout title="Leads" subtitle="Gerencie seus contatos e o status de cada um">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <Input placeholder="Buscar por nome ou telefone..." className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/40" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
              <Upload className="w-4 h-4 mr-2" /> Importar CSV
            </Button>
            <Button className="bg-[#10B981] hover:bg-[#10B981]/90 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)]">
              <Plus className="w-4 h-4 mr-2" /> Novo lead
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] text-white/50 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-5 py-3 font-medium">Nome</th>
                <th className="text-left px-5 py-3 font-medium">Telefone</th>
                <th className="text-left px-5 py-3 font-medium">Origem</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
                <th className="text-right px-5 py-3 font-medium">Valor</th>
                <th className="text-right px-5 py-3 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l, i) => (
                <tr key={i} className="border-t border-white/5 hover:bg-white/[0.02] transition">
                  <td className="px-5 py-4 font-medium">{l.name}</td>
                  <td className="px-5 py-4 text-white/60">{l.phone}</td>
                  <td className="px-5 py-4 text-white/60">{l.source}</td>
                  <td className="px-5 py-4"><span className={`text-xs ${l.color}`}>{l.status}</span></td>
                  <td className="px-5 py-4 text-right font-semibold">{l.value}</td>
                  <td className="px-5 py-4 text-right">
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-white/60 hover:text-[#10B981]"><MessageCircle className="w-4 h-4" /></Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-white/60 hover:text-[#10B981]"><Phone className="w-4 h-4" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
