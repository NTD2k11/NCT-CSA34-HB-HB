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



@expenses_bp.route("/expense/list/<int:uid>", methods=["GET"])
def get_expense_list(uid):

    try:

        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row

        cursor = conn.cursor()

        cursor.execute("""
            SELECT
                expense_id,
                amount,
                category,
                title,
                method,
                note,
                expense_date
            FROM Expense
            WHERE uid = ?
            ORDER BY expense_date DESC, expense_id DESC
        """, (uid,))

        rows = cursor.fetchall()

        conn.close()

        expenses = []

        for row in rows:

            expenses.append({

                "expense_id": row["expense_id"],

                "amount": row["amount"],

                "category": row["category"],

                "title": row["title"],

                "method": row["method"],

                "note": row["note"],

                "date": row["expense_date"],

                # Có thể sửa sau nếu bạn lưu giờ riêng
                "time": "",

                # Tạm thời
                "type": "Chi tiêu",

                # Icon theo category
                "icon": "💰",

                "color": "#53b76c"

            })

        return jsonify({

            "success": True,

            "expenses": expenses

        })

    except Exception:

        traceback.print_exc()

        return jsonify({

            "success": False,

            "message": "Không lấy được danh sách."

        }), 500
    



@expenses_bp.route("/expense/delete/<int:expense_id>", methods=["DELETE"])
def delete_expense(expense_id):

    try:

        conn = sqlite3.connect(DB_PATH)

        cursor = conn.cursor()

        cursor.execute(
            "DELETE FROM Expense WHERE expense_id=?",
            (expense_id,)
        )

        conn.commit()

        conn.close()

        return jsonify({

            "success": True,

            "message": "Đã xóa giao dịch."

        })

    except Exception:

        traceback.print_exc()

        return jsonify({

            "success": False,

            "message": "Không thể xóa."

        }),500
    
@expenses_bp.route("/expense/<int:expense_id>", methods=["GET"])
def get_expense(expense_id):

    try:

        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row

        cursor = conn.cursor()

        cursor.execute("""
            SELECT *
            FROM Expense
            WHERE expense_id=?
        """, (expense_id,))

        row = cursor.fetchone()

        conn.close()

        if row is None:

            return jsonify({
                "success": False,
                "message": "Không tìm thấy giao dịch."
            }),404

        return jsonify({

            "success": True,

            "expense_id": row["expense_id"],

            "amount": row["amount"],

            "category": row["category"],

            "title": row["title"],

            "method": row["method"],

            "note": row["note"],

            "expense_date": row["expense_date"]

        })

    except Exception:

        traceback.print_exc()

        return jsonify({
            "success": False
        }),500