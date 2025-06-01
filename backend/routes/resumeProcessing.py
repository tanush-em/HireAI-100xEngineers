from flask import Blueprint, request, jsonify
import zipfile
import io
import os
import uuid
import traceback
from datetime import datetime
from utils.helpers import process_resumes_in_folder,rank_candidates 
from utils.db import append_ranks_to_candidates

resumeProcessBlueprint = Blueprint('resume_api',__name__)

job_results = {}

@resumeProcessBlueprint.route('/analyze_resumes',methods=['POST'])
def analyze_resumes():
    try:
        # Generate a unique session/job ID
        session_id = str(uuid.uuid4())
        print(f"[{datetime.now()}] [INFO] Session started: {session_id}")

        # Check for required fields
        if 'resumes_zip' not in request.files or 'query' not in request.form:
            print(f"[{datetime.now()}] [ERROR] Missing file or query")
            return jsonify({
                'status': 'error',
                'message': 'Missing resumes_zip or query parameter'
            }), 400

        # Get the zip file and query from the request
        zip_file = request.files['resumes_zip']
        query = request.form['query']
        
        # Create a unique temporary directory using session_id
        temp_dir = f'temp_resumes_{session_id}'
        os.makedirs(temp_dir, exist_ok=True)
        print(f"[{datetime.now()}] [INFO] Created temp dir: {temp_dir}")

        # Extract the zip file
        with zipfile.ZipFile(zip_file) as zip_ref:
            zip_ref.extractall(temp_dir)
        print(f"[{datetime.now()}] [INFO] Extracted zip file")

        # ----- PROCESSING STAGE -----
        candidates_info = process_resumes_in_folder()
        ranking_text = rank_candidates(candidates_info)
        append_ranks_to_candidates(candidates_info, ranking_text,session_id)
        # Placeholder for resume processing logic
        result = {
            'summary': 'Resume analysis complete',
            'query_used': query,
            'num_files': len(os.listdir(temp_dir))
        }
        job_results[session_id] = result
        print(f"[{datetime.now()}] [INFO] Processed resumes: {result['num_files']} files")

        # ----- CLEANUP -----
        for file in os.listdir(temp_dir):
            os.remove(os.path.join(temp_dir, file))
        os.rmdir(temp_dir)
        print(f"[{datetime.now()}] [INFO] Cleaned up temp directory")

        # ----- SUCCESS RESPONSE -----
        return jsonify({
            'status': 'success',
            'session_id': session_id,
            'response': result
        }), 200

    except Exception as e:
        print(f"[{datetime.now()}] [EXCEPTION] {str(e)}")
        traceback.print_exc()
        return jsonify({
            'status': 'error',
            'message': 'Internal Server Error',
            'details': str(e)
        }), 500

