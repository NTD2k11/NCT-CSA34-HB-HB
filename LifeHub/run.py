from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

@app.route("/", methods=['GET'])
def home():
    return jsonify("Hello, World!")
