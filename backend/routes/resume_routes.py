from flask import Blueprint, request, jsonify
import os

from utils.resume_processor import process_resume_file, get_all_candidates, get_candidate_by_filename

resume_blueprint = Blueprint('resume_api', __name__)

@resume_blueprint.route('/api/upload', methods=['POST'])
def upload_resume():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    if not file.filename.lower().endswith('.pdf'):
        return jsonify({'error': 'Only PDF files are allowed'}), 400

    os.makedirs('resume', exist_ok=True)
    file_path = os.path.join('resume', file.filename)
    file.save(file_path)

    try:
        processed_data = process_resume_file(file.filename, file_path)
        return jsonify({'message': 'Resume processed successfully', 'data': processed_data}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@resume_blueprint.route('/api/candidates', methods=['GET'])
def get_candidates():
    try:
        return jsonify(get_all_candidates()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@resume_blueprint.route('/api/candidates/<filename>', methods=['GET'])
def get_candidate(filename):
    try:
        candidate = get_candidate_by_filename(filename)
        if candidate:
            return jsonify(candidate), 200
        return jsonify({'error': 'Candidate not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

