from flask import Flask 
from flask_cors import CORS

from dotenv import load_dotenv
load_dotenv()

from routes.chatbotRoutes import chat_blueprint
from routes.resumeRoutes import resumeProcessBlueprint
from routes.candidateRoutes import candidateBlueprint
from routes.authRoutes import auth_blueprint


app = Flask(__name__)
CORS(app)

# Register routes
app.register_blueprint(candidateBlueprint)
app.register_blueprint(chat_blueprint)
app.register_blueprint(resumeProcessBlueprint)
app.register_blueprint(auth_blueprint)

if __name__ == '__main__':
    app.run(debug=True, port=5000)

