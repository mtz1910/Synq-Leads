import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Smartphone, CheckCircle2, Plus, Inbox, Power, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Conn {
  id: string;
  phone_number: string;
  label: string | null;
  status: string;
  messages_sent: number | null;
}

export default function WhatsApp() {
  const { user } = useAuth();
  const [conns, setConns] = useState<Conn[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ phone_number: '', label: '' });

  const load = async () => {
    if (!user) return;
    const { data } = await supabase.from('whatsapp_connections').select('id,phone_number,label,status,messages_sent').eq('user_id', user.id).order('created_at', { ascending: false });
    setConns(data ?? []);
  };
  useEffect(() => { load(); }, [user]);

  const add = async () => {
    if (!user || !form.phone_number.trim()) { toast.error('Informe o número'); return; }
    const { error } = await supabase.from('whatsapp_connections').insert({
      user_id: user.id, phone_number: form.phone_number.trim(), label: form.label.trim() || null, status: 'desconectado',
    });
    if (error) { toast.error(error.message); return; }
    toast.success('Número adicionado');
    setForm({ phone_number: '', label: '' });
    setOpen(false);
    load();
  };

  const toggle = async (c: Conn) => {
    const next = c.status === 'conectado' ? 'desconectado' : 'conectado';
    const { error } = await supabase.from('whatsapp_connections').update({ status: next }).eq('id', c.id);
    if (error) { toast.error(error.message); return; }
    toast.success(next === 'conectado' ? 'Número conectado' : 'Número desconectado');
    load();
  };

  const remove = async (c: Conn) => {
    const { error } = await supabase.from('whatsapp_connections').delete().eq('id', c.id);
    if (error) { toast.error(error.message); return; }
    toast.success('Número removido');
    load();
  };

  return (
    <DashboardLayout title="WhatsApp" subtitle="Conecte e gerencie seus números">
      <div className="space-y-5">
        <div className="flex justify-end">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#10B981] hover:bg-[#10B981]/90 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)]">
                <Plus className="w-4 h-4 mr-2" /> Adicionar número
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0F172A] border-white/10 text-white">
              <DialogHeader><DialogTitle>Adicionar número</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div className="space-y-1.5"><Label>Número (com DDI) *</Label><Input value={form.phone_number} onChange={(e) => setForm({ ...form, phone_number: e.target.value })} placeholder="+55 11 99999-0000" className="bg-white/5 border-white/10" /></div>
                <div className="space-y-1.5"><Label>Rótulo</Label><Input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="Loja Principal" className="bg-white/5 border-white/10" /></div>
              </div>
              <DialogFooter><Button onClick={add} className="bg-[#10B981] hover:bg-[#10B981]/90 text-white">Adicionar</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {conns.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur py-16 text-center text-white/40">
            <Inbox className="w-10 h-10 mx-auto mb-3" />
            <p className="font-medium text-white/70">Nenhum número conectado</p>
            <p className="text-sm mt-1">Adicione seu primeiro número para começar.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-4">
            {conns.map((c) => (
              <div key={c.id} className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6">
                <div className="flex items-center justify-between mb-4 gap-2">
                  <h3 className="font-bold truncate">{c.label || 'Sem rótulo'}</h3>
                  <Badge className={c.status === 'conectado'
                    ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20'
                    : 'bg-white/5 text-white/50 border-white/10'}>
                    {c.status === 'conectado' && <CheckCircle2 className="w-3 h-3 mr-1" />} {c.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center shrink-0">
                    <Smartphone className="w-5 h-5 text-[#10B981]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{c.phone_number}</div>
                    <div className="text-xs text-white/50">{(c.messages_sent ?? 0).toLocaleString('pt-BR')} mensagens enviadas</div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button size="sm" onClick={() => toggle(c)} className={c.status === 'conectado'
                    ? 'bg-yellow-500/15 text-yellow-400 hover:bg-yellow-500/25 border border-yellow-500/30'
                    : 'bg-[#10B981] hover:bg-[#10B981]/90 text-white'}>
                    <Power className="w-3.5 h-3.5 mr-1" />
                    {c.status === 'conectado' ? 'Desconectar' : 'Conectar'}
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="ghost" className="text-white/50 hover:text-red-400 hover:bg-red-500/10 ml-auto">
                        <Trash2 className="w-3.5 h-3.5 mr-1" /> Remover
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-[#0F172A] border-white/10 text-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remover número?</AlertDialogTitle>
                        <AlertDialogDescription className="text-white/60">
                          {c.phone_number} será desconectado e removido da sua conta.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10">Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => remove(c)} className="bg-red-500 hover:bg-red-600 text-white">
                          Remover
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

