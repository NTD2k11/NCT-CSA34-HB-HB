from flask import Blueprint, request, jsonify
import sqlite3
import traceback


expenses_bp = Blueprint("expenses", __name__)

DB_PATH = r"D:\NCT-CSA34-HB-HB\LifeHub\database\LifeHub.db"





from datetime import datetime
import traceback

@expenses_bp.route("/expense/add", methods=["POST"])
def add_expense():

    try:

        data = request.get_json()

        print("========== DATA ==========")
        print(data)

        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO Expense
            (
                uid,
                amount,
                category,
                title,
                method,
                note,
                expense_date,
                created_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            int(data["uid"]),
            float(data["amount"]),
            data["category"],
            data["title"],
            data["method"],
            data.get("note", ""),
            data["expense_date"],
            datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        ))

        conn.commit()

        print("Insert thành công")

        conn.close()

        return jsonify({
            "success": True,
            "message": "Đã thêm giao dịch"
        })

    except Exception:

        traceback.print_exc()

        return jsonify({
            "success": False
        }),500


@expenses_bp.route("/user/<int:uid>")
def get_user(uid):

    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            uid,
            username,
            email,
            firstname,  
            lastname,
            avatar
        FROM User
        WHERE uid = ?
    """, (uid,))

    row = cursor.fetchone()

    conn.close()

    if row is None:

        return jsonify({
            "success": False,
            "message": "Không tìm thấy người dùng"
        }), 404

    return jsonify({

        "success": True,

        "uid": row["uid"],

        "username": row["username"],

        "email": row["email"],

        "firstname": row["firstname"],

        "lastname": row["lastname"],

        "avatar": f"http://127.0.0.1:5000/static/uploads/avatar/{row['uid']}.jpg"

    })