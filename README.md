# Adam Ramzi — Fan Archive

A single-page fan site: age gate, editorial hero, about, lightbox gallery, and two
contact routes (fan mail direct to Adam, bookings/press to his management).

Built with plain HTML, CSS and JavaScript — no build step, no dependencies.

```
index.html
assets/css/styles.css
assets/js/main.js
images/                    ← drop licensed photography here
```

## Running it

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000   # then visit http://localhost:8000
```

## What to replace before this goes live

Everything below is **sample content** so the layout reads as finished. Replace it
with confirmed facts — publishing invented credits or contact details about a real
person is both misleading and a legal risk.

| Where | What's placeholder |
| --- | --- |
| `index.html` → `#about` bio | The biography paragraphs and pull quote (see *Confirmed facts* below) |
| `index.html` → facts strip | Based in, "on camera since" year, agency name |
| `index.html` → gallery captions | Titles, cities, years |
| `index.html` → management card | Marlowe & Co. name, emails, phone, hours |
| `index.html` → footer | Social links point at instagram.com / x.com / youtube.com |
| `images/` | All photography |

## Confirmed facts (verified Nov 2026)

Sourced from Wikipedia, TMDB and the 2018 Instinct interview — usable as-is, unlike
the rest of the placeholder copy:

- Born 17 November 1981, Los Angeles; grew up in east Los Angeles County.
- Armenian-American; born Aram (Levon) Kirakosian; performs as Adam Ramzi.
- Adult career began in 2013, after Raging Stallion president Chris Ward contacted
  him while he was in graduate school for psychology. He has also practised as a
  licensed psychologist.
- Played bass on Io Echo's 2013 debut *Ministry of Love*.
- Played Vardan in the web series *EastSiders* (2012–17).
- Live show with Kurtis Wolfe at San Francisco's Nob Hill Theatre, 2018; featured in
  the 2023 documentary *Stories Untold: Meet Queer SWANA Sex Workers and Drag
  Performers*.
- Won the 2019 GayVN Fan Award for Favorite Daddy.

**Still fictional in this build:** the agency name "Marlowe & Co.", all email
addresses, the phone number and the office hours. No public booking agency for him
is documented, so that card must be replaced with real representation or removed
before the site is published.

## Photos

`images/` contains a text file listing the exact filenames and dimensions the page
expects. Any missing file simply leaves the styled placeholder in place, so the site
never looks broken. Use only images you have permission to publish, and credit the
photographer in the gallery note and footer.

**Current set: 10 of 11 slots filled.** Ten frames of Adam Ramzi, credited to
Ryan Edward Scott (the credit line is burned into one frame), sourced from his
Instagram at 770 px. `gallery-09` is still an empty frame. Because these are
tight chest-up portraits, the hero uses a framed panel beside the headline
rather than a full-bleed backdrop — type over a close-up face read badly.

**Unsorted photos go in `images/incoming/`.** Drop them with any names, in any
order, jpg/png/webp, and they stay off the page until they are cropped into the
11 slots (1 hero, 1 about portrait, 9 gallery). 11 files fills every slot; 15–20
gives enough choice to match shots to the tall/square/wide tiles. See
`images/incoming/README.txt` for the slot shapes.

### Where real photos can come from

There is no free-licensed portrait of Adam Ramzi (no Wikipedia image, nothing on
Wikimedia Commons). Every existing photograph is owned by a studio, a photographer
or a press outlet, so copying one off the web into this site is a copyright problem
and, for studio content, also a licensing one. Legitimate routes, roughly in order
of how easy they are:

1. **Ask him.** His own accounts are the source of the images on this page's ideal
   build: Instagram `@princejasmine_` (backup `@adamramzipants`), X `@adamramzixxx`.
   A short DM asking to use specific posts, with credit, is how most fan archives
   actually get their images. Keep the reply.
2. **Embed instead of copy.** Instagram's own embed (Share → Embed, which loads
   their script) shows a public post without you hosting the file. Nothing is
   copied, so nothing is infringed — but it needs a public post and it will not
   work for restricted accounts.
3. **Studio press material.** Falcon / Raging Stallion distribute official promo
   stills to affiliates through Buddy Profits (`affiliates@buddyprofits.com`);
   affiliates get written usage rights for the images. Adult affiliate programs
   are the normal route for performer sites.
4. **Press / editorial.** Interviews that ran portraits (Instinct, AVN, Bay Area
   Reporter) — email the editor and ask for the shoot, credited. Most say yes for
   fan coverage; few say yes to a copy of the file with no credit.
5. **License a stock frame.** The 2016 Hedwig red-carpet photo is on Alamy as a
   rights-managed image — buy the individual licence if you want one editorial shot.

Whatever you land, keep a `CREDITS.md` note with the source URL, photographer, date
and the permission you were given. That file is your defence if anyone complains.

## Wiring up the forms

There is no backend. Forms validate in the browser and then show a success state.
To deliver real messages, set an endpoint at the top of `assets/js/main.js`:

```js
var CONFIG = {
  formEndpoint: "https://formspree.io/f/your-id",   // fan mail + bookings
  newsletterEndpoint: ""                            // optional newsletter handler
};
```

Submissions are POSTed as JSON to that URL. If you point both contact forms at the
same endpoint, add a hidden field (or use the `type` value) to route fan mail and
booking enquiries to different inboxes. For a fully static host, Netlify Forms is
an alternative — add `data-netlify="true"` and a `name` to each `<form>` and remove
the `preventDefault()` path in `main.js`.

## Notes on compliance

- **18+ gate** is shown once per browser session (`sessionStorage`), not per page.
  It is a courtesy gate, not age verification — if you need real verification,
  that requires a vendor.
- **No explicit imagery** is included; the gallery is portrait/editorial only.
- The footer states plainly that this is an **unofficial fan site**, not affiliated
  with Adam Ramzi, his management, or any studio, and includes a removal contact.
  Keep that block — it is what separates a fan site from an impersonation.
- If you publish U.S. content depicting sexually explicit conduct, 18 U.S.C. § 2257
  record-keeping requirements apply to the producer, not to a fan site linking out —
  but confirm with a lawyer before hosting anything beyond editorial portraits.

## Accessibility & performance

Semantic landmarks, keyboard-operable gallery (Enter/Space to open, arrows to move,
Esc to close, focus trapped in the viewer), visible focus rings, `aria-live` form
status, lazy-loaded gallery images, and full `prefers-reduced-motion` support.
