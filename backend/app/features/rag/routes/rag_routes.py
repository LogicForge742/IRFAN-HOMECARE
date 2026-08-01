from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.features.rag.services.rag_service import RAGService
from app.features.rag.schemas.rag_schema import RAGQuerySchema, RAGIngestSchema

rag_bp = Blueprint("rag", __name__)

@rag_bp.route("/query", methods=["POST"])
@jwt_required()
def query_knowledge_base():
    data = request.get_json() or {}
    schema = RAGQuerySchema()
    errors = schema.validate(data)
    if errors:
        return jsonify({"status": "error", "errors": errors}), 400
    
    loaded = schema.load(data)
    result = RAGService.query_knowledge_base(loaded["query"])
    return jsonify({"status": "success", "data": result}), 200

@rag_bp.route("/ingest", methods=["POST"])
@jwt_required()
def ingest_document():
    data = request.get_json() or {}
    schema = RAGIngestSchema()
    errors = schema.validate(data)
    if errors:
        return jsonify({"status": "error", "errors": errors}), 400
    
    loaded = schema.load(data)
    chunks_created = RAGService.ingest_text_document(
        loaded["title"],
        loaded["text"],
        loaded.get("metadata")
    )
    return jsonify({
        "status": "success",
        "message": f"Successfully ingested and indexed {chunks_created} chunks."
    }), 200
