# Daniel Joseph Levy — Fan Archive

An independent, non-commercial fan site for **Daniel Joseph Levy** (b. 9 August 1983, Toronto) —
the actor, writer, director and producer known for *Schitt's Creek*, *Good Grief* and
*The Big Brunch*.

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
images/                 the four images the page actually uses
CREDITS.md              per-image attribution and licence
images/incoming/        working folder: Commons sources, archived material
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

Every image is a press frame from **Wikimedia Commons**, free-licensed and credited on the page:

| File | Frame | Photographer | Licence |
|---|---|---|---|
| `hero.jpg` | Solo portrait, TIFF 2025 | Patrick.suechan | CC BY-SA 4.0 |
| `about.jpg` | Solo portrait (alt crop), TIFF 2025 | Patrick.suechan | CC BY-SA 4.0 |
| `press-02.jpg` | With Sarah McLachlan, TIFF 2025 | Patrick.suechan | CC BY-SA 4.0 |
| `press-03.jpg` | Producers' row, TIFF 2025 | Patrick.suechan | CC BY-SA 4.0 |

Full attribution, source URLs and the list of modifications are in **`CREDITS.md`**. The crops are
adaptations, so they carry the same **CC BY-SA 4.0** licence — that credit line in the footer must
stay on the page. Original uploads are kept in `images/incoming/_commons/`.

There are only a handful of free-licensed photographs of him, which is why the page leans on
typography and a nine-card work grid rather than a large gallery.

**Do not add photographs of anyone else**, and do not reuse the old Adam Ramzi frames still sitting
in `images/incoming/_archive-adam-ramzi/` — they are a different person and a different
photographer's shoot.

---

## Contact block — what is real and what is not

Real, and linked on the page:

- Representation: **CAA** (he signed with them in March 2025 — Deadline).
- Speaking/appearance enquiries: **CAA Speakers**, `speakers@caa.com`, via
  `caa.com/caaspeakers/daniel-levy/`.
- Production banner: **Not A Real Production Company** (founded 2022).
- Social: `@instadanjlevy` (Instagram), `@danjlevy` (X, TikTok), IMDb `nm2391794`.

Not real yet — replace before publishing:

- `corrections@example.com` in the footer legal block is a placeholder.
- The fan-mail form and the newsletter form validate input but post nowhere. Point
  `CONFIG.formEndpoint` / `CONFIG.newsletterEndpoint` at a real handler in `assets/js/main.js`, or
  delete the forms. The page says so in the footer, so keep that line accurate if you wire them up.

There is no public fan-mail address and no agency that forwards letters; the page says that plainly
rather than inventing one.

---

## Facts and where they came from

- Born 9 Aug 1983, Toronto; son of Eugene Levy and Deborah Divine; sister Sarah Levy — Wikipedia /
  Canadian Encyclopedia.
- MTV Canada from 2006 (*MTV Live*, *The After Show*) — Canadian Encyclopedia.
- *Schitt's Creek* 2015–2020, co-created with Eugene Levy; final season took nine Primetime Emmys,
  four of them to Levy in one night (acting, writing, directing, producing) — CBC, Television Academy.
- *The Big Brunch* (Max, 2022) — created, hosted, judged.
- *Good Grief* — wrote, directed, produced, starred; limited release 29 Dec 2023, Netflix 5 Jan 2024.
- Member of the Order of Canada, June 2023 — Governor General's appointments list.
- CAA signing, March 2025 — Deadline. First-look TV deal with Netflix, 2026.

If a date or role changes, update the matching `work__card` in `index.html` and keep `work__meta`
to platform + form (series/feature).

---

## Known limits

- Four photographs, one photographer, one event (plus two crops of a single moment). The page is
  built to look intentional at that scale; adding more frames means reworking `#press`.
- Screenshots of the local preview render at roughly 1.35× and get cropped, so layout was verified
  by DOM measurement as well as by eye.
- No analytics, no cookies, no tracking. Nothing is stored client-side.
