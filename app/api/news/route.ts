import { NextResponse } from "next/server";

// Lightweight RSS/Atom parsing without dependencies (best-effort)
// Handles common tags from RSS 2.0 (<item>) and Atom (<entry>)
function parseRss(xml: string) {
  const items: Array<{
    title: string;
    link: string;
    pubDate: string;
    source: string;
  }> = [];

  // Try RSS 2.0 <item>
  const itemMatches = xml.split(/<item[\s>]/i).slice(1);
  if (itemMatches.length > 0) {
    for (const chunk of itemMatches) {
      const itemXml = "<item" + chunk;
      const title = (itemXml.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "").replace(/<!\[CDATA\[|\]\]>/g, "").trim();
      const link = (itemXml.match(/<link>([\s\S]*?)<\/link>/i)?.[1] || "").trim();
      const pubDate = (itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1] || itemXml.match(/<updated>([\s\S]*?)<\/updated>/i)?.[1] || "").trim();
      items.push({ title, link, pubDate, source: "rss" });
    }
  }

  // Try Atom <entry>
  const entryMatches = xml.split(/<entry[\s>]/i).slice(1);
  if (entryMatches.length > 0) {
    for (const chunk of entryMatches) {
      const entryXml = "<entry" + chunk;
      const title = (entryXml.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "").replace(/<!\[CDATA\[|\]\]>/g, "").trim();
      const link = (entryXml.match(/<link[^>]*href=["']([^"']+)["'][^>]*\/>/i)?.[1] || "").trim();
      const pubDate = (entryXml.match(/<updated>([\s\S]*?)<\/updated>/i)?.[1] || entryXml.match(/<published>([\s\S]*?)<\/published>/i)?.[1] || "").trim();
      items.push({ title, link, pubDate, source: "atom" });
    }
  }

  return items
    .filter(x => x.title && x.link)
    .map(x => ({
      title: decodeHtml(x.title),
      url: x.link,
      publishedAt: parseDate(x.pubDate),
    }));
}

function decodeHtml(text: string) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function parseDate(s: string) {
  const d = new Date(s);
  if (!isNaN(d.getTime())) return d.toISOString();
  return new Date().toISOString();
}

async function fetchFeed(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, {
      // Force server fetch and avoid caching for near real-time updates
      cache: "no-store",
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; F1VisualsBot/1.0; +https://example.com)",
        accept: "application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
      },
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
    const xml = await res.text();
    return parseRss(xml);
  } finally {
    clearTimeout(timeout);
  }
}

export async function GET() {
  // A couple of reputable, public F1 news feeds
  const sources = [
    "https://feeds.bbci.co.uk/sport/formula1/rss.xml",
    "https://www.autosport.com/rss/f1/news/all",
  ];

  try {
    const results = await Promise.allSettled(sources.map(fetchFeed));
    const articles = results
      .flatMap(r => (r.status === "fulfilled" ? r.value : []))
      .filter(Boolean)
      .sort((a: any, b: any) => (b.publishedAt || "").localeCompare(a.publishedAt || ""))
      .slice(0, 18);

    return NextResponse.json({ articles, updatedAt: new Date().toISOString() }, { headers: { "Cache-Control": "no-store" } });
  } catch (e: any) {
    return NextResponse.json({ articles: [], error: e?.message || "Failed to load" }, { status: 500 });
  }
}
