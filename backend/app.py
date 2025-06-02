from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()
from routes.chatbot_routes import chat_blueprint
from routes.resumeProcessing import resumeProcessBlueprint
from utils.db import get_mongo_collection

load_dotenv()
app = Flask(__name__)
CORS(app)

# Register routes
# app.register_blueprint(resume_blueprint)
app.register_blueprint(chat_blueprint)
app.register_blueprint(resumeProcessBlueprint)

@app.route('/api/candidates', methods=['GET'])
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


if __name__ == '__main__':
    app.run(debug=True, port=5000)

