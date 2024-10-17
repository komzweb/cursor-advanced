-- ユーザーテーブル
CREATE TABLE users (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 動画テーブル
CREATE TABLE videos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  file_path TEXT NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 購入テーブル
CREATE TABLE purchases (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  video_id UUID REFERENCES videos(id) NOT NULL,
  stripe_payment_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 新規ユーザー登録時にユーザーエントリを自動作成する関数
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- トリガーの作成
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLSの有効化
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- ユーザーテーブルのポリシー
CREATE POLICY "ユーザーは自身の情報のみ閲覧可能" ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "ユーザーは自身の情報のみ更新可能" ON users FOR UPDATE
  USING (auth.uid() = id);

-- 動画テーブルのポリシー
CREATE POLICY "管理者は全ての動画を閲覧可能" ON videos FOR SELECT
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = TRUE));

CREATE POLICY "一般ユーザーは購入した動画のみ閲覧可能" ON videos FOR SELECT
  USING (EXISTS (SELECT 1 FROM purchases WHERE user_id = auth.uid() AND video_id = videos.id));

CREATE POLICY "管理者は動画をアップロード可能" ON videos FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = TRUE));

CREATE POLICY "管理者は自身の動画を更新可能" ON videos FOR UPDATE
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = TRUE))
  WITH CHECK (user_id = auth.uid());

-- 購入テーブルのポリシー
CREATE POLICY "ユーザーは自身の購入履歴のみ閲覧可能" ON purchases FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "ユーザーは購入可能" ON purchases FOR INSERT
  WITH CHECK (auth.uid() = user_id);
