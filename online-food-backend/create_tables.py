from database import Base, engine
from models.users import User
from models.coupon import Coupon
from models.address import Address
from models.restaurants import Restaurant
from models.menu_categories import MenuCategory 
from models.menu_items import MenuItem
from models.carts import Cart
from models.Item_Addons import ItemAddon
from models.item_Variant import ItemVariant
from models.Carts_Items import CartItem
from models.Order_items import OrderItem
from models.Orders import Order
from models.Reviews import Review
Base.metadata.create_all(bind=engine)

print("Tables created successfully!")

