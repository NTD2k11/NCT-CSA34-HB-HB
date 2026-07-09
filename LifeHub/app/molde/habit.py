from flask import Blueprint, request, jsonify
import sqlite3
import traceback



habit_bp = Blueprint("habit", __name__)

DB_PATH = r"D:\NCT-CSA34-HB-HB\LifeHub\database\LifeHub.db"



from datetime import timedelta

@habit_bp.route("/habit/add", methods=["POST"])
def add_habit():

    try:

        data = request.get_json()

        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO Habit
            (
                uid,
                habit_name,
                category,
                goal,
                unit,
                frequency,
                start_date,
                color,
                note,
                status,
                created_at
            )

            VALUES
            (?,?,?,?,?,?,?,?,?,?,?)
        """,

        (

            data["uid"],

            data["habit_name"],

            data["category"],

            data["goal"],

            data["unit"],

            data["frequency"],

            data["start_date"],

            data["color"],

            data["note"],

            1,

            datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        ))

        conn.commit()

        conn.close()

        return jsonify({

            "success":True,

            "message":"Đã thêm thói quen."

        })

    except Exception as e:

        traceback.print_exc()

        return jsonify({

            "success":False,

            "message":str(e)

        }),500
    
@habit_bp.route("/habit/list/<int:uid>")
def get_habits(uid):

    conn=sqlite3.connect(DB_PATH)

    conn.row_factory=sqlite3.Row

    cursor=conn.cursor()

    cursor.execute("""

        SELECT *

        FROM Habit

        WHERE uid=?

        ORDER BY habit_id DESC

    """,(uid,))

    rows=cursor.fetchall()

    conn.close()

    habits=[]

    for row in rows:

        habits.append(dict(row))

    return jsonify({

        "success":True,

        "habits":habits

    })




from datetime import datetime

# ==============================
# DANH SÁCH HABIT
# ==============================
@habit_bp.route("/habit/list/<int:uid>")
def get_habits(uid):

    try:

        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row

        cursor = conn.cursor()

        # Lấy tất cả Habit của user
        cursor.execute("""
            SELECT *
            FROM Habit
            WHERE uid = ?
            ORDER BY habit_id DESC
        """, (uid,))

        habits = cursor.fetchall()

        today = datetime.now().strftime("%Y-%m-%d")

        ICON = {

            "Học tập": "📚",
            "Sức khỏe": "💪",
            "Thể thao": "🏃",
            "Ăn uống": "🍎",
            "Đọc sách": "📖",
            "Thiền": "🧘",
            "Làm việc": "💻"

        }

        result = []

        for habit in habits:

            habit = dict(habit)

            # --------------------------
            # CheckIn hôm nay
            # --------------------------
            cursor.execute("""

                SELECT
                    progress,
                    completed

                FROM CheckIn

                WHERE habit_id = ?
                AND uid = ?
                AND checkin_date = ?

            """, (

                habit["habit_id"],
                uid,
                today

            ))

            check = cursor.fetchone()

            if check:

                habit["progress"] = check["progress"]

                habit["completed"] = bool(check["completed"])

            else:

                habit["progress"] = 0

                habit["completed"] = False

            # --------------------------
            # Icon
            # --------------------------
            habit["icon"] = ICON.get(

                habit["category"],

                "🌱"

            )


            # --------------------------
            # TÍNH STREAK
            # --------------------------

            cursor.execute("""

                SELECT checkin_date

                FROM CheckIn

                WHERE habit_id = ?

                AND uid = ?

                AND completed = 1

                ORDER BY checkin_date DESC

            """,(habit["habit_id"], uid))

            dates = cursor.fetchall()

            streak = 0

            if dates:

                current = datetime.now().date()

                # Nếu hôm nay chưa hoàn thành
                if dates[0]["checkin_date"] != current.strftime("%Y-%m-%d"):

                    current = current - timedelta(days=1)

                for d in dates:

                    check_date = datetime.strptime(

                        d["checkin_date"],

                        "%Y-%m-%d"

                    ).date()

                    if check_date == current:

                        streak += 1

                        from datetime import timedelta

                        current = current - timedelta(days=1)

                    else:

                        break

            habit["streak"] = streak

            result.append(habit)

        conn.close()

        return jsonify({

            "success": True,

            "habits": result

        })

    except Exception as e:

        traceback.print_exc()

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500



@habit_bp.route("/habit/update/<int:habit_id>",methods=["PUT"])
def update_habit(habit_id):

    data=request.get_json()

    conn=sqlite3.connect(DB_PATH)

    cursor=conn.cursor()

    cursor.execute("""

        UPDATE Habit

        SET

            habit_name=?,

            category=?,

            goal=?,

            unit=?,

            frequency=?,

            start_date=?,

            color=?,

            note=?

        WHERE habit_id=?

    """,(

        data["habit_name"],

        data["category"],

        data["goal"],

        data["unit"],

        data["frequency"],

        data["start_date"],

        data["color"],

        data["note"],

        habit_id

    ))

    conn.commit()

    conn.close()

    return jsonify({

        "success":True,

        "message":"Đã cập nhật."

    })





@habit_bp.route("/habit/delete/<int:habit_id>",methods=["DELETE"])
def delete_habit(habit_id):

    conn=sqlite3.connect(DB_PATH)

    cursor=conn.cursor()

    cursor.execute("""

        DELETE

        FROM Habit

        WHERE habit_id=?

    """,(habit_id,))

    conn.commit()

    conn.close()

    return jsonify({

        "success":True,

        "message":"Đã xóa."

    })