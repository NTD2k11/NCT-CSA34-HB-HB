# Bài 1
# class rectangle:
#     def __init__(self, height, width):
#         self.width = width
#         self.height = height
        
#     def __str__(self):
#         return f"Rectangle object with height = {self.height} width = {self.width}"
    
# rect = rectangle(2, 1)
# print(rect)

#Bài 2
# class MathList:
#     def __init__(self, values):
#         self.values = values
    
#     def __str__(self):
#         return str(self.values)
    
#     def __add__(self, other):
#         new_list = []
#         for i in self.values:
#             new_list.append(i + other)
#         return MathList(new_list)
    
#     def __sub_(self, other):
#         new_list = []
#         for i in self.values:
#             new_list.append(i - other)
#         return MathList(new_list)

# m_list= MathList([1, 2, 3, 4, 5])
# print(m_list)
# m_list += 2
# print(m_list)

# Bài 3

# class Square:

#     def __init__(self, width):
#         self.width = width

#     def cal_area(self):
#         area =self.width ** 2
#         print("Square area:", area)
    
# square = Square(2)
# square.cal_area()

# class Cube(Square):
#     def __init__(self, width):
#         super().__init__(width)
    
#     def cal_area(self):
#         return (self.width ** 2) * 6
    
#     def cal_volume(self):
#         return self.width ** 3

# cube = Cube(2)
# print('Cube area:', cube.cal_area())
# print('Cube volume:', cube.cal_volume())

# Bài 4



class User:
    def __init__(self, name, password):
        self.name = name
        self.password = password

    def welcome(self):
        return f"Welcome, {self.name}"

    def check_password(password):
        if password == User(password):
            return "True"
        else:
            return "False"


user = User('mindx', '12345')
user.welcome()
print(user.check_password('1234'))