# Obsidian Wasp Landing Page - Reusable Build Prompt

> Copy everything below the line and paste it into Claude (or any LLM) to generate a new landing page inspired by the boord-its.com design system. Fill in the `[PLACEHOLDERS]` with your own content.

---

## The Prompt

```
Build me a single-page landing page website with the following specifications.

## Design System: "Obsidian Wasp"

Dark, techy, developer-aesthetic landing page. Think Obsidian app meets Wasp framework.

### Color Palette
- Background primary: #0a0a0f (near-black with blue undertone)
- Background secondary: #111118 (slightly lighter for cards/inputs)
- Card background: #16161e (dark panels)
- Card hover: #1c1c28
- Text primary: #e8e8ed (off-white)
- Text secondary: #8888a0 (muted lavender-gray)
- Text muted: #555568 (subtle labels)
- Accent color: #e6a817 (amber/gold — the "wasp" color)
- Accent glow: #e6a81766 (amber with transparency, for glows/shadows)
- Accent dim: #e6a81733 (amber ultra-transparent, for subtle highlights)
- Border: #2a2a3a (dark border)
- Border hover: #3a3a50 (slightly visible on interaction)

### Typography
- Monospace font: 'JetBrains Mono' from Google Fonts (fallback: 'Fira Code', monospace)
- Sans-serif font: 'Inter' from Google Fonts (fallback: system sans-serif)
- Headings and nav use the monospace font
- Body text uses the sans-serif font
- Section titles use format: `# Section Name` (with the # symbol colored in the accent)

### Visual Effects
1. **Animated Node Graph Background** (canvas element, fixed behind all content):
   - ~80 floating dots with amber color (rgba of accent at 0.4 opacity)
   - Dots drift slowly and bounce off viewport edges
   - Lines connect dots within 180px of each other (very subtle, 0.08 opacity)
   - Mouse proximity effect: dots and lines within 250px of cursor glow brighter
   - Dots pulse subtly using sine wave animation
   - Canvas is pointer-events: none so it doesn't block interaction

2. **Typewriter Terminal Prompt** in the hero:
   - Monospace styled inline box with dark background and border
   - Green caret `>` followed by cycling text that types out then deletes
   - Blinking cursor `|` at end
   - Phrases cycle through things relevant to your project/tools
   - Type speed: ~55-95ms per character, delete speed: ~30ms, pause: 2200ms

3. **Scroll-Reveal Animations**:
   - Cards and grid items start opacity: 0, translateY(20px)
   - IntersectionObserver adds `.visible` class at threshold 0.1
   - Smooth transition: opacity 0.5s ease, transform 0.5s ease

4. **Card Hover Effects**:
   - translateY(-2px) lift on hover
   - Border color shifts from dark to slightly visible
   - 2px accent-colored top bar fades in (using ::before pseudo-element)

### Layout & Sections

The page is a single HTML file with external CSS and JS files. No build tools, no frameworks, no npm. Pure HTML/CSS/JS. Hosted on Cloudflare Workers (static assets).

**Navigation** (fixed top, glassmorphism):
- Left: Logo in monospace using `{bracket}` syntax, e.g. `{name}`
- Right: Section links + one external link styled in accent color with arrow
- Background: rgba of primary bg at 0.85 with backdrop-filter: blur(20px)
- Border-bottom: 1px solid border color

**Hero Section** (full viewport height, centered):
- Small tag line above title in monospace accent color, e.g. `// creative lab`
- Large title in monospace with one word glowing in accent (text-shadow glow effect)
- Subtitle in secondary text color
- Typewriter terminal prompt below

**Content Cards Section** (CSS Grid, auto-fit, minmax 240px):
- Each card: dark background, border, rounded corners (12px), 2rem padding
- SVG icon (40x40, stroke-only, accent colored)
- Title in monospace
- Role/subtitle in small uppercase monospace accent
- Description in secondary text

**[OPTIONAL] Music Player Section**:
- Genre filter buttons (pill-shaped, monospace, active state uses accent)
- Now Playing bar: track info, play/pause/prev/next controls, progress bar with seek
- Track list: numbered rows with name, genre tag, play icon
- Uses HTML5 Audio API, no libraries
- Auto-advances to next track
- Tracks stored in assets/music/[genre]/filename.mp3

**[OPTIONAL] Image Gallery Section**:
- CSS Grid, auto-fill, minmax 220px, square aspect-ratio items
- Images use object-fit: cover
- Hover: slight scale, accent border glow, title overlay fades in from bottom gradient
- Lightbox on click: fixed overlay at z-index 1000, 95% black bg
- Lightbox has close (X), prev/next arrows, keyboard nav (Escape, Arrow keys)
- Images stored in assets/images/[category]/filename.jpg

**Showcase Section** (CSS Grid, similar to cards):
- Items with badge labels (small monospace uppercase tags)
- "Featured" item has accent border that glows on hover
- Links can be live (accent colored) or "coming soon" (muted)

**About Section**:
- Top border separator
- Max-width 650px for readability
- Strong tags get primary text color
- Ends with a monospace accent tagline

**Footer**:
- Flex row: logo on left, copyright on right
- Top border separator
- Monospace font throughout

### Responsive Design
- 768px breakpoint: reduce nav padding/gap, stack now-playing vertically, smaller gallery grid
- 480px breakpoint: single column for card/showcase grids

### File Structure
```
project/
  index.html          ← Main page
  styles.css          ← All styles
  script.js           ← Canvas animation, typewriter, scroll-reveal, music player, lightbox
  _headers            ← Security headers (X-Frame-Options, etc.)
  _redirects          ← Cloudflare redirects (empty template)
  wrangler.json       ← Cloudflare Worker config
  .gitignore          ← Standard ignores + raw media folders + public/
  public/             ← Deploy directory (copy of deployable files only)
  assets/
    music/[genre]/    ← MP3 files (convert from WAV using ffmpeg at 192kbps)
    images/[category]/← JPG files (convert from PNG using ffmpeg, 800px wide, quality 2)
```

### Deployment (Cloudflare Workers)
- wrangler.json points assets.directory at "./public"
- Before deploy: copy index.html, styles.css, script.js, _headers, _redirects, and assets/ into public/
- Deploy command: `npx wrangler deploy`
- Custom domain: add routes array with pattern and custom_domain: true

## My Specific Content

**Site name**: [YOUR_NAME]
**Logo format**: {[YOUR_LOGO_TEXT]}
**Tagline**: [YOUR_TAGLINE]
**Subtitle**: [YOUR_SUBTITLE]

**Nav links**: [LIST YOUR SECTIONS + ANY EXTERNAL LINKS]

**Typewriter phrases** (code-like function calls):
- [tool1.action("description")]
- [tool2.action("description")]
- [tool3.action("description")]

**Stack/Tool Cards** (list 3-6):
- [TOOL_NAME] | [ROLE] | [SVG_DESCRIPTION] | [ONE_LINE_DESCRIPTION]
- [TOOL_NAME] | [ROLE] | [SVG_DESCRIPTION] | [ONE_LINE_DESCRIPTION]
- [TOOL_NAME] | [ROLE] | [SVG_DESCRIPTION] | [ONE_LINE_DESCRIPTION]

**Showcase Items**:
- [PROJECT_NAME] | [BADGE] | [DESCRIPTION] | [LINK_OR_COMING_SOON]

**About**: [2-3 SENTENCES ABOUT YOU/YOUR_COMPANY]

**Include music player?** [YES/NO — if yes, list track names, genres, and file paths]
**Include image gallery?** [YES/NO — if yes, list image descriptions and file paths]
**Accent color override?** [HEX_CODE or keep #e6a817 amber]
**Custom domain?** [YOUR_DOMAIN.COM or workers.dev only]
```

---

## Quick Start Example (filled in)

```
Site name: Forge Studios
Logo format: {forge}
Tagline: // digital workshop
Subtitle: Games. Tools. Experiments. One dev. Zero limits.

Stack Cards:
- Unity | Engine | gamepad icon | Real-time 3D game development and prototyping
- Blender | 3D Art | cube icon | Modeling, texturing, and animation pipeline
- Claude | Code | layers icon | Architecture, scripting, and problem-solving partner
- Figma | Design | pen-tool icon | UI/UX design and rapid prototyping

Typewriter phrases:
- unity.build("dungeon_crawler_v3")
- blender.render("character_model")
- claude.architect("multiplayer_backend")
- forge.ship("beta_release")

Showcase:
- Dungeon Depths | Game | A procedurally generated dungeon crawler | https://dungeondeaths.io
- Asset Pipeline | Tools | Automated 3D asset processing | Coming soon

About: Forge Studios is a one-person game dev workshop. We prototype fast, iterate faster, and ship things that are fun to play.

Include music player? NO
Include image gallery? YES — concept art renders
Accent color: #e6a817 (keep amber)
```
