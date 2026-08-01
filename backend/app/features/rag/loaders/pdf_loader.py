class PDFLoader:
    @staticmethod
    def load(filepath):
        try:
            return f"Mock parsed content from PDF at: {filepath}"
        except Exception as e:
            return ""
