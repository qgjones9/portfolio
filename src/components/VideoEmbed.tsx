import { ExternalLink, Play } from 'lucide-react'
import { youtubeVideoId } from '../utils/youtube'

interface VideoEmbedProps {
  url: string
  title?: string
}

export default function VideoEmbed({
  url,
  title = 'Video walkthrough',
}: VideoEmbedProps) {
  const videoId = youtubeVideoId(url)

  if (!videoId) {
    return (
      <div className="mt-3 rounded-lg border border-zinc-800/90 bg-zinc-950/50 p-4">
        <div className="flex aspect-video items-center justify-center rounded-md border border-dashed border-zinc-700/70 bg-zinc-900/60">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-violet-500/35 bg-violet-500/10 px-4 py-2.5 text-sm font-semibold text-zinc-50 transition-colors hover:border-violet-400/55 hover:bg-violet-500/20"
          >
            <Play className="h-4 w-4 shrink-0" aria-hidden />
            Open video walkthrough
            <ExternalLink
              className="h-3.5 w-3.5 shrink-0 opacity-70"
              aria-hidden
            />
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-3 overflow-hidden rounded-lg border border-zinc-800/90 bg-zinc-950/50 ring-1 ring-zinc-800/50">
      <div className="relative aspect-video w-full bg-zinc-950">
        <iframe
          className="absolute inset-0 h-full w-full border-0"
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  )
}
