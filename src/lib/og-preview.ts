export interface OgPreviewData {
  url: string;
  title: string | null;
  description: string | null;
  image: string | null;
  siteName: string | null;
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(Number(num)));
}

function readMetaContent(html: string, key: string): string | null {
  const patterns = [
    new RegExp(
      `<meta[^>]+(?:property|name)=["']${key}["'][^>]+content=["']([^"']+)["']`,
      "i",
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${key}["']`,
      "i",
    ),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return decodeHtmlEntities(match[1].trim());
  }

  return null;
}

function readTitle(html: string): string | null {
  const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return match?.[1] ? decodeHtmlEntities(match[1].trim()) : null;
}

function resolveImageUrl(image: string | null, pageUrl: URL): string | null {
  if (!image) return null;
  try {
    return new URL(image, pageUrl).toString();
  } catch {
    return null;
  }
}

export function isPublicHttpUrl(value: string): URL | null {
  try {
    const parsed = new URL(value.trim());
    if (!["http:", "https:"].includes(parsed.protocol)) return null;

    const hostname = parsed.hostname.toLowerCase();
    if (
      hostname === "localhost" ||
      hostname.endsWith(".local") ||
      hostname === "127.0.0.1" ||
      hostname === "::1" ||
      hostname.startsWith("10.") ||
      hostname.startsWith("192.168.") ||
      /^172\.(1[6-9]|2\d|3[0-1])\./.test(hostname)
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export async function fetchOgPreview(rawUrl: string): Promise<OgPreviewData> {
  const parsed = isPublicHttpUrl(rawUrl);
  if (!parsed) {
    throw new Error("Enter a valid public http(s) URL.");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(parsed.toString(), {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; PortfolioBot/1.0; +https://example.com)",
        Accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`Could not fetch URL (${response.status}).`);
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) {
      throw new Error("URL did not return an HTML page.");
    }

    const html = (await response.text()).slice(0, 500_000);

    const title =
      readMetaContent(html, "og:title") ??
      readMetaContent(html, "twitter:title") ??
      readTitle(html);

    const description =
      readMetaContent(html, "og:description") ??
      readMetaContent(html, "twitter:description") ??
      readMetaContent(html, "description");

    const image = resolveImageUrl(
      readMetaContent(html, "og:image") ??
        readMetaContent(html, "twitter:image") ??
        readMetaContent(html, "twitter:image:src"),
      parsed,
    );

    const siteName =
      readMetaContent(html, "og:site_name") ?? parsed.hostname.replace(/^www\./, "");

    return {
      url: parsed.toString(),
      title,
      description,
      image,
      siteName,
    };
  } finally {
    clearTimeout(timeout);
  }
}

export function hostnameFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
