import PyPDF2
import os

pdf_files = [
    "/Users/jackhenrydonaldson/ats5e-atlas/public/VaultsPay/ATS5E & VaultsPay - EduFlow360.pdf",
    "/Users/jackhenrydonaldson/ats5e-atlas/public/VaultsPay/VaultsPay EduFlow360 - One Pager.pdf"
]

out_path = "/Users/jackhenrydonaldson/ats5e-atlas/scratch/pdf_text.txt"

with open(out_path, "w") as out_file:
    for pdf_path in pdf_files:
        out_file.write(f"\n\n--- CONTENT FROM: {os.path.basename(pdf_path)} ---\n\n")
        try:
            with open(pdf_path, "rb") as f:
                reader = PyPDF2.PdfReader(f)
                for i in range(len(reader.pages)):
                    page = reader.pages[i]
                    text = page.extract_text()
                    out_file.write(f"\n--- PAGE {i+1} ---\n")
                    if text:
                        out_file.write(text)
        except Exception as e:
            out_file.write(f"Error reading {pdf_path}: {e}")

print("Extraction complete.")
