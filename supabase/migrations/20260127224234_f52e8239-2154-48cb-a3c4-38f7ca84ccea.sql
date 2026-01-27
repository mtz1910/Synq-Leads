-- Create enum for subscription plans
CREATE TYPE public.subscription_plan AS ENUM ('free', 'pro', 'premium');

-- Create enum for subscription status
CREATE TYPE public.subscription_status AS ENUM ('active', 'canceled', 'past_due', 'trialing');

-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create plans table (lookup table)
CREATE TABLE public.plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name subscription_plan NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  features JSONB DEFAULT '[]'::jsonb,
  predictions_per_day INTEGER NOT NULL DEFAULT 5,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insert default plans
INSERT INTO public.plans (name, display_name, price, predictions_per_day, features) VALUES
  ('free', 'Gratuito', 0, 5, '["5 predições/dia", "Estatísticas básicas"]'),
  ('pro', 'Pro', 29.90, 50, '["50 predições/dia", "Alertas Telegram", "Estatísticas avançadas", "Histórico completo"]'),
  ('premium', 'Premium', 79.90, -1, '["Predições ilimitadas", "Alertas prioritários", "API access", "Suporte prioritário", "Kelly Criterion"]');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  telegram_chat_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  UNIQUE (user_id, role)
);

-- Create subscriptions table
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.plans(id),
  status subscription_status NOT NULL DEFAULT 'active',
  stripe_subscription_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create predictions history table
CREATE TABLE public.predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  match_id TEXT NOT NULL,
  home_team TEXT NOT NULL,
  away_team TEXT NOT NULL,
  league TEXT,
  match_date TIMESTAMPTZ NOT NULL,
  prediction_type TEXT NOT NULL, -- 'winner', 'over_under', 'corners', etc.
  predicted_outcome TEXT NOT NULL,
  confidence DECIMAL(5, 2) NOT NULL, -- AI confidence percentage
  odds_value DECIMAL(6, 2), -- Odds from bookmaker
  implied_probability DECIMAL(5, 2), -- Probability from odds
  expected_value DECIMAL(8, 4), -- Calculated EV
  kelly_stake DECIMAL(5, 4), -- Suggested stake by Kelly
  actual_outcome TEXT, -- Filled after match
  is_correct BOOLEAN, -- Filled after match
  profit_loss DECIMAL(10, 2), -- Calculated P/L
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create team favorites table
CREATE TABLE public.team_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  team_id TEXT NOT NULL,
  team_name TEXT NOT NULL,
  league TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, team_id)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;

-- Helper function: Check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Helper function: Check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin')
$$;

-- Plans: Everyone can read
CREATE POLICY "Plans are publicly readable"
  ON public.plans FOR SELECT
  USING (true);

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- User roles policies (admins only can manage)
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR public.is_admin());

-- Subscriptions policies
CREATE POLICY "Users can view own subscription"
  ON public.subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can insert own subscription"
  ON public.subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscription"
  ON public.subscriptions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id OR public.is_admin());

-- Predictions policies
CREATE POLICY "Users can view own predictions"
  ON public.predictions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can insert own predictions"
  ON public.predictions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Team favorites policies
CREATE POLICY "Users can view own favorites"
  ON public.team_favorites FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can insert own favorites"
  ON public.team_favorites FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
  ON public.team_favorites FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  free_plan_id UUID;
BEGIN
  -- Get the free plan ID
  SELECT id INTO free_plan_id FROM public.plans WHERE name = 'free';
  
  -- Create profile
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)));
  
  -- Create default role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  -- Create free subscription
  INSERT INTO public.subscriptions (user_id, plan_id, status)
  VALUES (NEW.id, free_plan_id, 'active');
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();