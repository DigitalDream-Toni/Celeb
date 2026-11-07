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
| `index.html` → `#about` bio | The biography paragraphs and pull quote |
| `index.html` → facts strip | Based in, "on camera since" year, agency name |
| `index.html` → gallery captions | Titles, cities, years |
| `index.html` → management card | Marlowe & Co. name, emails, phone, hours |
| `index.html` → footer | Social links point at instagram.com / x.com / youtube.com |
| `images/` | All photography |

## Photos

`images/` contains a text file listing the exact filenames and dimensions the page
expects. Any missing file simply leaves the styled placeholder in place, so the site
never looks broken. Use only images you have permission to publish, and credit the
photographer in the gallery note and footer.

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
