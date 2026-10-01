#!/usr/bin/env python3
"""Render every page of a PDF into one PNG contact sheet for visual QA.
Usage: python3 contact_sheet.py <in.pdf> <out.png> [dpi]   (needs poppler's pdftoppm + Pillow)"""
import glob, os, subprocess, sys, tempfile
from PIL import Image

pdf, out = sys.argv[1], sys.argv[2]
dpi = sys.argv[3] if len(sys.argv) > 3 else "40"
with tempfile.TemporaryDirectory() as tmp:
    subprocess.run(["pdftoppm", "-png", "-r", dpi, pdf, os.path.join(tmp, "p")], check=True)
    files = sorted(glob.glob(os.path.join(tmp, "p-*.png")), key=lambda f: int(f.rsplit("-", 1)[1].split(".")[0]))
    pages = [Image.open(f) for f in files]
    w, h = pages[0].size
    cols = 5
    rows = (len(pages) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * w + (cols + 1) * 8, rows * h + (rows + 1) * 8), (120, 120, 120))
    for i, page in enumerate(pages):
        sheet.paste(page, (8 + (i % cols) * (w + 8), 8 + (i // cols) * (h + 8)))
    sheet.save(out)
print(f"{len(pages)} pages -> {out}")
