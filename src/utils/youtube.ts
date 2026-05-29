/** Extract a YouTube video id from common watch and short URLs. */
export function youtubeVideoId(url: string): string | null {
  const trimmed = url.trim()
  if (!trimmed) {
    return null
  }

  try {
    const parsed = new URL(trimmed)

    if (parsed.hostname === 'youtu.be') {
      const id = parsed.pathname.slice(1).split('/')[0]
      return id || null
    }

    if (
      parsed.hostname === 'youtube.com'
      || parsed.hostname === 'www.youtube.com'
      || parsed.hostname === 'm.youtube.com'
    ) {
      const fromQuery = parsed.searchParams.get('v')
      if (fromQuery) {
        return fromQuery
      }

      const embedMatch = parsed.pathname.match(/\/embed\/([^/?]+)/)
      if (embedMatch?.[1]) {
        return embedMatch[1]
      }

      const shortsMatch = parsed.pathname.match(/\/shorts\/([^/?]+)/)
      if (shortsMatch?.[1]) {
        return shortsMatch[1]
      }
    }
  } catch {
    return null
  }

  return null
}
