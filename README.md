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
| **Showcase** | Featured projects — Order, Reporting Engine, Character Engine, Data Pipelines, L2Karma, Duskfall |
| **About** | Company info |

## Showcase Projects

| Project | Badge | Description | Link |
|---------|-------|-------------|------|
| **Order** | Platform | Next-gen Discord replacement — Rust/SolidJS/Tauri with voice/video, forums, wiki, kanban, calendar, Character Engine | [order.boord-its.com](https://order.boord-its.com) |
| **Reporting Engine** | SaaS | Self-hosted reporting platform with AI-powered financial analysis, BYO dashboards, multi-tenant DB connections | [reporting.boord-its.com](https://reporting.boord-its.com) |
| **Character Engine** | AI | Conversational AI for talking with characters, self-discovery, personal emulation, and digital imprints | Coming soon |
| **Data Pipelines** | Data | Production ETL integrating POS, loyalty, BI, and cloud APIs. Monitoring dashboard + AI reports | Internal |
| **L2Karma** | Web | Lineage 2 game server with wiki, parse, and community tools | [l2karma.org](https://l2karma.org) |
| **Duskfall** | Fiction | Grimdark siege fantasy novel | Coming soon |

## Theme System

Three switchable themes via a toggle in the nav bar. Selection persists in `localStorage` and respects `prefers-color-scheme` on first visit.

| Theme | Description |
|-------|-------------|
| **Obsidian Wasp** | Dark developer aesthetic with amber accents (`#e6a817`) — default |
| **Light** | Clean light mode with darkened amber (`#c48a0a`) for WCAG contrast |
| **Terminal** | Green-on-black hacker aesthetic (`#00ff41`), all-monospace, CRT scanline overlay |

Themes are implemented via CSS custom properties on `:root` with `[data-theme]` attribute overrides. The canvas node graph adapts its colors per theme.

## Design

- **Fonts**: JetBrains Mono (headings/code), Inter (body)
- **Effects**: Floating node-graph canvas, scroll-reveal animations, glow-on-hover cards
- **Typewriter**: 8 cycling phrases covering all projects and tools

## Tech

- Pure HTML / CSS / JS — no frameworks, no build tools, no npm
- Hosted on **Cloudflare Workers** (static assets)
- Custom domain via zone-based route in `wrangler.json`
- Media converted from raw sources (WAV→MP3 via ffmpeg at 192kbps, PNG→JPG at 800px wide)

## File Structure

```
boord-its/
├── index.html              # Main page
├── styles.css              # Theme system + all styles
├── script.js               # Canvas, themes, typewriter, player, lightbox
├── wrangler.json           # Cloudflare Worker config (zone-based route)
├── _headers                # Security headers
├── _redirects              # Redirect rules
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
└── public/                 # Deploy directory (git-ignored, copy of root files + assets)
```

## Deploy

```bash
# 1. Auth (one-time)
npx wrangler login

# 2. Copy source files to public/
cp index.html styles.css script.js _headers _redirects public/
cp -r assets public/

# 3. Deploy
npx wrangler deploy
```

Cloudflare account: `lenboord@gmail.com` (Account ID: `e25230689cb8fdc7b479bc25f6437500`)

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

## Related Projects

| Project | Repo | Relationship |
|---------|------|-------------|
| [Order](https://order.boord-its.com) | `NovemberFalls/Order` | Communication platform — featured in showcase |
| [Reporting Engine](https://reporting.boord-its.com) | `NovemberFalls/reporting-engine` | AI reporting platform — featured in showcase |
| [Character Engine](https://characters.boord-its.com) | `NovemberFalls/character-engine` | Conversational AI — featured in showcase |
| [Scheduler](https://scheduler.boord-its.com) | `NovemberFalls/scheduler-boord-its` | AI task scheduler — on same domain |

## License

Private. Bits, LLC.
