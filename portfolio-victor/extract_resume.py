import PyPDF2
import sys

def extract_pdf_text(pdf_path):
    """Extract all text from a PDF file."""
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
            return text
    except Exception as e:
        return f"Error: {str(e)}"

if __name__ == "__main__":
    pdf_path = r"c:\Users\victor.senisse\Desktop\Portal Elara\portfolio-victor\Curriculo - Victor Senisse.pdf"
    text = extract_pdf_text(pdf_path)
    print(text)
