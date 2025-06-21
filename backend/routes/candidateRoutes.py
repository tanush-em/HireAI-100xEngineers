from flask import Blueprint, jsonify
from utils.db import get_mongo_collection 
from utils.auth import token_required

candidateBlueprint = Blueprint('candidate_api', __name__)

@candidateBlueprint.route('/candidates', methods=['GET'])
@token_required
def get_all_candidates():
    try:
        collection = get_mongo_collection()
        candidates = list(collection.find({}, {"_id": 0}))  # exclude MongoDB _id
        return jsonify({
            "success": True,
            "data": candidates
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


