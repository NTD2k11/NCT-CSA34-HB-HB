
from Day1 import Vehicle
    
# kế thừa có thể chứa toàn bộ thuộc tính và chức năng của class cha

class Employee:
    def __init__(self, age  , position):
        self.age = age
        self.position = position

class Car(Vehicle):
    def __init__(self, name, color, type, wheels, slots, speed, items, age, position, fuel, price):
        Vehicle.__init__(self, name, color, type, wheels, slots, speed, items)
        Employee.__init__(self, age, position)

        self.fuel = fuel 
        self.price = price
    
    # Information
    def information(self):
        print("Vehicle's fuel: " , self.fuel)
        print("Vehicle's price: " , self.price)
        super().information()

    # __str__: in ra object ở dạng string
    def __str__(self):
        return f"Name: {self.name}"
    
    def __add__(self, object):
        return self.age + object.age

car1 = Car("Volvo", "red", "super-car", 4, 4, 400, [], 10, "leader", 1000, 3000)
car2 = Car("Toyota", "black", "normal", 5, 3, 200, [], 30, "middle", 2000, 1500)

print(car1 + car2)
# car.information()