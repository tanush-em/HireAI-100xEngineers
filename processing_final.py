import os
import fitz
from dotenv import load_dotenv
from pymongo import MongoClient
from urllib.parse import urlparse
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate

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

# PDF extraction
def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    all_text = []
    for page_num in range(len(doc)):
        page = doc[page_num]
        all_text.append(page.get_text())
    return "\n".join(all_text)

def get_mongo_collection():
    mongo_uri = os.getenv("MONGODB_URI")
    client = MongoClient(mongo_uri)
    parsed = urlparse(mongo_uri)
    db_name = parsed.path.lstrip("/") or "resume_ranking"
    db = client[db_name]
    return db["candidates"]

# Resume processing
def process_resumes_in_folder(folder_path="resume"):
    candidates_info = []
    os.makedirs("output", exist_ok=True)

    for filename in os.listdir(folder_path):
        if filename.lower().endswith(".pdf"):
            pdf_path = os.path.join(folder_path, filename)
            extracted_text = extract_text_from_pdf(pdf_path)
            prompt_text = extraction_prompt.format(human_input=extracted_text)
            response = llm.invoke(prompt_text)
            cleaned_output = response.content.strip()
            candidates_info.append({
                "file": filename,
                "info": cleaned_output
            })
    return candidates_info

# Ranking candidates
def rank_candidates(candidates_info):
    candidate_texts = "\n\n".join([c["info"] for c in candidates_info])
    prompt_text = ranking_prompt.format(job_desc=JOB_DESCRIPTION, candidate_infos=candidate_texts)
    response = llm.invoke(prompt_text)
    cleaned_output = response.content.strip()
    with open(os.path.join("output", "candidate_ranking.txt"), "w", encoding="utf-8") as f:
        f.write(cleaned_output)
    return cleaned_output

# Append ranks and upload to MongoDB
def append_ranks_to_candidates(candidates_info, rankings_text):
    ranking_blocks = rankings_text.strip().split("\n\n")
    name_to_score = {}

    for block in ranking_blocks:
        lines = block.strip().splitlines()
        name, score = "", ""
        for line in lines:
            if line.lower().startswith("name:"):
                name = line[5:].strip().lower()
            elif line.lower().startswith("score:"):
                score = line[6:].strip()
        if name and score:
            name_to_score[name] = score

    output_path = os.path.join("output", "processed_candidates.txt")
    collection = get_mongo_collection()

    for idx, candidate in enumerate(candidates_info, 1):
        lines = candidate["info"].splitlines()
        data_dict = {
            "file_name": candidate["file"],
            "name": "",
            "mail": "",
            "linkedin": "",
            "education": "",
            "work_experience": "",
            "skills": [],
            "rank": idx,
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

        name_key = data_dict["name"].lower()
        data_dict["score"] = int(name_to_score.get(name_key, "0"))

        with open(output_path, "a", encoding="utf-8") as f:
            f.write(f"File name: {data_dict['file_name']}\n")
            f.write(candidate["info"].strip() + "\n")
            f.write(f"rank: {idx}\n")
            f.write(f"score: {data_dict['score']}\n")
            f.write("---\n")

        # Check if email already exists and update only score and rank if it does
        if data_dict["mail"]:
            existing_candidate = collection.find_one({"mail": data_dict["mail"]})
            if existing_candidate:
                collection.update_one(
                    {"mail": data_dict["mail"]},
                    {"$set": {"score": data_dict["score"], "rank": idx}}
                )
            else:
                collection.insert_one(data_dict)
        else:
            collection.insert_one(data_dict)

if __name__ == "__main__":
    candidates_info = process_resumes_in_folder()
    ranking_text = rank_candidates(candidates_info)
    append_ranks_to_candidates(candidates_info, ranking_text)
