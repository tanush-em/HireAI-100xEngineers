import os
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError
from urllib.parse import urlparse
from pprint import pprint

def validate_mongodb_connection():
    """Validate MongoDB connection and return client if successful"""
    mongo_uri = os.getenv("MONGODB_URI")
    if not mongo_uri:
        raise ValueError("MONGODB_URI environment variable is required")
    
    try:
        client = MongoClient(mongo_uri, serverSelectionTimeoutMS=5000)
        # Test the connection
        client.admin.command('ping')
        return client
    except (ConnectionFailure, ServerSelectionTimeoutError) as e:
        raise ConnectionError(f"Failed to connect to MongoDB: {str(e)}")
    except Exception as e:
        raise Exception(f"Unexpected error connecting to MongoDB: {str(e)}")

def get_mongo_collection():
    """Get MongoDB collection with proper error handling"""
    try:
        client = validate_mongodb_connection()
        parsed = urlparse(os.getenv("MONGODB_URI"))
        db_name = parsed.path.lstrip("/") or "resume_ranking"
        db = client[db_name]
        return db["candidates"]
    except Exception as e:
        print(f"Error getting MongoDB collection: {str(e)}")
        raise

def get_user_collection():
    """Get MongoDB users collection with proper error handling"""
    try:
        client = validate_mongodb_connection()
        parsed = urlparse(os.getenv("MONGODB_URI"))
        db_name = parsed.path.lstrip("/") or "resume_ranking"
        db = client[db_name]
        return db["users"]
    except Exception as e:
        print(f"Error getting MongoDB users collection: {str(e)}")
        raise

def append_ranks_to_candidates(candidates_info, rankings_text, session_id):
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
            "score": 0,
            "session_id": session_id
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

        # Insert or update candidate info in MongoDB
        if data_dict["mail"]:
            existing_candidate = collection.find_one({"mail": data_dict["mail"]})
            if existing_candidate:
                # 🟢 Update score, rank, and session_id
                collection.update_one(
                    {"mail": data_dict["mail"]},
                    {
                        "$set": {
                            "score": data_dict["score"],
                            "rank": idx,
                            "session_id": session_id  # ✅ update session_id too
                        }
                    }
                )
            else:
                collection.insert_one(data_dict)
        else:
            collection.insert_one(data_dict)

        pprint(data_dict)



