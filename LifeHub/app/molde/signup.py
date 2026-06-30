
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
import sqlite3
from datetime import datetime

signup_bp = Blueprint("signup", __name__)

@signup_bp.route("/signup", methods=["POST"])
def signup():

    try:

        data = request.get_json()

        firstname = data.get("firstname")
        lastname = data.get("lastname")
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if not all([firstname, lastname, username, email, password]):
            return jsonify({
                "success": False,
                "message": "Vui lòng nhập đầy đủ thông tin."
            }), 400

        if len(password) < 6:
            return jsonify({
                "success": False,
                "message": "Mật khẩu phải có ít nhất 6 ký tự."
            }), 400

        conn = sqlite3.connect(r"D:\NCT-CSA34-HB-HB\LifeHub\database\LifeHub.db")
        cursor = conn.cursor()

        cursor.execute(
            "SELECT 1 FROM User WHERE username=?",
            (username,)
        )

        if cursor.fetchone():
            conn.close()
            return jsonify({
                "success": False,
                "message": "Tên đăng nhập đã tồn tại."
            }), 409

        cursor.execute(
            "SELECT 1 FROM User WHERE email=?",
            (email,)
        )

        if cursor.fetchone():
            conn.close()
            return jsonify({
                "success": False,
                "message": "Email đã tồn tại."
            }), 409

        password_hash = generate_password_hash(password)

        cursor.execute("""
            INSERT INTO User
            (
                firstname,
                lastname,
                username,
                email,
                password,
                created_at
            )
            VALUES (?, ?, ?, ?, ?, ?)
        """, (
            firstname,
            lastname,
            username,
            email,
            password_hash,
            datetime.now().isoformat()
        ))

        conn.commit()

        uid = cursor.lastrowid

        conn.close()

        return jsonify({
            "success": True,
            "uid": uid,
            "username": username,
            "email": email,
            "message": "Đăng ký thành công."
            
        }), 201

    except Exception as e:
        print(e)
        return jsonify({
            "success": False,
            "message": "Đã xảy ra lỗi máy chủ."
        }), 500