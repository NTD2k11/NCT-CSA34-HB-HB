from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
import sqlite3

login_bp = Blueprint("login", __name__)

@login_bp.route("/login", methods=["POST"])
def login():

    try:

        data = request.get_json()

        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return jsonify({
                "success": False,
                "message": "Vui lòng nhập đầy đủ thông tin."
            }), 400

        conn = sqlite3.connect(r"D:\NCT-CSA34-HB-HB\LifeHub\database\LifeHub.db")
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()

        # Có thể đăng nhập bằng username hoặc email
        cursor.execute("""
            SELECT *
            FROM User
            WHERE username = ?
               OR email = ?
        """, (username, username))

        user = cursor.fetchone()

        conn.close()

        if user is None:
            return jsonify({
                "success": False,
                "message": "Tài khoản không tồn tại."
            }), 404

        if not check_password_hash(user["password"], password):
            return jsonify({
                "success": False,
                "message": "Mật khẩu không chính xác."
            }), 401

        return jsonify({
            "success": True,
            "uid": user["uid"],
            "firstname": user["firstname"],
            "lastname": user["lastname"],
            "username": user["username"],
            "email": user["email"],
            "message": "Đăng nhập thành công."
        }), 200

    except Exception as e:

        print(e)

        return jsonify({
            "success": False,
            "message": "Đã xảy ra lỗi máy chủ."
        }), 500