// FILE: app/podcast/feed.xml/route.ts
// Generates an RSS 2.0 + iTunes-compatible podcast feed from the episode MDX files.
// Submit this URL to Spotify for Podcasters, Apple Podcasts Connect, etc.
import { getAllPodcastEpisodes } from '@/lib/content';

export const runtime = 'nodejs';

const BASE = 'https://kunwaranalytics.in';
const PODCAST_TITLE = 'The Kunwar Analytics Podcast';
const PODCAST_DESCRIPTION =
  'Market intelligence in 30 minutes. Sharp analysis on Indian startups, quick commerce, financial markets, and institutional-grade research from Kunwar Analytics.';

const DIRECT_AUDIO_RE = /\.(mp3|m4a|m4b|wav|ogg|oga|aac|flac|opus)(\?.*)?$/i;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function GET() {
  const episodes = getAllPodcastEpisodes();

  const items = episodes
    .map((episode) => {
      const episodeUrl = `${BASE}/podcast/${episode.slug}`;
      const enclosureUrl = episode.mp3Url ?? (episode.audioUrl && DIRECT_AUDIO_RE.test(episode.audioUrl) ? episode.audioUrl : undefined);

      return `    <item>
      <title>${escapeXml(episode.title)}</title>
      <link>${episodeUrl}</link>
      <guid isPermaLink="true">${episodeUrl}</guid>
      <pubDate>${new Date(episode.date).toUTCString()}</pubDate>
      <description><![CDATA[${episode.description}]]></description>
      <itunes:duration>${escapeXml(episode.duration)}</itunes:duration>
      <itunes:episode>${episode.episodeNumber}</itunes:episode>
      <itunes:episodeType>full</itunes:episodeType>
      ${episode.season ? `<itunes:season>${episode.season}</itunes:season>` : ''}
      ${episode.guestName ? `<itunes:author>${escapeXml(episode.guestName)}${episode.guestRole ? ` — ${escapeXml(episode.guestRole)}` : ''}</itunes:author>` : ''}
      ${enclosureUrl ? `<enclosure url="${escapeXml(enclosureUrl)}" length="0" type="audio/mpeg" />` : ''}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(PODCAST_TITLE)}</title>
    <link>${BASE}/podcast</link>
    <atom:link href="${BASE}/podcast/feed.xml" rel="self" type="application/rss+xml" />
    <language>en-in</language>
    <description>${escapeXml(PODCAST_DESCRIPTION)}</description>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <itunes:author>Kunwar Analytics</itunes:author>
    <itunes:explicit>false</itunes:explicit>
    <itunes:image href="${BASE}/icons/icon-512.png" />
    <itunes:category text="Business">
      <itunes:category text="Investing" />
    </itunes:category>
    <itunes:summary>${escapeXml(PODCAST_DESCRIPTION)}</itunes:summary>
    <itunes:subtitle>Market intelligence in 30 minutes.</itunes:subtitle>
    <itunes:owner>
      <itunes:name>Kunwar Analytics</itunes:name>
      <itunes:email>hello@kunwaranalytics.in</itunes:email>
    </itunes:owner>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
