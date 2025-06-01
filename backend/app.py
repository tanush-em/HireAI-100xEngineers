from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()
# from routes.chatbot_routes import chat_blueprint
from routes.resumeProcessing import resumeProcessBlueprint

app = Flask(__name__)
CORS(app)

# Register routes
# app.register_blueprint(resume_blueprint)
# app.register_blueprint(chat_blueprint)
app.register_blueprint(resumeProcessBlueprint)

if __name__ == '__main__':
    app.run(debug=True, port=5000)

