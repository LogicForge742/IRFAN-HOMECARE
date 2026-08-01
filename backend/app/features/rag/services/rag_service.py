import uuid
from app.features.rag.loaders.text_loader import TextLoader
from app.features.rag.chunkers.text_chunker import TextChunker
from app.features.rag.embeddings.embedding_service import EmbeddingService
from app.features.rag.vectorstore.vector_store import vector_store_instance
from app.features.rag.retrievers.document_retriever import DocumentRetriever
from app.features.ai.services.ai_service import AIService

class RAGService:
    @staticmethod
    def ingest_text_document(title, text, metadata=None):
        meta = metadata or {}
        meta["title"] = title
        
        chunks = TextChunker.chunk(text, chunk_size=150, overlap=30)
        for idx, chunk in enumerate(chunks):
            doc_id = f"{uuid.uuid4()}_chunk_{idx}"
            vector = EmbeddingService.get_embedding(chunk)
            vector_store_instance.add_document(doc_id, chunk, vector, meta)
        
        return len(chunks)

    @staticmethod
    def query_knowledge_base(query):
        sources = DocumentRetriever.retrieve(query, top_k=3)
        
        if not sources:
            return {
                "answer": "No relevant documents found in knowledge base.",
                "sources": []
            }
        
        context_str = "\n\n".join([f"Source [{s['metadata'].get('title', 'Unknown')}]: {s['text']}" for s in sources])
        prompt = f"Answer the user query based ONLY on the following context:\n\n{context_str}\n\nQuery: {query}"
        
        answer = AIService._get_ai_completion(prompt)
        
        return {
            "answer": answer,
            "sources": sources
        }
