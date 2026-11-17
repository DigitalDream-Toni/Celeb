# Jonathan Roumie — Fan Archive

An independent, non-commercial fan site for **Jonathan Roumie** (b. 1 July 1974, New York City) —
the actor who has played Jesus of Nazareth in *The Chosen* since the 2017 pilot, and Lonnie Frisbee
in *Jesus Revolution*.

Plain **HTML + CSS + JavaScript**. No framework, no build step, no dependencies.

---

## Run it

```bash
python -m http.server 8010 --bind 127.0.0.1
# then open http://127.0.0.1:8010/index.html
```

Any static server works. Opening `index.html` from the filesystem also renders, but fonts and the
relative asset paths behave better over HTTP.

---

## Structure

```
index.html              the whole page
assets/css/styles.css   design system + all layout
assets/js/main.js       nav, scroll reveals, lightbox, form validation
images/                 the four photographs the page uses (all of Roumie)
CREDITS.md              per-image attribution and licence
images/pic/             the nine uploaded source images the four site photos were cropped from
```

### Sections (and their anchor ids)

| # | Section | id |
|---|---|---|
| — | Hero | `#top` |
| 01 | About + timeline | `#about` |
| 02 | Selected work — nine credit cards | `#work` |
| 03 | Press frames — two photographs | `#press` |
| 04 | Contact — fan mail and representation | `#contact` / `#bookings` |
| — | Newsletter block | — |

### Design notes

- Dark editorial palette: ink `#08080a`, paper `#f5f2ec`, gold `#c7a76a`; Playfair Display for
  display type, Inter for text; film-grain overlay; scroll reveals.
- The hero is a **framed portrait panel beside the masthead**, not a full-bleed backdrop — the
  headline sits on ink, the photograph keeps its own light.
- The two press frames sit on a `2fr / 3fr` grid, so a square and a 3:2 share exactly the same
  height without either being cropped.

---

## Photography

All four photographs are of **Jonathan Roumie**, taken from Wikimedia Commons under free licences and
credited on the page and in `CREDITS.md`:

| File | Frame | Rights holder | Licence | Output |
|---|---|---|---|---|
| `hero.jpg` | Jesus with fishing nets on the Sea of Galilee | The Chosen press photos | CC BY-SA 4.0 | 1000 × 1250 |
| `about.jpg` | Tuxedo, Hollywood Prayer Network gala | LeRoyMobley | CC BY-SA 4.0 | 720 × 900 |
| `press-02.jpg` | Jesus at the banquet table | The Chosen press photos | CC BY-SA 4.0 | 900 × 900 |
| `press-03.jpg` | Jesus and the leper | The Chosen press photos | CC BY-SA 4.0 | 1200 × 800 |

Sources were 1280–1920 px on the long edge and are only ever scaled **down**, so the images stay
sharp at their display size, including on high-DPI screens. The crops are adaptations, so they carry
the same CC BY-SA 4.0 licence as the originals — the footer credit paragraph and `CREDITS.md` must
stay on the page.

The nine thumbnails in `images/pic/` are no longer used. They were 180–473 px and looked soft when
scaled up; no higher-resolution free-licensed version of those particular pictures exists, because
they are rights-reserved promo, broadcast and magazine frames. Originals of the four in use are in
`images/hd/`.

If you swap a photograph, update the `alt` text, the About caption, the press-frame credit line and
the footer paragraph together, and bump the `?v=` number on the `<img>` tags so browsers drop the
cached copy.

---|---|---|---|
| `hero.jpg` | `OIP.webp` | Roumie in the robe of *The Chosen*, black background | 800 × 1000 |
| `about.jpg` | `download (1).webp` | Smiling portrait, grey jacket | 640 × 800 |
| `press-02.jpg` | `OIF.webp` | Seated television interview | 800 × 800 |
| `press-03.jpg` | `download.webp` | Leather jacket, bronze monument behind | 1000 × 667 |

**Provenance is not established.** These are third-party web images of unknown origin, so the page
claims no licence, credits no photographer and asserts no ownership — the footer says so plainly.
Before the site goes public, either clear permission for these four or replace them with
free-licensed photographs (Wikimedia Commons has several of Roumie under CC BY-SA) and credit them
properly. Details and the unused uploads are in `CREDITS.md`.

They are also thumbnails — 180–473 px on the long edge — upscaled with sharpening to their display
size, so they read soft next to the type. Anything of 1200 px or more would be a straight improvement.

If you swap a photograph, update the `alt` text, the About caption, the press-frame credit line and
the footer paragraph together, and bump the `?v=` number on the `<img>` tags so browsers drop the
cached copy.

---

## Contact block — what is real and what is not

Real, and linked on the page:

- Film & TV: **UTA**.
- Press and personal appearances: **Carmel Communications**. Voice-over: **Atlas Talent Agency**.
  Commercials: **Commercial Talent Agency**. All published on
  `jonathanroumie.com/contact`.
- Social: `@jonathanroumieofficial` (Instagram, Threads), `JonathanRoumieOfficial` (Facebook),
  `@JonathanRoumie` (X), `@jonathanroumie` (TikTok), `@jonathanroumie_official` (YouTube). IMDb
  `nm0745751`.
- There is **no official Telegram** — he says so himself, in his bio and in posts. The fan-mail card
  says that plainly instead of linking a fake handle.
- There is **no public fan-mail address and no fan club**; he has warned that paid "fan clubs" are
  scams.

Not real yet — replace before publishing:

- `corrections@example.com` in the footer legal block is a placeholder.
- The fan-mail form and the newsletter form validate input but post nowhere. Point
  `CONFIG.formEndpoint` / `CONFIG.newsletterEndpoint` at a real handler in `assets/js/main.js`, or
  delete the forms. The page says so in the footer, so keep that line accurate if you wire them up.

---

## Facts and where they came from

- Born 1 July 1974, New York City; Irish mother, Egyptian father of Syrian/Lebanese descent;
  baptised Greek Orthodox, confirmed Catholic after the family moved to Long Island — his own
  interviews (National Catholic Register, Catholic News Agency).
- BFA in filmmaking, School of Visual Arts; production assistant and location scout before acting.
- First acting job: voices on MTV's *Celebrity Deathmatch*, 2000–2002 — his own account, IMDb credits.
- Jesus in Dallas Jenkins's short *The Two Thieves* (2014); *The Chosen* pilot *The Shepherd*,
  24 December 2017; Season 1 April 2019; Season 6 on Prime Video, 15 November 2026; Season 7 filmed,
  opening as a feature 31 March 2028 — press.thechosen.tv and the season announcements.
- *Jesus Revolution* (2023) as Lonnie Frisbee; *Jonathan & Jesus* (2024) host/EP; *The Chosen
  Adventures* and *In the Wild* (2025); *Night at the Museum: Kahmunrah Rises Again* (2022);
  *Chicago Med* (2020); *Heart of a Servant* (2024) — his résumé and IMDb.
- Movieguide Grace Prize, 2020, for *The Chosen* "I Am He"; honorary Doctorate of Fine Arts,
  Catholic University of America, 2024 (and its 2024 commencement speaker).

If a date or role changes, update the matching `work__card` in `index.html` and keep `work__meta`
to platform + form (series/feature/documentary).

---

## Known limits

- The photography step is unfinished, by request: the images are placeholders and the page says so
  in three places.
- Screenshots of the local preview render at roughly 1.35× and get cropped, so layout was verified
  by DOM measurement as well as by eye.
- No analytics, no cookies, no tracking. Nothing is stored client-side.
