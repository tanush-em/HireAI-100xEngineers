from flask import Blueprint, request, jsonify
from langchain.chains import RetrievalQA
from langchain.vectorstores import FAISS
from langchain.embeddings import HuggingFaceEmbeddings
from langchain_core.documents import Document

from db import get_mongo_collection
from llm.groq import llm

chat_blueprint = Blueprint("chat", __name__)

# Create FAISS vector store
embedding = HuggingFaceEmbeddings()
vectorstore = FAISS(embedding_function=embedding)

# Load candidate data into vectorstore (in-memory)
def load_candidate_documents():
    collection = get_mongo_collection()
    docs = []

    for candidate in collection.find():
        content = f"""
        Name: {candidate.get("name")}
        Email: {candidate.get("mail")}
        LinkedIn: {candidate.get("linkedin")}
        Education: {candidate.get("education")}
        Work Experience: {candidate.get("work_experience")}
        Skills: {', '.join(candidate.get("skills", []))}
        """
        docs.append(Document(page_content=content, metadata={"file_name": candidate.get("file_name")}))

    vectorstore.add_documents(docs)

# Call once at app startup
load_candidate_documents()

# Setup QA chain
qa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=vectorstore.as_retriever())

# Define chatbot route
@chat_blueprint.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    query = data.get("query")

    if not query:
        return jsonify({"error": "Missing query"}), 400

    try:
        answer = qa_chain.run(query)
        return jsonify({"response": answer})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

