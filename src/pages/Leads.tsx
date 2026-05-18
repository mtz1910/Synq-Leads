import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Search, Plus, MessageCircle, Phone, Inbox } from 'lucide-react';
import { toast } from 'sonner';

interface Lead {
  id: string;
  name: string;
  phone: string | null;
  source: string | null;
  status: string;
  value: number | null;
}

const fmtBRL = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const statusColor = (s: string) => {
  const k = s.toLowerCase();
  if (k.includes('convert')) return 'text-[#10B981]';
  if (k.includes('respond')) return 'text-blue-400';
  if (k.includes('follow')) return 'text-yellow-400';
  return 'text-white/50';
};

export default function Leads() {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', source: '', value: '' });

  const load = async () => {
    if (!user) return;
    const { data } = await supabase.from('leads').select('id,name,phone,source,status,value').eq('user_id', user.id).order('created_at', { ascending: false });
    setLeads(data ?? []);
  };
  useEffect(() => { load(); }, [user]);

  const create = async () => {
    if (!user || !form.name.trim()) { toast.error('Nome obrigatório'); return; }
    const { error } = await supabase.from('leads').insert({
      user_id: user.id,
      name: form.name.trim(),
      phone: form.phone.trim() || null,
      source: form.source.trim() || null,
      value: form.value ? Number(form.value) : 0,
      status: 'novo',
    });
    if (error) { toast.error(error.message); return; }
    toast.success('Lead criado');
    setForm({ name: '', phone: '', source: '', value: '' });
    setOpen(false);
    load();
  };

  const filtered = leads.filter(l =>
    !search || l.name.toLowerCase().includes(search.toLowerCase()) || (l.phone ?? '').includes(search)
  );

  return (
    <DashboardLayout title="Leads" subtitle="Gerencie seus contatos e o status de cada um">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por nome ou telefone..." className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/40" />
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#10B981] hover:bg-[#10B981]/90 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)]">
                <Plus className="w-4 h-4 mr-2" /> Novo lead
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0F172A] border-white/10 text-white">
              <DialogHeader><DialogTitle>Novo lead</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div className="space-y-1.5"><Label>Nome *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-white/5 border-white/10" /></div>
                <div className="space-y-1.5"><Label>Telefone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-white/5 border-white/10" /></div>
                <div className="space-y-1.5"><Label>Origem</Label><Input value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} placeholder="Checkout abandonado, Meta Ads..." className="bg-white/5 border-white/10" /></div>
                <div className="space-y-1.5"><Label>Valor estimado (R$)</Label><Input type="number" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} className="bg-white/5 border-white/10" /></div>
              </div>
              <DialogFooter><Button onClick={create} className="bg-[#10B981] hover:bg-[#10B981]/90 text-white">Criar</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur overflow-x-auto">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-white/40">
              <Inbox className="w-10 h-10 mx-auto mb-3" />
              <p className="font-medium text-white/70">Nenhum lead {search ? 'encontrado' : 'ainda'}</p>
              {!search && <p className="text-sm mt-1">Clique em "Novo lead" para adicionar o primeiro.</p>}
            </div>
          ) : (
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
                {filtered.map((l) => (
                  <tr key={l.id} className="border-t border-white/5 hover:bg-white/[0.02] transition">
                    <td className="px-5 py-4 font-medium">{l.name}</td>
                    <td className="px-5 py-4 text-white/60">{l.phone || '—'}</td>
                    <td className="px-5 py-4 text-white/60">{l.source || '—'}</td>
                    <td className="px-5 py-4"><span className={`text-xs ${statusColor(l.status)}`}>{l.status}</span></td>
                    <td className="px-5 py-4 text-right font-semibold">{fmtBRL(Number(l.value ?? 0))}</td>
                    <td className="px-5 py-4 text-right">
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-white/60 hover:text-[#10B981]"><MessageCircle className="w-4 h-4" /></Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-white/60 hover:text-[#10B981]"><Phone className="w-4 h-4" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
