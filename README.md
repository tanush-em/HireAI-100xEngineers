# Buildathon - Radons

## Resume Parsing, Extraction, Scoring, Ranking Implemented

### Features

* Extracts text from PDF resumes in the `resume/` folder
* Uses LLM to extract structured candidate data
* Ranks candidates based on a given job description
* Saves both raw and ranked output to the `output/` folder
* Stores all candidate data in MongoDB

### Setup

1. Clone this repository
2. Create and activate a virtual environment
3. Install dependencies

```bash
pip install -r requirements.txt
```

4. Create a `.env` file with the following:

```
GROQ_API_KEY=your_groq_api_key
MONGODB_URI=http://localhost:27017/resume_ranking
```

5. Create an empty folder named `output` at the root of the project if it doesn't already exist.

6. Place all PDF resumes inside the `resume/` folder.

7. Run the main script:

```bash
python extract.py
```

This will:

* Extract candidate information from resumes
* Rank candidates based on the job description
* Save the results in the `output/` folder
* Upload all candidate data to the configured MongoDB instance

## MongoDB Schema

Each document inserted into the `candidates` collection follows this structure:

```json
{
  "_id": {
    "$oid": "6839fa8ad6f16f802b8e8975"
  },
  "file_name": "john_doe_resume.pdf",
  "name": "JOHN DOE",
  "mail": "johndoe@example.com",
  "linkedin": "linkedin.com/in/john-doe-dev",
  "education": "ABC Institute of Technology, XYZ Senior Secondary School",
  "work_experience": "TechNova Solutions (January 2024 - March 2024), ByteForge Technologies (August 2023), Open Source Hackathon (September 2023 - October 2023)",
  "skills": "Python, Java, HTML, CSS, JavaScript, React, Node.js, MongoDB, Flask, TensorFlow, Pandas, Git",
  "rank": 4,
  "score": 58
}
```
