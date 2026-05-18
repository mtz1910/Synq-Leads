
-- Per-user data tables for Synq Leads

CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  source TEXT,
  status TEXT NOT NULL DEFAULT 'novo',
  value NUMERIC DEFAULT 0,
  last_contact_at TIMESTAMPTZ,
  recovered_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "leads_select_own" ON public.leads FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "leads_insert_own" ON public.leads FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "leads_update_own" ON public.leads FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "leads_delete_own" ON public.leads FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE INDEX idx_leads_user ON public.leads(user_id);
CREATE TRIGGER leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'rascunho',
  sequence_type TEXT,
  leads_count INT DEFAULT 0,
  conversion_rate NUMERIC DEFAULT 0,
  revenue NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "campaigns_select_own" ON public.campaigns FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "campaigns_insert_own" ON public.campaigns FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "campaigns_update_own" ON public.campaigns FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "campaigns_delete_own" ON public.campaigns FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE INDEX idx_campaigns_user ON public.campaigns(user_id);
CREATE TRIGGER campaigns_updated_at BEFORE UPDATE ON public.campaigns FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.creatives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  type TEXT NOT NULL,
  content TEXT NOT NULL,
  briefing JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.creatives ENABLE ROW LEVEL SECURITY;
CREATE POLICY "creatives_select_own" ON public.creatives FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "creatives_insert_own" ON public.creatives FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "creatives_delete_own" ON public.creatives FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE INDEX idx_creatives_user ON public.creatives(user_id);

CREATE TABLE public.whatsapp_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  phone_number TEXT NOT NULL,
  label TEXT,
  status TEXT NOT NULL DEFAULT 'desconectado',
  messages_sent INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.whatsapp_connections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "wa_select_own" ON public.whatsapp_connections FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "wa_insert_own" ON public.whatsapp_connections FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "wa_update_own" ON public.whatsapp_connections FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "wa_delete_own" ON public.whatsapp_connections FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE INDEX idx_wa_user ON public.whatsapp_connections(user_id);
CREATE TRIGGER wa_updated_at BEFORE UPDATE ON public.whatsapp_connections FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.metrics_daily (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  date DATE NOT NULL,
  leads_new INT DEFAULT 0,
  leads_recovered INT DEFAULT 0,
  messages_sent INT DEFAULT 0,
  revenue_recovered NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);
ALTER TABLE public.metrics_daily ENABLE ROW LEVEL SECURITY;
CREATE POLICY "metrics_select_own" ON public.metrics_daily FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "metrics_insert_own" ON public.metrics_daily FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "metrics_update_own" ON public.metrics_daily FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE INDEX idx_metrics_user_date ON public.metrics_daily(user_id, date DESC);
