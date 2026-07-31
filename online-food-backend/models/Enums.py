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