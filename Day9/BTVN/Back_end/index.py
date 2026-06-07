from flask import Flask, jsonify
from flask_cors import CORS
from product import products


app = Flask(__name__)
CORS(app)
@app.route("/products", methods = ["GET"])
def home():
    data = products 
    data = jsonify(data)
    return data

@app.route("/products/<id>", methods = ["GET"])
def get_data_id(id):
    for product in products:
        if id == str(product["id"]):
            return f"""
            <h1>Name: {product["name"]}</h1>
            <h2>Category: {product["name"]}</h2>
            <h3>Price: {product["price"]}</h3>
            <h3>Stock: {product["stock"]}</h3>
            <h3>Rating: {product["rating"]}</h3>
            <h4>Is_available: {product["is_available"]}
            """




if __name__ == "__main__":
    app.run(debug = True)