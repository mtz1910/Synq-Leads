import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Copy, Wand2, Inbox, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Creative {
  id: string;
  type: string;
  content: string;
}

export default function CriativosIA() {
  const { user } = useAuth();
  const [form, setForm] = useState({ product: '', audience: '', differential: '' });
  const [generating, setGenerating] = useState(false);
  const [creatives, setCreatives] = useState<Creative[]>([]);

  const load = async () => {
    if (!user) return;
    const { data } = await supabase.from('creatives').select('id,type,content').eq('user_id', user.id).order('created_at', { ascending: false }).limit(20);
    setCreatives(data ?? []);
  };
  useEffect(() => { load(); }, [user]);

  const generate = async () => {
    if (!form.product.trim()) { toast.error('Informe o produto/oferta'); return; }
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-creatives', { body: form });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast.success(`${data.creatives.length} criativos gerados!`);
      load();
    } catch (e: any) {
      toast.error(e.message || 'Erro ao gerar');
    } finally {
      setGenerating(false);
    }
  };

  const copy = (t: string) => { navigator.clipboard.writeText(t); toast.success('Copiado!'); };

  const remove = async (id: string) => {
    const { error } = await supabase.from('creatives').delete().eq('id', id);
    if (error) { toast.error(error.message); return; }
    toast.success('Criativo excluído');
    load();
  };

  return (
    <DashboardLayout title="Criativos IA" subtitle="Gere headlines, hooks e copies de anúncio em segundos">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6 space-y-4 h-fit">
          <h3 className="font-bold">Briefing</h3>
          <div className="space-y-2">
            <Label className="text-white/80">Produto / oferta *</Label>
            <Input value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} placeholder="Ex: Curso de marketing digital" className="bg-white/5 border-white/10 text-white placeholder:text-white/40" />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Público</Label>
            <Input value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })} placeholder="Ex: Afiliados iniciantes" className="bg-white/5 border-white/10 text-white placeholder:text-white/40" />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Diferencial</Label>
            <Textarea value={form.differential} onChange={(e) => setForm({ ...form, differential: e.target.value })} placeholder="O que torna sua oferta única..." className="bg-white/5 border-white/10 text-white placeholder:text-white/40 min-h-24" />
          </div>
          <Button onClick={generate} disabled={generating} className="w-full bg-[#10B981] hover:bg-[#10B981]/90 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)]">
            <Wand2 className={`w-4 h-4 mr-2 ${generating ? 'animate-spin' : ''}`} /> {generating ? 'IA pensando...' : 'Gerar criativos com IA'}
          </Button>
        </div>

        <div className="lg:col-span-2 space-y-3">
          {creatives.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur py-16 text-center text-white/40">
              <Inbox className="w-10 h-10 mx-auto mb-3" />
              <p className="font-medium text-white/70">Nenhum criativo gerado ainda</p>
              <p className="text-sm mt-1">Preencha o briefing e clique em "Gerar criativos com IA".</p>
            </div>
          ) : creatives.map((s) => (
            <div key={s.id} className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-5 hover:border-[#10B981]/30 transition">
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20">
                  <Sparkles className="w-3 h-3 mr-1" /> {s.type}
                </Badge>
                <div className="flex items-center gap-1">
                  <Button size="sm" variant="ghost" onClick={() => copy(s.content)} className="text-white/60 hover:text-white hover:bg-white/5">
                    <Copy className="w-3.5 h-3.5 mr-1" /> Copiar
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => remove(s.id)} title="Excluir" className="h-8 w-8 text-white/50 hover:text-red-400 hover:bg-red-500/10">
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
              <p className="text-white/85 leading-relaxed whitespace-pre-wrap">{s.content}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
