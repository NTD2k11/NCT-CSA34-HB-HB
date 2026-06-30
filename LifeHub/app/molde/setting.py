from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import sqlite3
import os

setting_bp = Blueprint("setting", __name__)

DB_PATH = r"D:\NCT-CSA34-HB-HB\LifeHub\database\LifeHub.db"

UPLOAD_FOLDER = r"D:\NCT-CSA34-HB-HB\LifeHub\app\static\uploads\avatar"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# =====================================================
# LẤY THÔNG TIN NGƯỜI DÙNG
# GET /setting/<uid>
# =====================================================

@setting_bp.route("/setting/<int:uid>", methods=["GET"])
def get_setting(uid):

    try:

        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()  

        cursor.execute("""

            SELECT *

            FROM User

            WHERE uid=?

        """, (uid,))

        user = cursor.fetchone()

        if not user:

            conn.close()

            return jsonify({

                "success": False,

                "message": "Không tìm thấy người dùng."

            }),404

        cursor.execute("SELECT COUNT(*) FROM Habit WHERE uid=?", (uid,))
        habit = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM Meal WHERE uid=?", (uid,))
        meal = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM Expense WHERE uid=?", (uid,))
        expense = cursor.fetchone()[0]

        conn.close()

        return jsonify({

            "success": True,

            "uid": user["uid"],

            "firstname": user["firstname"],

            "lastname": user["lastname"],

            "username": user["username"],

            "email": user["email"],

            "avatar": user["avatar"] if user["avatar"] else "",

            "created_at": user["created_at"],

            "habit": habit,

            "meal": meal,

            "expense": expense

        })

    except Exception as e:

        print(e)

        return jsonify({

            "success":False,

            "message":str(e)

        }),500


# =====================================================
# UPDATE PROFILE
# PUT /update-profile
# =====================================================

@setting_bp.route("/update-profile", methods=["PUT"])
def update_profile():

    try:

        data=request.get_json()

        uid=data.get("uid")
        firstname=data.get("firstname")
        lastname=data.get("lastname")
        username=data.get("username")

        conn=sqlite3.connect(DB_PATH)

        cursor=conn.cursor()

        cursor.execute("""

            UPDATE User

            SET

            firstname=?,

            lastname=?,

            username=?

            WHERE uid=?

        """,

        (

            firstname,

            lastname,

            username,

            uid

        ))

        conn.commit()

        conn.close()

        return jsonify({

            "success":True,

            "message":"Cập nhật thành công."

        })

    except Exception as e:

        print(e)

        return jsonify({

            "success":False,

            "message":str(e)

        }),500


# =====================================================
# UPLOAD AVATAR
# POST /upload-avatar
# =====================================================

@setting_bp.route("/upload-avatar", methods=["POST"])
def upload_avatar():

    try:

        uid=request.form.get("uid")

        file=request.files.get("avatar")

        if file is None:

            return jsonify({

                "success":False,

                "message":"Chưa chọn ảnh."

            }),400

        ext=file.filename.split(".")[-1]

        filename=f"{uid}.{ext}"

        filename=secure_filename(filename)

        save_path=os.path.join(

            UPLOAD_FOLDER,

            filename

        )

        file.save(save_path)

        avatar_path=f"/static/uploads/avatar/{filename}"

        conn=sqlite3.connect(DB_PATH)

        cursor=conn.cursor()

        cursor.execute("""

            UPDATE User

            SET avatar=?

            WHERE uid=?

        """,

        (

            avatar_path,

            uid

        ))

        conn.commit()

        conn.close()

        return jsonify({

            "success":True,

            "avatar":avatar_path,

            "message":"Đổi ảnh đại diện thành công."

        })

    except Exception as e:

        print(e)

        return jsonify({

            "success":False,

            "message":str(e)

        }),500


# =====================================================
# ĐỔI MẬT KHẨU
# PUT /change-password
# =====================================================

@setting_bp.route("/change-password", methods=["PUT"])
def change_password():

    try:

        data=request.get_json()

        uid=data.get("uid")

        old_password=data.get("old_password")

        new_password=data.get("new_password")

        conn=sqlite3.connect(DB_PATH)

        conn.row_factory=sqlite3.Row

        cursor=conn.cursor()

        cursor.execute("""

            SELECT password

            FROM User

            WHERE uid=?

        """,(uid,))

        user=cursor.fetchone()

        if not user:

            conn.close()

            return jsonify({

                "success":False,

                "message":"Không tìm thấy tài khoản."

            }),404

        if not check_password_hash(

            user["password"],

            old_password

        ):

            conn.close()

            return jsonify({

                "success":False,

                "message":"Mật khẩu cũ không đúng."

            }),401

        new_hash=generate_password_hash(

            new_password

        )

        cursor.execute("""

            UPDATE User

            SET password=?

            WHERE uid=?

        """,

        (

            new_hash,

            uid

        ))

        conn.commit()

        conn.close()

        return jsonify({

            "success":True,

            "message":"Đổi mật khẩu thành công."

        })

    except Exception as e:

        print(e)

        return jsonify({

            "success":False,

            "message":str(e)

        }),500