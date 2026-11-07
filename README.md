# Tarnished Portfolio

A dark-fantasy developer portfolio inspired by the Lands Between, built with Next.js 16, React 19, TypeScript and Tailwind CSS 4.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (fully static)
```

## Make it yours

**All content lives in [`src/data/portfolio.ts`](src/data/portfolio.ts).** Every section renders from that one typed object, so you shouldn't need to touch the components. The types in [`src/types/portfolio.ts`](src/types/portfolio.ts) document each field.

| Section on the page | Field in `portfolio.ts` | What it holds |
| --- | --- | --- |
| Opening cinematic | `intro` | narration lines, prompt, on/off |
| Hero | `profile`, `hero` | name, title, tagline, location, availability |
| Status (About) | `profile.bio`, `status` | biography, status rows, 1–99 attributes |
| Sites of Grace (Experience) | `experience` | roles, companies, highlights, tech |
| Armaments (Projects) | `projects` | inventory items with icon, rarity, links |
| Sorceries & Incantations (Skills) | `skills` | skill groups |
| Great Enemies Felled (Achievements) | `feats` | awards, talks, certifications |
| Origins (Education) | `education` | schools and details |
| Summoning Pool (Contact) | `profile.email`, `profile.socials`, `contact` | email, links, message composer |

- **Empty arrays hide sections.** `feats: []` removes the section and its nav link.
- **Images and your résumé** go in `/public`, then reference them as `portrait: "/portrait.jpg"`, `resume: "/resume.pdf"`, or a project's `image: "/projects/app.png"`.
- **Section names** (thematic titles, plain captions, nav labels) are under `sections`. Switch the nav to plain words there if you prefer.
- **Project icons**: `sword`, `staff`, `shield`, `tome`, `talisman`, `flask`, `lantern`, `crown`. Rarity (`common`, `rare`, `legendary`) tints the slot.

## The opening cinematic

Narration fades in line by line over drifting embers, the sigil draws itself, your name rises, and the page waits for any button. Any key or click skips ahead; there's also a Skip button.

- Plays **once per browser tab** by default (`intro.oncePerSession`), or turn it off with `intro.enabled: false`.
- **`?intro=1`** forces it to play, with full animation. Use it to preview your narration.
- **`?intro=0`** skips it. Handy for links you send to recruiters.
- **Reduced motion:** by default everyone sees the animations, even with Reduce Motion turned on in their OS. Set `effects.respectReducedMotion: true` to give those visitors a still page instead (no intro, embers or animations). With it on, `?motion=1` previews the animations anyway, and `?intro=1` also forces the intro.

## Other animations

- **Hero:** the tree grows out from its roots, then pulses of light rise through its branches and the leaves twinkle. Your name rises letter by letter and a gleam passes over it every few seconds. The tree comes from `src/components/art/ErdTree.tsx`; the timings are the `--delay` values in `src/components/sections/Hero.tsx`.
- **Panels:** gold corners draw in and a glint runs along the edges as each panel scrolls into view; on hover the border glows and the corners stretch.
- **Buttons and slots:** light sweeps across buttons on hover (and across the primary one now and then). Inventory slots light up under the cursor, and the selected one pulses.

`effects.embers` toggles the floating embers, and `effects.graceBanner` sets (or, with `false`, disables) the banner shown when the Experience section first scrolls into view.

## Where things are

```
src/
  data/portfolio.ts          ← your content
  types/portfolio.ts         ← the content model
  app/                       layout (fonts, metadata), page, YOU DIED 404, icon
  components/
    intro/                   OpeningCinematic
    sections/                Hero, Status, Journey, Armaments + Inventory, Spells, Feats, Origins, Summon
    effects/                 Embers (canvas), Reveal (scroll fade), GraceBanner
    art/                     ErdTree + Ridges (generated SVG artwork)
    layout/, ui/             Nav, Footer, Section, Sigil, ItemIcon, Ornament
  lib/                       intro + motion logic, seeded generators for the artwork
```

Colours and fonts are theme tokens at the top of [`src/app/globals.css`](src/app/globals.css) (Cinzel for display, EB Garamond for body). The tree and mountains are generated from fixed seeds in `src/lib/tree.ts` and `src/components/art/Ridges.tsx`. Change a seed to grow a different one.

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new), or run `npm run build && npm start` on any Node host. Set `site.url` in `portfolio.ts` to your domain for correct social-card metadata.

---

A fan-made tribute. All artwork here is original; not affiliated with FromSoftware or Bandai Namco.
