from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Import routes
from routes.chatbotRoutes import chat_blueprint
from routes.resumeRoutes import resumeProcessBlueprint
from routes.candidateRoutes import candidateBlueprint
from routes.authRoutes import auth_blueprint

# Import utilities
from utils.auth import validate_environment
from utils.db import validate_mongodb_connection

app = Flask(__name__)
CORS(app)

# Validate environment variables on startup
try:
    validate_environment()
    print("✅ Environment variables validated successfully")
except ValueError as e:
    print(f"❌ Environment validation failed: {str(e)}")
    print("Please check your .env file and ensure all required variables are set")
    exit(1)

# Test MongoDB connection on startup
try:
    validate_mongodb_connection()
    print("✅ MongoDB connection validated successfully")
except Exception as e:
    print(f"❌ MongoDB connection failed: {str(e)}")
    print("Please check your MONGODB_URI and ensure MongoDB is running")
    exit(1)

# Register routes
app.register_blueprint(candidateBlueprint)
app.register_blueprint(chat_blueprint)
app.register_blueprint(resumeProcessBlueprint)
app.register_blueprint(auth_blueprint)

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500

@app.errorhandler(401)
def unauthorized(error):
    return jsonify({"error": "Unauthorized access"}), 401

@app.errorhandler(403)
def forbidden(error):
    return jsonify({"error": "Forbidden access"}), 403

if __name__ == '__main__':
    print("🚀 Starting Flask application...")
    print(f"📊 Environment: {os.getenv('FLASK_ENV', 'development')}")
    print(f"🔧 Debug mode: {os.getenv('FLASK_DEBUG', 'False')}")
    app.run(debug=True, port=5000)

