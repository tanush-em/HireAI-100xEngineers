from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
import fitz
import json

app = Flask(__name__)
CORS(app)

# Load environment variables
load_dotenv()

# Load prompts
def read_prompt_file(filename):
    with open(os.path.join("prompts", filename), "r", encoding="utf-8") as f:
        return f.read().strip()

JOB_DESCRIPTION = read_prompt_file("job_description.txt")
EXTRACTION_PROMPT_TEMPLATE = read_prompt_file("extraction_prompt.txt")
RANKING_PROMPT_TEMPLATE = read_prompt_file("ranking_prompt.txt")

# Initialize LLM
def initialize_llm():
    return ChatGroq(
        groq_api_key=os.getenv("GROQ_API_KEY"),
        model_name="llama-3.1-8b-instant",
        temperature=0.0,
        max_tokens=4096,
    )

llm = initialize_llm()

extraction_prompt = PromptTemplate(
    input_variables=["human_input"],
    template=EXTRACTION_PROMPT_TEMPLATE
)

ranking_prompt = PromptTemplate(
    input_variables=["job_desc", "candidate_infos"],
    template=RANKING_PROMPT_TEMPLATE
)

# MongoDB initialization
def get_mongo_collection():
    mongo_uri = os.getenv("MONGODB_URI")
    client = MongoClient(mongo_uri)
    db_name = mongo_uri.rsplit("/", 1)[-1]
    db = client[db_name]
    return db["candidates"]

# PDF extraction
def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    all_text = []
    for page_num in range(len(doc)):
        page = doc[page_num]
        all_text.append(page.get_text())
    return "\n".join(all_text)

# Resume processing
def process_resume(pdf_path):
    extracted_text = extract_text_from_pdf(pdf_path)
    prompt_text = extraction_prompt.format(human_input=extracted_text)
    response = llm.invoke(prompt_text)
    return response.content.strip()

# Ranking candidates
def rank_candidates(candidates_info):
    candidate_texts = "\n\n".join([c["info"] for c in candidates_info])
    prompt_text = ranking_prompt.format(job_desc=JOB_DESCRIPTION, candidate_infos=candidate_texts)
    response = llm.invoke(prompt_text)
    return response.content.strip()

# Process and store candidate data
def process_and_store_candidate(candidate_info, ranking_text):
    lines = candidate_info["info"].splitlines()
    data_dict = {
        "file_name": candidate_info["file"],
        "name": "",
        "mail": "",
        "linkedin": "",
        "education": "",
        "work_experience": "",
        "skills": [],
        "rank": 0,
        "score": 0
    }

    for line in lines:
        if line.lower().startswith("name:"):
            data_dict["name"] = line[5:].strip()
        elif line.lower().startswith("mail:"):
            data_dict["mail"] = line[5:].strip()
        elif line.lower().startswith("linkedin id:"):
            data_dict["linkedin"] = line[13:].strip()
        elif line.lower().startswith("education:"):
            data_dict["education"] = line[10:].strip()
        elif line.lower().startswith("work experience:"):
            data_dict["work_experience"] = line[17:].strip()
        elif line.lower().startswith("skills:"):
            skills = line[7:].strip()
            data_dict["skills"] = [s.strip() for s in skills.split(",")]

    # Extract score from ranking text
    ranking_blocks = ranking_text.strip().split("\n\n")
    for block in ranking_blocks:
        lines = block.strip().splitlines()
        name, score = "", ""
        for line in lines:
            if line.lower().startswith("name:"):
                name = line[5:].strip().lower()
            elif line.lower().startswith("score:"):
                score = line[6:].strip()
        if name and name == data_dict["name"].lower():
            data_dict["score"] = int(score)
            break

    # Store in MongoDB
    collection = get_mongo_collection()
    collection.insert_one(data_dict)
    return data_dict

@app.route('/api/upload', methods=['POST'])
def upload_resume():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if not file.filename.lower().endswith('.pdf'):
        return jsonify({'error': 'Only PDF files are allowed'}), 400

    # Save file
    os.makedirs('resume', exist_ok=True)
    file_path = os.path.join('resume', file.filename)
    file.save(file_path)

    # Process resume
    try:
        candidate_info = {
            "file": file.filename,
            "info": process_resume(file_path)
        }
        
        # Get all candidates and rank them
        collection = get_mongo_collection()
        all_candidates = list(collection.find({}, {'_id': 0}))
        all_candidates.append(candidate_info)
        
        ranking_text = rank_candidates(all_candidates)
        processed_data = process_and_store_candidate(candidate_info, ranking_text)
        
        return jsonify({
            'message': 'Resume processed successfully',
            'data': processed_data
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/candidates', methods=['GET'])
def get_candidates():
    try:
        collection = get_mongo_collection()
        candidates = list(collection.find({}, {'_id': 0}))
        return jsonify(candidates), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/candidates/<filename>', methods=['GET'])
def get_candidate(filename):
    try:
        collection = get_mongo_collection()
        candidate = collection.find_one({'file_name': filename}, {'_id': 0})
        if candidate:
            return jsonify(candidate), 200
        return jsonify({'error': 'Candidate not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 