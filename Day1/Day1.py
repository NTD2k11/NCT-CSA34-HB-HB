# class Vehicle:
#     # thuộc tính: wheels, name, color, type, slots, speed, ...
#     def __init__(self, wheels, name, color, type, slots, speed):
#         self.name = name
#         self.color = color
#         self.type = type
#         self.wheels = wheels
#         self.slots = slots
#         self.speed = speed

#     # Chức năng:
#     def information(self):
#         print("Name", self.name)
#         print("wheels", str(self.wheels))
#         print("color", self.color)
#         print("type", self.type)
#         print("slots", str(self.slots))
#         print("speed", str(self.speed))

#     def v(self):
#         v = str(self.wheels) * str(self.slots) + str(self.speed)
#         print("v của phương tiện là:" + v)

# # Tạo những object từ trong class

# car = Vehicle("Mercedes", "White", "car", 4, 4, 300)
# bike = Vehicle("BMW", "Black", "bicycle", 2, 2, 10)

# # Cách để object truy cập vào lấy ra giá trị của các thuộc tính trong class
# # print("Vehicle's name" + car.name)
# # print("Vehicle's type" + car.type)
# # print("Vehicle's wheels" + str( car.wheels))
# # print("Vehicle's color" + car.color)
# # print("Vehicle's slots" + str(car.slots))
# # print("Vehicle's speeds" + str(car.speed))

# car.v()

# # viêt 1 hàm tính v của xe: CT => wheels x slots + speed, hàm này trả về v của xe


class Descriptions:
    def __init__(self, name, lane, role, HP, mana, intrinsic, Q, W, E, R, items):
        self.name = name
        self.lane = lane
        self.role = role
        self.HP = HP
        self.mana = mana
        self.intrinsic = intrinsic
        self.Q = Q
        self.W = W
        self.E = E
        self.R = R
        self.items = items
    
    
    def information(self):
        print("Name", self.name)
        print("lane", self.lane)
        print("rope", self.role)
        print("HP", str(self.HP))
        print("mana", str(self.mana))
        print("intrinsic", self.intrinsic)
        print("items", self.items)

    def skill_Q(self):
        print("Q", self.Q)
    def skill_W(self):
        print("W", self.W)
    def skill_E(self):
        print("E", self.E)
    def skill_R(self):
        print("R", self.R)

    
    def add_items(self):
        self.items = []
        a = input("Enter item: ")
        b = input("Enter item: ")
        c = input("Enter item: ")
        d = input("Enter item: ")
        e = input("Enter item: ")
        f = input("Enter item: ")
        self.items.append(a,b,c,d,e,f)
        print("Add items success!")



