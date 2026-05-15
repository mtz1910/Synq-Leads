## Synq Leads — Plano de execução

Sua lista é enorme (16 problemas + 7 etapas). Para evitar quebrar o app, vou dividir em **fases entregues em mensagens separadas**. Você aprova esta fase 1 e seguimos.

---

### Fase 1 — Rebrand + correções críticas de UX (esta entrega)

**Rebrand "LeadVolt AI" → "Synq Leads"**
- Trocar nome em Landing, Login, Register, Dashboard, sidebar, `index.html` (title/meta), memória do projeto
- Novo slogan na Landing: *"Recupere **clientes** automaticamente com inteligência artificial. **MIL** funcionários **TRABALHANDO** por você **TODOS** os dias, para aumentar seu **DINHEIRO** quase de **GRAÇA**"*

**Correções críticas (itens 6, 7, 8, 13, 16)**
- **#7/#8** Remover botões "Teste grátis" e "Ver demo do dashboard" que logam direto sem auth → redirecionar para `/register`
- **#6** Modal de confirmação ao deslogar
- **#13** Cor do texto no plano Growth (legibilidade sobre fundo escuro/claro)
- **#16** Mobile responsivo: caixa "Disparar campanha" no Dashboard, badges de status em Campanhas, opções em Leads — tudo com `flex-wrap`, `truncate`, `min-w-0`, breakpoints corretos
- Garantir nada saia das bordas em nenhuma página

**Logout com confirmação + WhatsApp flutuante (#14)**
- Botão WhatsApp flutuante no canto da Landing (você me passa o número depois, deixo placeholder editável)

---

### Fase 2 — Dados reais por usuário (itens 1, 5, 10, 11, 12, e Etapa 1)

Criar tabelas no backend (Lovable Cloud) para cada usuário ter dados isolados:
- `leads`, `campaigns`, `creatives`, `whatsapp_connections`, `metrics_daily`
- Todas com RLS por `user_id`
- Substituir todos os mocks por queries reais
- Conta nova = tudo zerado
- Gráficos com Recharts (Receita recuperada, Analytics) com tooltip e hover
- Cards de métricas clicáveis abrindo modal com detalhe diário
- Página Configurações persistindo nome de exibição
- Criativos IA usando edge function + Lovable AI Gateway (Gemini) — geração real
- Recuperação IA: criar/pausar/disparar campanhas funcionando

---

### Fase 3 — Auth robusto (item 9)

- Verificação de email obrigatória (desativar auto-confirm)
- Validação de senha: 6+ chars, maiúscula, minúscula, número, caractere especial
- Telefone único por conta (constraint no DB)
- Mensagens de erro específicas (email não confirmado, senha errada, etc.)
- Página `/reset-password`
- Login com Google

---

### Fase 4 — Pricing real + bloqueio por plano (Etapa 4, 5)

- Atualizar planos na Landing:
  - **Starter R$79,90/mês** — "Para validar o canal · recupere até R$4.000/mês · até 500 leads/mês" — botão "Assinar Starter"
  - **Growth R$319 → R$197/mês** (oferta) — "Para os 20 primeiros · Para quem já vende todo dia · recupere até R$10.000/mês · 2.000 leads/mês · curso Marketing Digital R$0→R$100k · grupo VIP vitalício"
  - **Scale** — "Gerente real 24/7 · Para operações de alto volume · R$30.000+/mês · curso R$0→R$500k · grupo VIP vitalício"
- Integração de pagamento com **Mercado Pago** (você fornece access token)
- Gating de páginas por plano com tela "Faça upgrade para acessar"
- Página dedicada `/upgrade`

---

### Fase 5 — Integrações reais (Etapa 2, 3)

- **OpenAI/Lovable AI**: já incluído na Fase 2 para criativos
- **WhatsApp real**: requer serviço externo (Evolution API, Z-API, WPPConnect ou Cloud API oficial). WhatsApp não tem SDK gratuito direto — preciso saber qual provedor você quer usar antes
- Conversas em tempo real após QR (item 15) depende dessa escolha

---

### Fase 6 — Logs de erro (Etapa 7)

- Tabela `error_logs` capturando user_id, página, erro, stack
- Edge function central de logging
- Visualização para admin

---

### Perguntas antes de começar a Fase 1

1. **Número de WhatsApp** para o botão flutuante? (posso deixar `+55 00 00000-0000` como placeholder)
2. Confirma que posso **remover completamente** os botões "Teste grátis" / "Ver demo" sem fluxo demo?

Se topar, eu começo pela **Fase 1** agora. As demais fases entrego em sequência conforme você aprovar.