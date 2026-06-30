
from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
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

@app.route("/create_person", methods = ["POST"])

def create_person():
    request_data = request.get_json()
    print("Received data: ", request_data)
    return jsonify({"message: data request ssc"})


@app.route('/getdata', methods = ["GET"])  
def getData():
    get = sqlite3.connect(r'D:\NCT-CSA34-HB-HB\Day9\Back_end\person.db')

    cursor = get.cursor()
    cursor.execute("SELECT * FROM persons")

    data = cursor.fetchall()
    print(data)

    get.close()

    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)

