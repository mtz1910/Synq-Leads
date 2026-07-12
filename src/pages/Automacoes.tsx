import { useCallback, useMemo, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import {
  ReactFlow, ReactFlowProvider, Background, BackgroundVariant, Controls, MiniMap,
  addEdge, applyEdgeChanges, applyNodeChanges,
  Handle, Position,
  type Node, type Edge, type Connection, type NodeChange, type EdgeChange, type NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
  Play, MessageSquare, HelpCircle, GitBranch, Clock, Bot,
  Sparkles, Bell, Plus, Save, Zap, Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type BlockKind =
  | 'start' | 'message' | 'question' | 'condition' | 'delay' | 'ai' | 'agent' | 'alert';

const blockMeta: Record<BlockKind, { label: string; icon: any; color: string; desc: string }> = {
  start:     { label: 'Início',     icon: Play,         color: '#10B981', desc: 'Ponto de partida do fluxo' },
  message:   { label: 'Mensagem',   icon: MessageSquare, color: '#3B82F6', desc: 'Enviar mensagem' },
  question:  { label: 'Pergunta',   icon: HelpCircle,   color: '#8B5CF6', desc: 'Pergunta ao lead' },
  condition: { label: 'Condição',   icon: GitBranch,    color: '#F59E0B', desc: 'Ramificação lógica' },
  delay:     { label: 'Delay',      icon: Clock,        color: '#64748B', desc: 'Aguardar tempo' },
  ai:        { label: 'IA',         icon: Sparkles,     color: '#EC4899', desc: 'Chamada de IA' },
  agent:     { label: 'Agente IA',  icon: Bot,          color: '#10B981', desc: 'Delegar para agente' },
  alert:     { label: 'Alerta',     icon: Bell,         color: '#EF4444', desc: 'Notificar equipe' },
};

function CustomNode({ data }: NodeProps) {
  const kind = (data as any).kind as BlockKind;
  const meta = blockMeta[kind];
  const Icon = meta.icon;
  return (
    <div
      className="rounded-xl border bg-[#0F172A]/95 backdrop-blur shadow-lg min-w-[180px]"
      style={{ borderColor: `${meta.color}55` }}
    >
      {kind !== 'start' && (
        <Handle type="target" position={Position.Left} style={{ background: meta.color, width: 8, height: 8 }} />
      )}
      <div className="flex items-center gap-2 px-3 py-2 border-b" style={{ borderColor: `${meta.color}33` }}>
        <div
          className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
          style={{ background: `${meta.color}22`, color: meta.color }}
        >
          <Icon className="w-3.5 h-3.5" />
        </div>
        <div className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: meta.color }}>
          {meta.label}
        </div>
      </div>
      <div className="px-3 py-2 text-xs text-white/70">
        {(data as any).label || meta.desc}
      </div>
      <Handle type="source" position={Position.Right} style={{ background: meta.color, width: 8, height: 8 }} />
    </div>
  );
}

const nodeTypes = { custom: CustomNode };

const initialNodes: Node[] = [
  { id: 'n1', type: 'custom', position: { x: 80, y: 160 },  data: { kind: 'start',   label: 'Novo lead entra' } },
  { id: 'n2', type: 'custom', position: { x: 340, y: 160 }, data: { kind: 'message', label: 'Olá! Sou seu assistente' } },
  { id: 'n3', type: 'custom', position: { x: 620, y: 160 }, data: { kind: 'ai',      label: 'IA responde dúvidas' } },
];
const initialEdges: Edge[] = [
  { id: 'e1', source: 'n1', target: 'n2', animated: true, style: { stroke: '#10B981', strokeWidth: 2 } },
  { id: 'e2', source: 'n2', target: 'n3', animated: true, style: { stroke: '#10B981', strokeWidth: 2 } },
];

function Editor() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selected, setSelected] = useState<string | null>(null);

  const onNodesChange = useCallback((c: NodeChange[]) => setNodes(ns => applyNodeChanges(c, ns)), []);
  const onEdgesChange = useCallback((c: EdgeChange[]) => setEdges(es => applyEdgeChanges(c, es)), []);
  const onConnect = useCallback(
    (c: Connection) => setEdges(es => addEdge({ ...c, animated: true, style: { stroke: '#10B981', strokeWidth: 2 } }, es)),
    []
  );

  const addBlock = (kind: BlockKind) => {
    const id = `n${Date.now()}`;
    const meta = blockMeta[kind];
    setNodes(ns => [
      ...ns,
      {
        id,
        type: 'custom',
        position: { x: 200 + Math.random() * 400, y: 200 + Math.random() * 200 },
        data: { kind, label: meta.label },
      },
    ]);
  };

  const deleteSelected = () => {
    if (!selected) return;
    setNodes(ns => ns.filter(n => n.id !== selected));
    setEdges(es => es.filter(e => e.source !== selected && e.target !== selected));
    setSelected(null);
  };

  const save = () => {
    toast.success(`Fluxo salvo (${nodes.length} blocos, ${edges.length} conexões)`);
  };

  const kinds = useMemo(() => Object.keys(blockMeta) as BlockKind[], []);

  return (
    <div className="flex gap-4 h-[calc(100vh-220px)] min-h-[560px]">
      {/* Palette */}
      <aside className="w-56 shrink-0 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-3 overflow-y-auto">
        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 px-2 mb-2">Blocos</div>
        <div className="space-y-1">
          {kinds.map(k => {
            const m = blockMeta[k];
            const Icon = m.icon;
            return (
              <button
                key={k}
                onClick={() => addBlock(k)}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left text-sm text-white/80 hover:bg-white/5 hover:text-white transition"
              >
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                  style={{ background: `${m.color}22`, color: m.color }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[13px] font-medium">{m.label}</div>
                  <div className="text-[10px] text-white/40 truncate">{m.desc}</div>
                </div>
                <Plus className="w-3.5 h-3.5 text-white/30 ml-auto shrink-0" />
              </button>
            );
          })}
        </div>
      </aside>

      {/* Canvas */}
      <div className="flex-1 min-w-0 rounded-2xl border border-white/10 bg-[#0a0f1c] overflow-hidden relative">
        <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            <div className="px-3 py-1.5 rounded-full bg-[#0F172A]/80 border border-white/10 backdrop-blur text-xs text-white/70 flex items-center gap-2">
              <Zap className="w-3 h-3 text-[#10B981]" /> Fluxo sem título
            </div>
          </div>
          <div className="flex items-center gap-2 pointer-events-auto">
            {selected && (
              <Button size="sm" variant="outline" onClick={deleteSelected}
                className="h-8 border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20">
                <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Excluir
              </Button>
            )}
            <Button size="sm" onClick={save}
              className="h-8 bg-[#10B981] hover:bg-[#10B981]/90 text-white shadow-[0_0_16px_rgba(16,185,129,0.35)]">
              <Save className="w-3.5 h-3.5 mr-1.5" /> Salvar
            </Button>
          </div>
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(_, n) => setSelected(n.id)}
          onPaneClick={() => setSelected(null)}
          fitView
          proOptions={{ hideAttribution: true }}
          defaultEdgeOptions={{ animated: true, style: { stroke: '#10B981', strokeWidth: 2 } }}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="rgba(255,255,255,0.08)" />
          <Controls
            className="!bg-[#0F172A]/80 !border !border-white/10 !rounded-lg [&>button]:!bg-transparent [&>button]:!border-white/10 [&>button]:!text-white/70"
          />
          <MiniMap
            className="!bg-[#0F172A]/80 !border !border-white/10 !rounded-lg"
            nodeColor={(n) => blockMeta[(n.data as any).kind as BlockKind]?.color || '#10B981'}
            maskColor="rgba(15,23,42,0.6)"
          />
        </ReactFlow>
      </div>
    </div>
  );
}

export default function Automacoes() {
  const headerRight = (
    <div className="hidden md:flex items-center gap-2">
      <div className="text-xs text-white/40">Arraste blocos, conecte e salve</div>
    </div>
  );
  return (
    <DashboardLayout
      kicker="Automações"
      title="Editor de fluxos"
      subtitle="Construa sequências visuais que trabalham por você 24/7."
      headerRight={headerRight}
    >
      <ReactFlowProvider>
        <Editor />
      </ReactFlowProvider>
    </DashboardLayout>
  );
}
