# Resume Processing Backend

This Flask backend service processes resumes, extracts candidate information using LLM, and ranks candidates based on job descriptions.

## 🔐 Authentication & Security

This backend now includes comprehensive authentication and security features:

- **JWT-based authentication** for all protected endpoints
- **Password hashing** using bcrypt
- **Input validation** for email and password
- **Protected routes** - all sensitive data requires authentication
- **Environment variable validation** on startup
- **MongoDB connection validation** on startup

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. **Create a `.env` file** with the following variables (copy from `.env.sample`):
```bash
cp .env.sample .env
```

Then edit `.env` with your actual values:
```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/resume_ranking

# JWT Configuration (CHANGE THIS IN PRODUCTION!)
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production

# Groq API Configuration
GROQ_API_KEY=your_groq_api_key_here

# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True
```

4. Create the following directories:
```bash
mkdir -p resume output prompts uploads
```

5. Copy the prompt files from the original project to the `prompts` directory:
- job_description.txt
- extraction_prompt.txt
- ranking_prompt.txt

## Running the Server

```bash
python app.py
```

The server will start on `http://localhost:5000`

## 🔑 Authentication Endpoints

### 1. Sign Up
- **URL**: `/api/signup`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Body**: 
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**: 
  ```json
  {
    "token": "jwt_token_here",
    "email": "user@example.com"
  }
  ```

### 2. Login
- **URL**: `/api/login`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Body**: 
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

### 3. Validate Token
- **URL**: `/api/validate`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: 
  ```json
  {
    "valid": true,
    "email": "user@example.com"
  }
  ```

## 🔒 Protected API Endpoints

**All endpoints below require authentication. Include the JWT token in the Authorization header:**
```
Authorization: Bearer <your_jwt_token>
```

### 1. Upload Resume
- **URL**: `/api/upload`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: 
  - `file`: PDF or ZIP file
- **Response**: 
  ```json
  {
    "message": "File uploaded successfully",
    "filename": "resume.pdf",
    "filepath": "uploads/resume.pdf"
  }
  ```

### 2. Analyze Resumes
- **URL**: `/api/analyze_resumes`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: 
  - `resumes_zip`: ZIP file containing resumes
  - `query`: Job description query
- **Response**: 
  ```json
  {
    "status": "processing",
    "session_id": "uuid_here",
    "message": "Resume processing started."
  }
  ```

### 3. Check Processing Status
- **URL**: `/api/status/<session_id>`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: 
  ```json
  {
    "status": "processing"
  }
  ```

### 4. Get Processing Result
- **URL**: `/api/result/<session_id>`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Processing results

### 5. Get All Candidates
- **URL**: `/api/candidates`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Array of candidate objects

### 6. Chat with Session
- **URL**: `/api/chat/<session_id>`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: 
  ```json
  {
    "query": "Who has the most experience in Python?"
  }
  ```
- **Response**: 
  ```json
  {
    "response": "Based on the candidates..."
  }
  ```

## Error Handling

All endpoints return appropriate HTTP status codes:
- 200: Success
- 400: Bad Request
- 401: Unauthorized (missing or invalid token)
- 404: Not Found
- 409: Conflict (user already exists)
- 500: Internal Server Error

Error responses follow the format:
```json
{
  "error": "Error message"
}
```

## Security Features

- **JWT Token Validation**: All protected routes validate JWT tokens
- **Password Hashing**: Passwords are hashed using bcrypt
- **Input Validation**: Email format and password strength validation
- **Environment Validation**: Startup validation of required environment variables
- **Database Connection Validation**: Startup validation of MongoDB connection
- **Secure File Uploads**: File type validation and secure filename handling

## Troubleshooting

### Common Issues:

1. **"JWT_SECRET environment variable is required"**
   - Make sure you have a `.env` file with `JWT_SECRET` set

2. **"MONGODB_URI environment variable is required"**
   - Make sure you have a `.env` file with `MONGODB_URI` set
   - Ensure MongoDB is running

3. **"Failed to connect to MongoDB"**
   - Check if MongoDB is running
   - Verify your `MONGODB_URI` is correct
   - Ensure network connectivity

4. **"Token is missing" or "Token is invalid"**
   - Make sure you're including the Authorization header
   - Format: `Authorization: Bearer <your_token>`
   - Check if your token has expired (7 days by default) 