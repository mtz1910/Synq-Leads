
# Reconstrução completa do frontend

Substituir toda a camada visual do app pelas telas das 9 imagens de referência, preservando 100% da lógica atual (Supabase, auth, tabelas, edge functions). A identidade visual atual (emerald #10B981 + graphite #0F172A, logo Synq Leads) é mantida — apenas as cores azul-claras das imagens são substituídas pela paleta atual.

Escopo grande e com muitas decisões. Vou entregar em **fases**, cada fase gera um preview funcional. Peço aprovação antes de começar.

---

## Fase 1 — Novo shell (sidebar + layout)

Novo `AppLayout` com sidebar fixa idêntica às imagens:
- Logo + "Synq Leads" + "WORKSPACE · BETA" no topo
- Seções: **PRINCIPAL** (Dashboard, Analytics, Automações, Agentes IA, Projetos), **ATENDIMENTO** (Chat, Contatos, Pipeline, Comentários, Inbox), **CONTA** (Integrações, Configurações)
- Card do usuário no rodapé (avatar + nome + papel)
- Estado ativo com pill/destaque emerald
- Colapsável (botão de collapse mostrado nas imagens)
- Substitui o `DashboardLayout` atual em todas as páginas

## Fase 2 — Páginas existentes redesenhadas

Reescritas visualmente (lógica intocada):
- **Dashboard**: header "Olá, automações em movimento", botão "+ Nova automação", gráfico de área principal + coluna lateral RESUMO (Leads, Novos 7d, Automações, Agentes IA, Conversão)
- **Analytics**: hero com globo/mapa mundial 3D em card escuro + coluna KPIs (Leads, Vendas, Em Recuperação, Faturamento)
- **Chat (WhatsApp)**: lista de conversas à esquerda (abas Tudo/Não lidas/Favoritas/Grupos), thread ao centro estilo WhatsApp, composer inferior
- **Contatos (Leads)**: tabela minimalista com avatares, coluna Tags, Última msg, botão "Disparar fluxo" por linha, paginação
- **Configurações**: card grande de Perfil + grid 2x2 lateral (Senha, 2FA, IA MCP, Sessão) com tokens IA do mês
- **Integrações**: 6 cards grandes (Instagram em breve, WhatsApp, Plataformas de Venda, E-mail, Telegram, Webhooks)

## Fase 3 — Páginas novas

- **Pipeline (Kanban)**: 5 colunas (Em curso, Aguardando resposta, Aguardando timer, Concluído, Falhou/Cancelado), cards de lead com tags, drag-and-drop entre colunas, contador por coluna. Persiste `status` em `leads`.
- **Agentes IA**: lista + editor de agente (Persona, Instruções de venda, Base de conhecimento, Ativação com contas WhatsApp, Palavras-chave, Modo recepcionista, Ações da IA, botões Rascunho/Ativar/Salvar). Nova tabela `ai_agents`.
- **Projetos**, **Comentários**, **Inbox**: shells básicos com estados vazios estilizados (para não deixar rotas quebradas).

## Fase 4 — Editor visual de Automações (a parte mais crítica)

Substitui `CriativosIA`/fluxo atual por um **editor de canvas** usando **React Flow** (`@xyflow/react`):
- Canvas infinito com grid, pan, zoom, minimap, controles
- Toolbar inferior fixa: Mensagem, Pergunta, Atraso, Condição, Random, Conectar, Ação, Agente IA, Alerta
- Header: nome do fluxo, badges WhatsApp/LIVE, botões Visualizar / Importar / Exportar / Histórico / Ativo / Republicar
- **Blocos** (nós customizados): Início, Mensagem, Pergunta, Condição, Delay, Espera, IA, Random, Webhook, Pipeline, Tag, Variável, Pagamento, HTTP Request, Fim — cada um com handles de entrada/saída
- Configuração **inline** em cada bloco (sem sidebar de propriedades)
  - Mensagem: texto + toggles imagem/vídeo/áudio/doc/botões/lista, delay de digitação, variáveis `%nome%`
  - Pergunta: tipo (texto/número/telefone/email/CPF/data/múltipla escolha), salvar em variável, opções
  - Condição: IF/ELSE com operadores (maior, menor, igual, contém, não contém, regex)
  - IA: prompt, modelo, temperatura, fallback
- Conexões bezier, seleção múltipla, copiar/duplicar/excluir, undo/redo (histórico local)
- Persistência em nova tabela `automations` (nodes + edges como JSONB)

## Fase 5 — Landing e Auth

Landing e telas de login/registro **não fazem parte das imagens** — mantidas como estão. Confirmar se devem ser retrabalhadas também.

---

## Detalhes técnicos

- Novas dependências: `@xyflow/react` (editor de fluxo), `@dnd-kit/core` + `@dnd-kit/sortable` (kanban)
- Novas migrações:
  - `ai_agents` (persona, instructions, knowledge_base, keywords, active_hours, whatsapp_account_id, status)
  - `automations` (name, status, nodes JSONB, edges JSONB, channel, is_live)
  - Todas com RLS por `user_id` + GRANTs padrão
- Nenhuma alteração em: `profiles`, `user_roles`, `leads`, `subscriptions`, `plans`, `whatsapp_connections`, `campaigns`, `creatives`, `metrics_daily`, `predictions`, edge function `generate-creatives`
- Todas as páginas atuais mantêm suas queries — só troca JSX/estilo
- Tema mantido: dark graphite com accent emerald (as imagens usam azul → vira emerald no nosso app)

## Ordem de entrega

1. Fase 1 (shell) — 1 turno
2. Fase 2 (6 páginas redesenhadas) — 2 turnos
3. Fase 3 (Kanban + Agentes IA + shells) — 2 turnos
4. Fase 4 (editor de automações) — 3 turnos, a maior peça

Total: ~8 turnos de implementação.

---

**Confirma que posso começar pela Fase 1?** E responda também:
1. Landing/Login/Register: manter como estão ou também refazer?
2. As páginas atuais **RecuperacaoIA** e **Campanhas** somem (viram parte de Automações) — ok?
3. Editor de automações: ok usar **React Flow** como base?
