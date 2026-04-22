-- ============================================
-- viralers.io Supabase 스키마
-- Supabase Dashboard > SQL Editor에서 실행
-- ============================================

-- 수강 신청자 테이블
create table if not exists public.subscribers (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null unique,
  phone       text not null,
  courses     text[]          default '{}',
  created_at  timestamptz     default now(),
  kakao_sent  boolean         default false
);

-- 메시지 발송 이력
create table if not exists public.messages_log (
  id          uuid primary key default gen_random_uuid(),
  type        text not null,   -- 'welcome' | 'broadcast'
  content     text,
  sent_count  int  default 0,
  fail_count  int  default 0,
  sent_at     timestamptz default now()
);

-- 라이브 배너
create table if not exists public.live_banner (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  date        text default '',
  link        text default '',
  is_active   boolean default false,
  created_at  timestamptz default now()
);

-- RLS (Row Level Security) 설정
alter table public.subscribers enable row level security;
alter table public.messages_log enable row level security;
alter table public.live_banner enable row level security;

-- subscribers: 서비스 롤만 쓰기 가능, 읽기 불가 (anon)
create policy "service_role_all" on public.subscribers
  for all using (auth.role() = 'service_role');

-- messages_log: 서비스 롤만 접근
create policy "service_role_all" on public.messages_log
  for all using (auth.role() = 'service_role');

-- live_banner: 누구나 읽기 가능 (공개 배너), 쓰기는 서비스 롤만
create policy "public_read" on public.live_banner
  for select using (true);

create policy "service_role_write" on public.live_banner
  for all using (auth.role() = 'service_role');

-- 인덱스
create index if not exists idx_subscribers_email on public.subscribers(email);
create index if not exists idx_subscribers_created_at on public.subscribers(created_at desc);
create index if not exists idx_live_banner_active on public.live_banner(is_active);
