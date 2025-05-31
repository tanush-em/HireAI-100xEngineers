import os
from pymongo import MongoClient

def get_mongo_collection():
    mongo_uri = os.getenv("MONGODB_URI")
    client = MongoClient(mongo_uri)
    parsed = urlparse(mongo_uri)
    db_name = parsed.path.lstrip("/") or "resume_ranking"
    db = client[db_name]
    return db["candidates"]
