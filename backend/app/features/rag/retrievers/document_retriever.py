from app.features.rag.embeddings.embedding_service import EmbeddingService
from app.features.rag.vectorstore.vector_store import vector_store_instance

class DocumentRetriever:
    @staticmethod
    def retrieve(query, top_k=3):
        q_emb = EmbeddingService.get_embedding(query)
        matches = vector_store_instance.search(q_emb, top_k=top_k)
        
        results = []
        for score, doc in matches:
            results.append({
                "id": doc["id"],
                "text": doc["text"],
                "score": score,
                "metadata": doc["metadata"]
            })
        return results
