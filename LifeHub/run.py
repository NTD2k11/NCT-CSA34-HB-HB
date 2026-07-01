from flask import Flask
from flask_cors import CORS

from app.molde.setting import setting_bp
from app.molde.signup import signup_bp
from app.molde.login import login_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(signup_bp)
app.register_blueprint(login_bp)
app.register_blueprint(setting_bp) 

if __name__ == "__main__":
    app.run(debug=True)


    

