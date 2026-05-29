# Runbook — YouTube demo uploads

Publish **unlisted** screen recordings for portfolio project demos. Unlisted videos are reachable by link but do not appear in YouTube search or on your public channel feed.

**Related:** [site runbook](runbook.md) · [Google: Upload a video (Python)](https://developers.google.com/youtube/v3/guides/uploading_a_video)

---

## Prerequisites

| Tool | Check |
|------|--------|
| **ffmpeg** | `ffmpeg -version` |
| **Python 3.10+** | For the YouTube Data API upload helper |
| **OAuth credentials** | YouTube Data API v3 enabled; Desktop OAuth client JSON on disk |

Credential files (`client_secret.json`, `token.json`) stay on your machine only. **Never commit them.**

Suggested credential directory (Linux/macOS): `~/.config/youtube-upload/`

---

## 1. Place or record the source video

Screen captures often land as **WebM** under `src/assets/`. Example:

`src/assets/test-video.webm`

Inspect with:

```bash
ffprobe -hide_banner src/assets/test-video.webm
```

---

## 2. Convert WebM to MP4

YouTube accepts several formats; **H.264 in MP4** is the most reliable for processing and embedding.

```bash
ffmpeg -i src/assets/test-video.webm \
  -c:v libx264 -crf 23 -pix_fmt yuv420p \
  src/assets/test-video.mp4
```

| Flag | Purpose |
|------|---------|
| `-c:v libx264` | H.264 video codec |
| `-crf 23` | Quality/size balance (lower = better quality, larger file) |
| `-pix_fmt yuv420p` | Widely compatible pixel format |

Verify output:

```bash
ffprobe -hide_banner src/assets/test-video.mp4
```

To upload WebM without converting, pass `--mimetype video/webm` to the upload helper. Prefer MP4 for portfolio demos.

---

## 3. Authenticate once (first upload)

Complete browser OAuth and save a refresh token:

```bash
python path/to/upload_video.py --auth-only
```

Use explicit paths if credentials are not at the default location:

```bash
python path/to/upload_video.py \
  --client-secrets "$HOME/.config/youtube-upload/client_secret.json" \
  --token "$HOME/.config/youtube-upload/token.json" \
  --auth-only
```

Re-run `--auth-only` if uploads later return HTTP 403 (revoked consent or wrong Google account).

---

## 4. Upload as unlisted

Default visibility is **unlisted**. Override with `--privacy public` or `--privacy private`.

```bash
python path/to/upload_video.py \
  src/assets/test-video.mp4 \
  --title "Portfolio test video" \
  --description "Demo recording for portfolio project card." \
  --tags "portfolio,demo"
```

Optional flags: `--category-id` (default **28** Science & technology), `--description-file PATH`.

On success, stdout includes **`videoId=…`** and **`https://www.youtube.com/watch?v=…`**.

---

## 5. List recent uploads

```bash
python path/to/upload_video.py --list
```

Optional: **`--max-results N`** (default 25), **`--query "title fragment"`** to filter.

Each result includes title, **`videoId`**, watch URL, privacy, and publish time. If **`--list`** still returns HTTP **403**, re-run **`--auth-only --force-auth`** to refresh consent for read access.

---

## 6. Wire the demo URL

Add the watch URL to the project entry in `src/data/projects.json` (demo link or embed field per your schema).

---

## Troubleshooting

| Symptom | Action |
|---------|--------|
| `ffmpeg` not found | Install ffmpeg (package manager or [ffmpeg.org](https://ffmpeg.org/download.html)) |
| **`403 accessNotConfigured`** | Enable **YouTube Data API v3** in Google Cloud Console; wait a few minutes |
| Browser **“Something went wrong”** | Add your Gmail under OAuth consent screen → **Test users** (Testing mode) |
| **`Missing client secrets file`** | Place Desktop OAuth JSON at `~/.config/youtube-upload/client_secret.json` or set **`YOUTUBE_CLIENT_SECRETS`** |
| Upload works but wrong channel | Re-run **`--auth-only`** with the Google account that owns the channel |
| **`403` on `--list`** (insufficient scopes) | Re-run **`--auth-only --force-auth`** to grant read access |

---

## Environment variables (optional)

| Variable | Meaning |
|----------|---------|
| `YOUTUBE_CLIENT_SECRETS` | Path to Desktop OAuth JSON |
| `YOUTUBE_TOKEN_JSON` | Path for saved OAuth token |
| `YOUTUBE_DESCRIPTION` | Default description when `--description` is omitted |
