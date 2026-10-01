---
name: ats5e-whitepaper
description: Create ATS5E-branded whitepapers and research reports as designed, print-ready PDFs (A4) for the ats5e.com Insights section. Use whenever the user asks for an ATS5E whitepaper, report, research paper, point-of-view paper, downloadable insight, gated content or "PDF version" of an insight — even if they only say "write a whitepaper on X". Produces a JSON content file, renders it through the house HTML template, and prints it with headless Chrome. Not for Aspiro or QBricks decks (those have their own skills).
---

# ATS5E Whitepaper

Turns structured content into an industry-grade ATS5E whitepaper PDF: dark cover, contents,
executive summary, numbered chapters with stat callouts and pull quotes, recommendations,
methodology/sources and an ATS5E back page.

## Workflow

1. **Research first.** Every number must come from a source you actually read (regulator,
   central bank, company release, BIS/IMF/FATF, top-tier analyst). Record source name, date and
   URL. Never estimate, round up or invent a statistic, survey, client quote or case result.
   If a fact is unconfirmed, leave it out.
2. **Write the content JSON** following `references/content-schema.md`. Put it in
   `content/whitepapers/<slug>.json` in the ats5e-atlas repo.
3. **Build the PDF:**
   ```bash
   node .claude/skills/ats5e-whitepaper/scripts/build.mjs content/whitepapers/<slug>.json public/whitepapers/<slug>.pdf
   ```
   It also writes the intermediate HTML to the OS temp dir (or `--html <path>`) for debugging.
4. **Check it visually.** Make a contact sheet and look at every page (no orphaned headings,
   no near-empty pages, no overflowing tables, cover text legible); zoom into any page with
   `pdftoppm -png -r 80 -f N -l N`:
   ```bash
   python3 .claude/skills/ats5e-whitepaper/scripts/contact_sheet.py public/whitepapers/<slug>.pdf /tmp/<slug>-sheet.png
   ```
5. **Publish on the site:** add/update the matching entry in `lib/insights-library.json`
   with `"tag": "Whitepaper"` and `"downloadFileUrl": "/whitepapers/<slug>.pdf"`.

## Editorial standard (what "industry-leading" means here)

- **A point of view, not a summary.** Open with the tension: what changed, why it matters in
  the next 12–24 months, and what most institutions are getting wrong.
- **GCC-specific.** Name the regulators (CBUAE, SAMA, DFSA, FSRA, VARA, SDAIA), rails (Aani,
  sarie, Buna) and rules. Generic global content is not acceptable.
- **Evidence then implication.** Every stat is followed by "so what" for a bank executive.
- **Actionable.** End every chapter with concrete moves; end the paper with a prioritised
  90-day / 12-month agenda.
- **British English**, confident, plain. No hype words ("revolutionary", "game-changing"), no
  vendor puffery. Partners (Microsoft Fabric, UiPath, Quantexa, SmartStream, QBricks) may be
  named as examples of capability, never as ads.
- **Byline** is "ATS5E Research" unless the user names an approved author.
- **Length:** 2,500–4,500 words → 10–16 pages.
- Tie recommendations to the ATS5E 5E framework where it fits naturally: Experience,
  Empowerment, Efficiency, Execution, Evolution.

## Brand

- Colours: black `#050505`, ATS blue `#148be6`, light blue `#9fdbff`, ink `#0f1115`,
  greys `#5b6270` / `#e7e9ee`.
- Type: September (display: headings, numerals, labels) from `public/fonts`; Helvetica Neue for
  long-form body text.
- Imagery: dark abstract/light-trail images from `public/imagery/` for the cover.
- Logo: `public/logo.png` (white — dark backgrounds only). Light pages use the typeset
  "ATS5E" wordmark the template draws.

## Files

- `scripts/build.mjs` — JSON → HTML → PDF (needs Google Chrome installed; set `CHROME_PATH`
  to override).
- `scripts/contact_sheet.py` — all pages on one PNG for QA (poppler + Pillow).
- `assets/whitepaper.css` — the template styles (A4, paged media, running footers).
- `references/content-schema.md` — every field and block type, with an example.
