from flask import Flask
from flask_cors import CORS
import os

from app.molde.habit import habit_bp
from app.molde.expenses import expenses_bp
from app.molde.setting import setting_bp
from app.molde.signup import signup_bp
from app.molde.login import login_bp

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(
    __name__,
    static_folder=os.path.join(BASE_DIR, "app", "static"),
    static_url_path="/static"
)

CORS(app)

app.register_blueprint(habit_bp)
app.register_blueprint(expenses_bp)
app.register_blueprint(setting_bp)
app.register_blueprint(signup_bp)
app.register_blueprint(login_bp)

if __name__ == "__main__":
    app.run(debug=True)