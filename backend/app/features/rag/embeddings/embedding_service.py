import hashlib
import math

class EmbeddingService:
    @staticmethod
    def get_embedding(text):
        dims = 128
        vec = [0.0] * dims
        words = text.lower().split()
        if not words:
            return vec
        
        for w in words:
            h = int(hashlib.md5(w.encode("utf-8")).hexdigest(), 16)
            idx = h % dims
            vec[idx] += 1.0
            
        sum_sq = sum(x * x for x in vec)
        norm = math.sqrt(sum_sq)
        if norm > 0:
            vec = [x / norm for x in vec]
            
        return vec
