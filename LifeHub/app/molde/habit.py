from flask import Blueprint, request, jsonify
import sqlite3
import traceback

habit_bp = Blueprint("habit", __name__)

DB_PATH = r"D:\NCT-CSA34-HB-HB\LifeHub\database\LifeHub.db"




@habit_bp.route("/expense/list/<int:uid>", methods=["GET"])
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

        habit = []

        for row in rows:

            habit.append({

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

            "habit": habit

        })

    except Exception:

        traceback.print_exc()

        return jsonify({

            "success": False,

            "message": "Không lấy được danh sách."

        }), 500
    