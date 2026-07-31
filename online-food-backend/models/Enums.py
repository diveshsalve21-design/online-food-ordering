<<<<<<< HEAD
from enum import Enum 

class UserRole (str,Enum):
    CUSTOMER = "Customer"
    ADMIN = "Admin"
    OWNER = "Owner"

class DiscountType(str, Enum):
    PERCENTAGE = "Percentage"
    FIXED = "Fixed"
    BUY_ONE_GET_ONE = "Buy One Get One"
    FREE_DELIVERY = "Free Delivery"

class OrderStatus(str, Enum):
    PENDING = "Pending"
    ACCEPTED = "Accepted"
    PREPARING = "Preparing"
    READY = "Ready"
    OUT_FOR_DELIVERY = "Out For Delivery"
    DELIVERED = "Delivered"
    CANCELLED = "Cancelled"

class PaymentMethod(str, Enum):
    CARD = "Card"
    UPI = "UPI"
    NET_BANKING = "Net Banking"
    WALLET = "Wallet"
    CASH_ON_DELIVERY = "Cash On Delivery"

class PaymentStatus(str, Enum):
    PENDING = "Pending"
    SUCCESS = "Success"
    FAILED = "Failed"
    REFUNDED = "Refunded"

class DeliveryStatus(str, Enum):
    ASSIGNED = "Assigned"
    PICKED_UP = "Picked Up"
    ON_THE_WAY = "On The Way"
    DELIVERED = "Delivered"
    FAILED = "Failed"

class VehicleType(str, Enum):
    BIKE = "Bike"
    SCOOTER = "Scooter"
    BICYCLE = "Bicycle"
    CAR = "Car"
=======
from enum import Enum

class UserRole(Enum):
    ADMIN = "admin"
    CUSTOMER = "customer"
    OWNER = "owner"
>>>>>>> 8875ae0 (Save my local changes)
