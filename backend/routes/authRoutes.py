from flask import Blueprint, request, jsonify
from utils.db import get_user_collection
import bcrypt
import jwt
import os
from datetime import datetime, timedelta

SECRET_KEY = os.getenv("JWT_SECRET", "supersecretkey")

auth_blueprint = Blueprint("auth_blueprint", __name__)

@auth_blueprint.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400
    users = get_user_collection()
    if users.find_one({"email": email}):
        return jsonify({"error": "User already exists"}), 409
    hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    users.insert_one({"email": email, "password": hashed})
    token = jwt.encode({"email": email, "exp": datetime.utcnow() + timedelta(days=7)}, SECRET_KEY, algorithm="HS256")
    return jsonify({"token": token, "email": email}), 201

@auth_blueprint.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400
    users = get_user_collection()
    user = users.find_one({"email": email})
    if not user or not bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        return jsonify({"error": "Invalid credentials"}), 401
    token = jwt.encode({"email": email, "exp": datetime.utcnow() + timedelta(days=7)}, SECRET_KEY, algorithm="HS256")
    return jsonify({"token": token, "email": email}), 200 