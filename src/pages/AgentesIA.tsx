import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Bot, Sparkles, BookOpen, MessageCircle, Tag, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

export default function AgentesIA() {
  const [name, setName] = useState('Assistente Synq');
  const [persona, setPersona] = useState('Você é um SDR simpático e direto, especializado em recuperar carrinhos abandonados e converter leads mornos.');
  const [instructions, setInstructions] = useState('Sempre pergunte o nome do lead, entenda a dor, ofereça o produto com desconto quando aplicável.');
  const [knowledge, setKnowledge] = useState('');
  const [active, setActive] = useState(true);
  const [keywords, setKeywords] = useState<string[]>(['preço', 'desconto', 'cupom']);
  const [kw, setKw] = useState('');

  const addKw = () => {
    const v = kw.trim();
    if (!v) return;
    setKeywords((ks) => Array.from(new Set([...ks, v])));
    setKw('');
  };

  const save = () => toast.success('Agente salvo');

  return (
    <DashboardLayout
      kicker="Agentes IA"
      title="Configurar seu agente"
      subtitle="Ensine sua IA a atender como se fosse você — persona, contexto e ações."
      headerRight={
        <Button onClick={save} className="bg-[#10B981] hover:bg-[#10B981]/90 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)]">
          <Sparkles className="w-4 h-4 mr-2" /> Salvar agente
        </Button>
      }
    >
      <div className="grid xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 space-y-5">
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="w-4 h-4 text-[#10B981]" />
              <h3 className="font-bold">Identidade</h3>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-white/80">Nome do agente</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="bg-white/5 border-white/10 text-white mt-1.5" />
              </div>
              <div>
                <Label className="text-white/80">Persona</Label>
                <Textarea value={persona} onChange={(e) => setPersona(e.target.value)} rows={3}
                  className="bg-white/5 border-white/10 text-white mt-1.5 resize-none" />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-[#10B981]" />
              <h3 className="font-bold">Instruções</h3>
            </div>
            <Textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} rows={5}
              placeholder="Diga como o agente deve se comportar em cada situação"
              className="bg-white/5 border-white/10 text-white resize-none" />
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-[#10B981]" />
              <h3 className="font-bold">Base de conhecimento</h3>
            </div>
            <Textarea value={knowledge} onChange={(e) => setKnowledge(e.target.value)} rows={6}
              placeholder="Cole aqui perguntas frequentes, catálogo, políticas, informações do seu produto…"
              className="bg-white/5 border-white/10 text-white resize-none" />
            <p className="text-xs text-white/40 mt-2">Em breve: upload de PDF, sites e planilhas.</p>
          </section>
        </div>

        <div className="space-y-5">
          <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#10B981]/10 via-white/[0.03] to-transparent backdrop-blur p-6">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <MessageCircle className="w-4 h-4 text-[#10B981]" />
                  <h3 className="font-bold">Ativação WhatsApp</h3>
                </div>
                <p className="text-xs text-white/50">Responde automaticamente novas conversas.</p>
              </div>
              <Switch checked={active} onCheckedChange={setActive} />
            </div>
            <Badge className="bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 hover:bg-[#10B981]/15">
              {active ? 'Ativo' : 'Pausado'}
            </Badge>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-4 h-4 text-[#10B981]" />
              <h3 className="font-bold">Palavras-gatilho</h3>
            </div>
            <div className="flex gap-2 mb-3">
              <Input value={kw} onChange={(e) => setKw(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addKw())}
                placeholder="Ex: preço"
                className="bg-white/5 border-white/10 text-white" />
              <Button type="button" onClick={addKw} size="icon" className="bg-white/5 hover:bg-white/10 border border-white/10 shrink-0">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {keywords.map((k) => (
                <button key={k} onClick={() => setKeywords((ks) => ks.filter((x) => x !== k))}
                  className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 hover:border-red-500/30 hover:text-red-400 transition">
                  {k}
                  <X className="w-3 h-3 opacity-40 group-hover:opacity-100" />
                </button>
              ))}
              {keywords.length === 0 && <span className="text-xs text-white/40">Nenhuma palavra adicionada</span>}
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6">
            <h3 className="font-bold mb-2">Ações da IA</h3>
            <p className="text-xs text-white/50 mb-4">Ferramentas que o agente pode acionar durante o atendimento.</p>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-center justify-between"><span>Enviar catálogo</span><Switch defaultChecked /></li>
              <li className="flex items-center justify-between"><span>Aplicar cupom</span><Switch defaultChecked /></li>
              <li className="flex items-center justify-between"><span>Marcar como quente</span><Switch defaultChecked /></li>
              <li className="flex items-center justify-between"><span>Escalar para humano</span><Switch /></li>
            </ul>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}
