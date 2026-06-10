-- PixelAI Database Schema

-- Profiles (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Credits balance
CREATE TABLE public.credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  balance INTEGER DEFAULT 5 NOT NULL,
  total_purchased INTEGER DEFAULT 0,
  total_used INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Credit transactions
CREATE TABLE public.credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('purchase', 'usage', 'bonus', 'refund')),
  amount INTEGER NOT NULL,
  description TEXT,
  stripe_session_id TEXT,
  package_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Generations
CREATE TABLE public.generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('image', 'video', 'face_swap', 'voice', 'upscale', 'motion')),
  prompt TEXT,
  input_urls TEXT[],
  output_url TEXT,
  status TEXT DEFAULT 'processing' CHECK (status IN ('processing', 'completed', 'failed')),
  credits_used INTEGER NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_credits_user ON public.credits(user_id);
CREATE INDEX idx_transactions_user ON public.credit_transactions(user_id);
CREATE INDEX idx_transactions_stripe ON public.credit_transactions(stripe_session_id);
CREATE INDEX idx_transactions_created ON public.credit_transactions(created_at DESC);
CREATE INDEX idx_generations_user ON public.generations(user_id);
CREATE INDEX idx_generations_type ON public.generations(type);
CREATE INDEX idx_generations_status ON public.generations(status);
CREATE INDEX idx_generations_created ON public.generations(created_at DESC);

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generations ENABLE ROW LEVEL SECURITY;

-- Users can read/update own data
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users read own credits" ON public.credits FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users read own transactions" ON public.credit_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users read own generations" ON public.generations FOR SELECT USING (auth.uid() = user_id);

-- Service role full access (for API routes using service key)
CREATE POLICY "Service full access profiles" ON public.profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service full access credits" ON public.credits FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service full access transactions" ON public.credit_transactions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service full access generations" ON public.generations FOR ALL USING (true) WITH CHECK (true);

-- Auto-create profile + credits on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'name', NEW.email);

  INSERT INTO public.credits (user_id, balance)
  VALUES (NEW.id, 5);

  INSERT INTO public.credit_transactions (user_id, type, amount, description)
  VALUES (NEW.id, 'bonus', 5, 'Créditos de boas-vindas');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
