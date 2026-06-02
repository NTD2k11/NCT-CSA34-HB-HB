import sqlite3

conn =  sqlite3.connect("D:\\NCT-CSA34-HB-HB\\Day3\\homework_database.db")
print(conn)
cursor = conn.cursor()

# cursor.execute("""
#     Create table users(
#         id number,
#         name varchar(255),    
#         password varchar(255)       
#     )
# """)

listUser = [
    {}
]

data = [
    {"id": 4, "name": "Alice"},
    {"id": 5, "name": "Bob"},
    {"id": 6, "name": "Charlie"},
    {"id": 7, "name": "David"},
    {"id": 8, "name": "Emma"}
]

values = ""

for i in range(0, len(data)):
    if i < len(data) - 1:
        values = values + f"({data[i]["id"]}, '{data[i]["name"]}')" + ","
    else:
        values = values + f"({data[i]["id"]}, '{data[i]["name"]}')"

# print(values)

# THÊM dữ liệu
# cursor.execute("""Insert into users (id, name) 
#                values 
#                (2, 'Long'), 
#                (3, 'Tung Anh')
#             """)

# cursor.execute(f"""Insert into users (id, name) values {values}""")

#Lấy ra dữ liệu trong SQL thông qua Python
cursor.execute("Select * from users")
output = cursor.fetchall()
# print(output)
user_name = input("Inputname: ")
for i in output:
    if i[1] == user_name:
        password_user = input(f"enter password for user {user_name}: ")
        # cursor.execute(f"""Insert into (password) values {password_user} """)
        cursor.execute(f"""Update users set password = '{password_user}' where  name = '{user_name}'""")



conn.commit()
conn.close()

# Thêm 1 cột password
# Dùng input để định nghĩa password cho 1 user có name nằm trong bảng