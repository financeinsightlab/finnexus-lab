/**
 * Helper to fetch and extract rich metadata from any public website URL for promotions.
 */

export interface CrawledPromotionMetadata {
  brandName: string;
  title: string;
  shortDescription: string;
  imageUrl: string | null;
  liveScreenshotUrl: string;
  logoUrl: string | null;
  destinationUrl: string;
  suggestedCta: string;
  category: string;
  extractedImages: string[];
}

function decodeHtmlEntities(str: string): string {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function getAttribute(tagHtml: string, attrName: string): string | null {
  const match = tagHtml.match(new RegExp(`${attrName}\\s*=\\s*["']([^"']+)["']`, 'i'));
  return match ? match[1] : null;
}

export async function crawlWebsiteUrl(rawUrl: string): Promise<CrawledPromotionMetadata> {
  const trimmed = rawUrl.trim();
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(trimmed.startsWith('http://') || trimmed.startsWith('https://') ? trimmed : `https://${trimmed}`);
  } catch {
    throw new Error('Invalid website URL. Please provide a valid HTTP or HTTPS address.');
  }

  // Generate live visual screenshot URL via high-reliability screenshot engine
  const liveScreenshotUrl = `https://s0.wp.com/mshots/v1/${encodeURIComponent(parsedUrl.toString())}?w=1280`;

  let html = '';
  try {
    const response = await fetch(parsedUrl.toString(), {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 (KunwarAnalytics-Bot/1.0)',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      signal: AbortSignal.timeout(10000),
    });

    if (response.ok) {
      html = await response.text();
    }
  } catch {
    // If fetch failed (e.g. rate-limit or anti-scraping), we still return parsed URL with live screenshot!
  }

  // 1. Title Extraction (og:title -> twitter:title -> <title>)
  let title = '';
  const ogTitleMatch =
    html.match(/<meta[^>]+property\s*=\s*["']og:title["'][^>]*>/i) ||
    html.match(/<meta[^>]+content\s*=[^>]+property\s*=\s*["']og:title["'][^>]*>/i);
  if (ogTitleMatch) title = getAttribute(ogTitleMatch[0], 'content') || '';

  if (!title) {
    const twTitleMatch =
      html.match(/<meta[^>]+name\s*=\s*["']twitter:title["'][^>]*>/i) ||
      html.match(/<meta[^>]+content\s*=[^>]+name\s*=\s*["']twitter:title["'][^>]*>/i);
    if (twTitleMatch) title = getAttribute(twTitleMatch[0], 'content') || '';
  }

  if (!title) {
    const titleTagMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (titleTagMatch) title = titleTagMatch[1];
  }
  title = decodeHtmlEntities(title);

  // 2. Description Extraction (og:description -> twitter:description -> meta description)
  let description = '';
  const ogDescMatch =
    html.match(/<meta[^>]+property\s*=\s*["']og:description["'][^>]*>/i) ||
    html.match(/<meta[^>]+content\s*=[^>]+property\s*=\s*["']og:description["'][^>]*>/i);
  if (ogDescMatch) description = getAttribute(ogDescMatch[0], 'content') || '';

  if (!description) {
    const twDescMatch =
      html.match(/<meta[^>]+name\s*=\s*["']twitter:description["'][^>]*>/i) ||
      html.match(/<meta[^>]+content\s*=[^>]+name\s*=\s*["']twitter:description["'][^>]*>/i);
    if (twDescMatch) description = getAttribute(twDescMatch[0], 'content') || '';
  }

  if (!description) {
    const metaDescMatch =
      html.match(/<meta[^>]+name\s*=\s*["']description["'][^>]*>/i) ||
      html.match(/<meta[^>]+content\s*=[^>]+name\s*=\s*["']description["'][^>]*>/i);
    if (metaDescMatch) description = getAttribute(metaDescMatch[0], 'content') || '';
  }
  description = decodeHtmlEntities(description);

  // 3. Image URL Extraction (og:image -> twitter:image -> in-page images -> live screenshot)
  let imageUrl: string | null = null;
  const ogImgMatch =
    html.match(/<meta[^>]+property\s*=\s*["']og:image["'][^>]*>/i) ||
    html.match(/<meta[^>]+content\s*=[^>]+property\s*=\s*["']og:image["'][^>]*>/i);
  if (ogImgMatch) imageUrl = getAttribute(ogImgMatch[0], 'content');

  if (!imageUrl) {
    const twImgMatch =
      html.match(/<meta[^>]+name\s*=\s*["']twitter:image["'][^>]*>/i) ||
      html.match(/<meta[^>]+content\s*=[^>]+name\s*=\s*["']twitter:image["'][^>]*>/i);
    if (twImgMatch) imageUrl = getAttribute(twImgMatch[0], 'content');
  }

  if (imageUrl) {
    try {
      imageUrl = new URL(imageUrl, parsedUrl.origin).toString();
    } catch {
      imageUrl = null;
    }
  }

  // Extract in-page candidate images
  const extractedImages: string[] = [];
  const imgTags = Array.from(html.matchAll(/<img[^>]+src\s*=\s*["']([^"']+)["'][^>]*>/gi));
  for (const tag of imgTags) {
    const src = tag[1]?.trim();
    if (!src || src.startsWith('data:image/svg') || src.length < 5) continue;
    try {
      const full = new URL(src, parsedUrl.origin).toString();
      if (!extractedImages.includes(full) && !full.includes('1x1') && !full.includes('pixel')) {
        extractedImages.push(full);
      }
    } catch {
      // ignore
    }
    if (extractedImages.length >= 8) break;
  }

  // If no meta image was found, default to live website screenshot or prominent in-page image
  if (!imageUrl) {
    imageUrl = liveScreenshotUrl;
  }

  // 4. Logo / Favicon Extraction
  let logoUrl: string | null = null;
  const iconMatch =
    html.match(/<link[^>]+rel\s*=\s*["'](?:apple-touch-icon|shortcut icon|icon)["'][^>]*>/i) ||
    html.match(/<link[^>]+href\s*=[^>]+rel\s*=\s*["'](?:apple-touch-icon|shortcut icon|icon)["'][^>]*>/i);
  if (iconMatch) logoUrl = getAttribute(iconMatch[0], 'href');

  if (logoUrl) {
    try {
      logoUrl = new URL(logoUrl, parsedUrl.origin).toString();
    } catch {
      logoUrl = `${parsedUrl.origin}/favicon.ico`;
    }
  } else {
    logoUrl = `${parsedUrl.origin}/favicon.ico`;
  }

  // 5. Brand Name Extraction (og:site_name -> title prefix/suffix -> domain name)
  let brandName = '';
  const siteMatch =
    html.match(/<meta[^>]+property\s*=\s*["']og:site_name["'][^>]*>/i) ||
    html.match(/<meta[^>]+content\s*=[^>]+property\s*=\s*["']og:site_name["'][^>]*>/i);
  if (siteMatch) brandName = getAttribute(siteMatch[0], 'content') || '';

  if (!brandName && title) {
    // Check for "Brand Name - Title" or "Title | Brand Name"
    if (title.includes(' - ')) {
      brandName = title.split(' - ')[0].trim();
    } else if (title.includes(' | ')) {
      const parts = title.split(' | ');
      brandName = (parts[parts.length - 1] || parts[0]).trim();
    }
  }

  if (!brandName || brandName.length > 50) {
    const host = parsedUrl.hostname.replace(/^www\./, '');
    const main = host.split('.')[0] || 'Partner';
    brandName = main
      .split(/[-_]/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }
  brandName = decodeHtmlEntities(brandName);

  // Suggested category & CTA text
  let category = 'SAAS';
  const lowerDesc = (title + ' ' + description).toLowerCase();
  if (lowerDesc.includes('finance') || lowerDesc.includes('invest') || lowerDesc.includes('bank') || lowerDesc.includes('crypto')) {
    category = 'Finance';
  } else if (lowerDesc.includes('course') || lowerDesc.includes('learn') || lowerDesc.includes('academy') || lowerDesc.includes('education')) {
    category = 'Education';
  } else if (lowerDesc.includes('tool') || lowerDesc.includes('analytics') || lowerDesc.includes('seo') || lowerDesc.includes('software')) {
    category = 'Software / Tools';
  }

  let suggestedCta = 'Explore Platform';
  if (lowerDesc.includes('free trial') || lowerDesc.includes('start free')) {
    suggestedCta = 'Start Free Trial';
  } else if (lowerDesc.includes('tool') || lowerDesc.includes('calculate')) {
    suggestedCta = 'Try Tools Now';
  } else if (lowerDesc.includes('book') || lowerDesc.includes('schedule') || lowerDesc.includes('demo')) {
    suggestedCta = 'Book a Demo';
  } else if (lowerDesc.includes('learn') || lowerDesc.includes('guide')) {
    suggestedCta = 'Learn More';
  }

  return {
    brandName,
    title: title || `${brandName} — Official Platform`,
    shortDescription: description || `Discover ${brandName}'s platform and tools. Visit their official website for features and details.`,
    imageUrl: imageUrl || liveScreenshotUrl,
    liveScreenshotUrl,
    logoUrl,
    destinationUrl: parsedUrl.toString(),
    suggestedCta,
    category,
    extractedImages,
  };
}
