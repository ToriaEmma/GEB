-- BEG Dashboard Database Schema

-- 1. Profiles & Roles
CREATE TYPE user_role AS ENUM ('DG_CEO', 'BUSINESS_DEV');

CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role user_role DEFAULT 'BUSINESS_DEV',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. News (Actualités)
CREATE TYPE content_status AS ENUM ('draft', 'pending_validation', 'approved', 'rejected');

CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title_fr TEXT NOT NULL,
  title_en TEXT NOT NULL,
  excerpt_fr TEXT,
  excerpt_en TEXT,
  content_fr TEXT,
  content_en TEXT,
  category TEXT NOT NULL,
  image_url TEXT,
  author_id UUID REFERENCES profiles(id),
  status content_status DEFAULT 'draft',
  is_featured BOOLEAN DEFAULT false,
  read_time INTEGER,
  likes INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Projects (Réalisations)
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description_fr TEXT,
  description_en TEXT,
  client TEXT,
  category TEXT NOT NULL,
  image_url TEXT,
  link TEXT,
  date_string TEXT,
  is_featured BOOLEAN DEFAULT false,
  status content_status DEFAULT 'approved',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Services
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_fr TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_fr TEXT,
  description_en TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Comments
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  parent_id UUID REFERENCES comments(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Contact Messages
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  is_archived BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Stats
CREATE TABLE site_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT,
  target_type TEXT,
  target_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
