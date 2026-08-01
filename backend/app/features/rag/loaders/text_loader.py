class TextLoader:
    @staticmethod
    def load(filepath):
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                return f.read()
        except Exception as e:
            print(f"Error loading text: {e}")
            return ""
