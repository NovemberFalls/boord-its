# {bits} — boord-its.com

Landing page for **Bits, LLC** — a one-person AI-powered creative lab.

**Live**: [boord-its.com](https://boord-its.com) | [boord-its.lenboord.workers.dev](https://boord-its.lenboord.workers.dev)

## What's Here

| Section | Description |
|---------|-------------|
| **Hero** | Animated node-graph canvas background, typewriter terminal prompt |
| **Stack** | Tool cards — Suno, Midjourney, Claude, GPT |
| **Music** | Custom audio player with 9 AI-generated tracks, genre filters, transport controls |
| **Gallery** | 16 Midjourney character images with lightbox viewer |
| **Showcase** | Featured projects — L2Karma.org, Data Pipelines (coming soon) |
| **About** | Company info |

## Design System

**"Obsidian Wasp"** — dark developer aesthetic with amber accents.

- **Background**: `#0a0a0f` (near-black)
- **Accent**: `#e6a817` (amber/gold)
- **Fonts**: JetBrains Mono (headings/code), Inter (body)
- **Effects**: Floating node-graph canvas, scroll-reveal animations, glow-on-hover cards

## Tech

- Pure HTML / CSS / JS — no frameworks, no build tools, no npm
- Hosted on **Cloudflare Workers** (static assets)
- Custom domain via wrangler.json routes config
- Media converted from raw sources (WAV→MP3 via ffmpeg at 192kbps, PNG→JPG at 800px wide)

## File Structure

```
boord-its/
├── index.html              # Main page
├── styles.css              # Obsidian Wasp theme
├── script.js               # Canvas animation, typewriter, player, lightbox
├── wrangler.json           # Cloudflare Worker config
├── _headers                # Security headers
├── _redirects              # Redirect rules (empty)
├── .gitignore
├── PROMPT.md               # Reusable prompt to rebuild this design from scratch
├── assets/
│   ├── music/
│   │   ├── edm/            # 4 tracks
│   │   ├── for-my-wife/    # 3 tracks
│   │   ├── melodic-indie/  # 1 track
│   │   └── rock/           # 1 track
│   └── images/
│       └── characters/     # 16 Midjourney character images
├── Music/                  # Raw WAV files (git-ignored)
├── Images/                 # Raw PNG files (git-ignored)
└── public/                 # Deploy directory (git-ignored, built before deploy)
```

## Deploy

```bash
# 1. Auth (one-time)
npx wrangler login

# 2. Build the public directory
cp index.html styles.css script.js _headers _redirects public/
cp -r assets public/

# 3. Deploy
npx wrangler deploy
```

## Adding Media

**Music** (WAV → MP3):
```bash
ffmpeg -i "input.wav" -codec:a libmp3lame -b:a 192k "assets/music/genre/output.mp3"
```

**Images** (PNG → JPG, 800px wide):
```bash
ffmpeg -i "input.png" -vf "scale=800:-1" -q:v 2 "assets/images/category/output.jpg"
```

After adding new media, update `index.html` with the new track/image entries, rebuild `public/`, and redeploy.

## Reuse This Design

See **[PROMPT.md](PROMPT.md)** for a complete, copy-paste prompt that will generate a new site with this exact design system. Fill in placeholders with your own content.

## License

Private. Bits, LLC.
