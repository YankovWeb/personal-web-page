const TWITTER_BLOCKQUOTE =
  /<blockquote[^>]*class="[^"]*twitter-tweet[^"]*"[\s\S]*?<\/blockquote>/i;

const TWEET_STATUS_URL =
  /https?:\/\/(?:x\.com|twitter\.com)\/[^/"'\s]+\/status\/(\d+)/i;

export function extractTwitterBlockquote(html: string): string | null {
  const match = html.match(TWITTER_BLOCKQUOTE);
  return match?.[0] ?? null;
}

export function extractTweetId(html: string): string | null {
  const match = html.match(TWEET_STATUS_URL);
  return match?.[1] ?? null;
}

export function extractTweetUrl(html: string): string | null {
  const match = html.match(TWEET_STATUS_URL);
  return match?.[0] ?? null;
}

export function parseTwitterPaste(input: string): {
  embedHtml: string | null;
  tweetId: string | null;
  tweetUrl: string | null;
} {
  const trimmed = input.trim();
  const embedHtml = extractTwitterBlockquote(trimmed);
  const source = embedHtml ?? trimmed;

  return {
    embedHtml,
    tweetId: extractTweetId(source),
    tweetUrl: extractTweetUrl(source),
  };
}

export function isValidTwitterEmbed(input: string): boolean {
  const { embedHtml, tweetId } = parseTwitterPaste(input);
  return Boolean(embedHtml && tweetId);
}
