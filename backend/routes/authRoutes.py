from flask import Blueprint, request, jsonify
from utils.db import get_user_collection
from utils.auth import generate_token, validate_environment
import bcrypt
import re
from datetime import datetime, timedelta

auth_blueprint = Blueprint("auth_blueprint", __name__)

def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_password(password):
    """Validate password strength"""
    if len(password) < 6:
        return False, "Password must be at least 6 characters long"
    return True, ""

@auth_blueprint.route("/api/signup", methods=["POST"])
def signup():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        email = data.get("email", "").strip().lower()
        password = data.get("password", "")
        
        # Input validation
        if not email or not password:
            return jsonify({"error": "Email and password required"}), 400
        
        if not validate_email(email):
            return jsonify({"error": "Invalid email format"}), 400
        
        is_valid_password, password_error = validate_password(password)
        if not is_valid_password:
            return jsonify({"error": password_error}), 400
        
        # Check if user already exists
        users = get_user_collection()
        if users.find_one({"email": email}):
            return jsonify({"error": "User already exists"}), 409
        
        # Hash password and create user
        hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
        users.insert_one({
            "email": email, 
            "password": hashed,
            "created_at": datetime.utcnow()
        })
        
        # Generate token
        token = generate_token(email)
        return jsonify({"token": token, "email": email}), 201
        
    except Exception as e:
        print(f"Signup error: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@auth_blueprint.route("/api/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        email = data.get("email", "").strip().lower()
        password = data.get("password", "")
        
        # Input validation
        if not email or not password:
            return jsonify({"error": "Email and password required"}), 400
        
        if not validate_email(email):
            return jsonify({"error": "Invalid email format"}), 400
        
        # Check user credentials
        users = get_user_collection()
        user = users.find_one({"email": email})
        
        if not user or not bcrypt.checkpw(password.encode("utf-8"), user["password"]):
            return jsonify({"error": "Invalid credentials"}), 401
        
        # Generate token
        token = generate_token(email)
        return jsonify({"token": token, "email": email}), 200
        
    except Exception as e:
        print(f"Login error: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@auth_blueprint.route("/api/validate", methods=["GET"])
def validate_token():
    """Validate if the current token is valid"""
    from utils.auth import verify_token
    
    token = None
    if 'Authorization' in request.headers:
        auth_header = request.headers['Authorization']
        try:
            token = auth_header.split(" ")[1]
        except IndexError:
            return jsonify({"valid": False, "error": "Invalid token format"}), 401
    
    if not token:
        return jsonify({"valid": False, "error": "Token is missing"}), 401
    
    payload = verify_token(token)
    if payload is None:
        return jsonify({"valid": False, "error": "Token is invalid or expired"}), 401
    
    return jsonify({"valid": True, "email": payload['email']}), 200 