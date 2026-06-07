from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/", methods=['GET'])
def home():
    return "Hello, World!"

@app.route("/get_person_information", methods = ["GET"])
def get_person_information():
    data=  {
        "name": "Đạt",
        "gmail": "tranquangle00@gmail.com",
        "phone": "0937169412",
        "favorites": ["sleep","video game","chess"]
    }
    data = jsonify(data)
    return data

if __name__ == "__main__":
    app.run(debug=True)