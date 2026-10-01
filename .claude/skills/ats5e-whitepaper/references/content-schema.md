# Whitepaper content schema

```jsonc
{
  "slug": "sovereign-by-design",              // file name + site slug
  "eyebrow": "Whitepaper",                    // small label on the cover
  "title": "Sovereign by Design",
  "subtitle": "Building residency-aware data platforms for GCC banks",
  "date": "October 2026",                     // human-readable edition date
  "author": "ATS5E Research",
  "coverImage": "high-resolution-light-trails.webp", // file in public/imagery/
  "executiveSummary": ["paragraph", "paragraph"],
  "keyFindings": [ { "value": "4 hours", "label": "to report a significant incident under CBUAE C 1/2026", "source": 1 } ],
  "chapters": [
    {
      "title": "Chapter title",
      "intro": "One-sentence standfirst shown large under the title.",
      "blocks": [ /* see block types */ ]
    }
  ],
  "recommendations": {
    "title": "The 90-day agenda",
    "items": [ { "horizon": "Next 90 days", "title": "Map critical data flows", "text": "…" } ]
  },
  "methodology": "Optional paragraph on how the research was done.",
  "sources": [ { "label": "CBUAE, Operational Risk Management Regulation (C 1/2026), 2026", "url": "https://…" } ]
}
```

Cite sources inline with `[n]` (1-based index into `sources`). It renders as a superscript.
`**bold**` is supported in any text.

## Block types (inside `chapters[].blocks`)

| type | fields | renders as |
|------|--------|-----------|
| `p` | `text` | body paragraph |
| `h` | `text` | sub-heading |
| `stat` | `value`, `label`, `source` (index) | big blue figure with caption |
| `stats` | `items: [{value,label,source}]` (2–3) | row of figures |
| `quote` | `text`, `attribution?` | pull quote (use for ATS5E point of view, never invented third-party quotes) |
| `list` | `title?`, `items: [string]` | bulleted list |
| `callout` | `title`, `text` or `items` | shaded "What leaders should do" box |
| `table` | `columns: [string]`, `rows: [[string]]`, `caption?` | data table |
| `pagebreak` | – | force a new page |
