import math

class InMemoryVectorStore:
    def __init__(self):
        self.documents = []

    def add_document(self, doc_id, text, vector, metadata=None):
        self.documents.append({
            "id": doc_id,
            "text": text,
            "vector": vector,
            "metadata": metadata or {}
        })

    def search(self, query_vector, top_k=3):
        if not self.documents:
            return []

        results = []
        
        for doc in self.documents:
            d_vec = doc["vector"]
            dot = sum(x * y for x, y in zip(query_vector, d_vec))
            q_norm = math.sqrt(sum(x * x for x in query_vector))
            d_norm = math.sqrt(sum(x * x for x in d_vec))
            
            similarity = 0.0
            if q_norm > 0 and d_norm > 0:
                similarity = float(dot / (q_norm * d_norm))
                
            results.append((similarity, doc))
            
        results.sort(key=lambda x: x[0], reverse=True)
        return results[:top_k]

vector_store_instance = InMemoryVectorStore()
