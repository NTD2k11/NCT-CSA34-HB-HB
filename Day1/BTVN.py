# bài 1
# class Employee:
#     def __init__(self, name, job):
#         self.name = name;
#         self.job = job;

#     def say_hi(self):
#         print("Hi, my name is ", self.name)
#     def tell_position(self):
#         print("I am a ", self.job)

# john = Employee("John", "Software Engineer")
# john.say_hi()
# john.tell_position()
# Bài 2

# class rectangle:
#     def __init__(self, height, width):
#         self.width = width
#         self.height = height
        
    
#     def acreage(self):
#         area = self.height * self.width
#         print("Area: ", area)
#     def perimeter(self):
#         pr = 2*(self.height + self.width)
#         print("Perimeter: ", pr)
    
# class circle:
#     def __init__(self, radius):
#         self.radius = radius
    
#     def area(self):
#         area = 3.14 * (self.radius**2)
#         print("Area: ", area)
#     def perimeter(self):
#         pr = 2 * 3.14 * self.radius
#         print("Perimeter: ", pr)
# while True:
#     choice = input("Input your Shape (rectangle|circle): ")
#     if choice == "rectangle":
#         rect = rectangle(int(input("Input your width value: ")), int(input("Input your length value: ")))
#         rect.acreage()
#         rect.perimeter()
#     elif choice == "circle":
#         circ = circle(int(input("Input you radius value: ")))
#         circ.area()
#         circ.perimeter()
#     else:
#         print("Invalid!")

# Bài 3

# from datetime import datetime


# class CustomDate:
#     def __init__(self):
#         now = datetime.now()
#         self.day = now.day
#         self.month = now.month
#         self.year = now.year
#         self.hour = now.hour
#         self.minute = now.minute
#         self.second = now.second

#     def get_date(self):
#         print(f"{self.day:02}/{self.month:02d}/{self.year:04d}")
#     def get_time(self):
#         print(f"{self.hour:02d}:{self.minute:02d}:{self.second:02d}")
# now = CustomDate()
# now.get_date()
# now.get_time()

# Bài 4

from datetime import datetime


class  DateHandler:
    def __init__(self, date1, date2):
        self.date1 = date1
        self.date2 = date2
    
    def format_date(self, date):
        return date.strftime("%d/%m/%Y")
    
    def get_days_between(self):
        return (self.date2 - self.date1).days
    
start_date = datetime(2021, 1, 1)
end_date = datetime(2022, 1, 1)
dh = DateHandler(start_date, end_date)
print("Start:", dh.format_date(start_date))
print("End:", dh.format_date(end_date))
print("Days between:",
dh.get_days_between())