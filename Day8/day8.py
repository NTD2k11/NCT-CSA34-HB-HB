from flask import Flask
from  product import products
app = Flask(__name__)

@app.route('/', methods =['GET'])

@app.route('/getdata/<name>', methods = ['GET'])
def get_data_name(name):
    return f"<h1>Hello {name}</h1>"

def get_data():
    return "<h1>Welcome</h1>"

@app.route('/products', methods = ['GET'])
def get_products():
    for product in range(products):
        return f"""
        <div>
        <h1>Name: {product["name"]}</h1>
        <a href="http://127.0.0.1:5000/products/{product["id"]}">Xem chi tiết</a>
        </div>
        """
@app.route('/products/<id>', methods = ['GET'])
def get_data_id(id):
    for product in products:
        if id == str(product["id"]):
            return f"""
            <h1>Name: {product["name"]}</h1>
            <h2>Category: {product["name"]}<~/h2>
            <h3>Price: {product["price"]}</h3>
            <h3>Stock: {product["stock"]}</h3>
            <h3>Rating: {product["rating"]}</h3>
            <h4>Is_available: {product["is_available"]}
            """



    

if __name__ == '__main__':
    app.run(debug=True)

