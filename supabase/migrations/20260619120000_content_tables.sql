-- Migration: Create content tables for Owl integration
-- Tables: article_notes, youtube_posts, twitter_posts

-- Article notes: links + notes from articles
CREATE TABLE IF NOT EXISTS article_notes (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    url text NOT NULL,
    title text NOT NULL DEFAULT '',
    note text NOT NULL DEFAULT '',
    created_at timestamptz NOT NULL DEFAULT now()
);

-- YouTube posts: video metadata + notes
CREATE TABLE IF NOT EXISTS youtube_posts (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    video_url text NOT NULL,
    title text NOT NULL DEFAULT '',
    channel text NOT NULL DEFAULT '',
    note text NOT NULL DEFAULT '',
    created_at timestamptz NOT NULL DEFAULT now()
);

-- Twitter/X posts: tweet metadata + notes
CREATE TABLE IF NOT EXISTS twitter_posts (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tweet_url text NOT NULL,
    author text NOT NULL DEFAULT '',
    content text NOT NULL DEFAULT '',
    note text NOT NULL DEFAULT '',
    created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE article_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE youtube_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE twitter_posts ENABLE ROW LEVEL SECURITY;

-- Policy: allow all operations for anon (for Owl REST API writes)
-- NOTE: For production, restrict to service_role or specific role
CREATE POLICY "Allow all for anon" ON article_notes FOR ALL USING (true);
CREATE POLICY "Allow all for anon" ON youtube_posts FOR ALL USING (true);
CREATE POLICY "Allow all for anon" ON twitter_posts FOR ALL USING (true);
