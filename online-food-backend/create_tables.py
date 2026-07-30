from database import Base, engine
from models.users import User
from models.address import Address
from models.restaurants import Restaurant
from models.menu_categories import MenuCategory 
from models.menu_items import MenuItem
from models.carts import Cart
Base.metadata.create_all(bind=engine)

print("Tables created successfully!")

