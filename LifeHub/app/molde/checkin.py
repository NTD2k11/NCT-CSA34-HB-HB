

from flask import Blueprint, request, jsonify
import sqlite3
import traceback
from datetime import datetime

checkin_bp = Blueprint("checkin", __name__)

DB_PATH = r"D:\NCT-CSA34-HB-HB\LifeHub\database\LifeHub.db"


# ======================================
# CHECK IN
# ======================================
@checkin_bp.route("/checkin/add", methods=["POST"])
def add_checkin():

    try:

        data = request.get_json()

        uid = data["uid"]
        habit_id = data["habit_id"]
        progress = int(data["progress"])

        today = datetime.now().strftime("%Y-%m-%d")

        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row

        cursor = conn.cursor()

        # --------------------------
        # Lấy goal của Habit
        # --------------------------
        cursor.execute("""

            SELECT goal

            FROM Habit

            WHERE habit_id=?

        """,(habit_id,))

        habit = cursor.fetchone()

        if habit is None:

            conn.close()

            return jsonify({

                "success":False,

                "message":"Habit không tồn tại."

            }),404

        goal = habit["goal"]

        completed = 1 if progress >= goal else 0

        # --------------------------
        # Kiểm tra hôm nay đã check chưa
        # --------------------------
        cursor.execute("""

            SELECT checkin_id

            FROM CheckIn

            WHERE habit_id=?

            AND uid=?

            AND checkin_date=?

        """,(habit_id,uid,today))

        row = cursor.fetchone()

        # --------------------------
        # UPDATE
        # --------------------------
        if row:

            cursor.execute("""

                UPDATE CheckIn

                SET

                    progress=?,

                    completed=?

                WHERE checkin_id=?

            """,(

                progress,

                completed,

                row["checkin_id"]

            ))

        # --------------------------
        # INSERT
        # --------------------------
        else:

            cursor.execute("""

                INSERT INTO CheckIn
                (

                    habit_id,

                    uid,

                    checkin_date,

                    progress,

                    completed

                )

                VALUES(?,?,?,?,?)

            """,(

                habit_id,

                uid,

                today,

                progress,

                completed

            ))

        conn.commit()

        conn.close()

        return jsonify({

            "success":True,

            "message":"Check In thành công.",

            "completed":bool(completed)

        })

    except Exception as e:

        traceback.print_exc()

        return jsonify({

            "success":False,

            "message":str(e)

        }),500