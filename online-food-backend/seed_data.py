"""
Seed script for populating SQLite database with multi-restaurant data
"""
import sys
import os
from uuid import uuid4
from datetime import datetime, timedelta

# Append current dir to sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import engine, Base
from sqlalchemy.orm import Session
import models  # Register every SQLAlchemy model before creating tables.
from models.users import User
from models.Enums import UserRole, OrderStatus, PaymentStatus, PaymentMethod
from models.restaurants import Restaurant
from models.menu_categories import MenuCategory
from models.menu_items import MenuItem
from models.address import Address
from models.carts import Cart
from models.Orders import Order
from models.Order_items import OrderItem
from services.auth_service import get_password_hash

def seed_database():
    print("Recreating database tables...")
    Base.metadata.create_all(bind=engine)

    db = Session(bind=engine)
    try:
        # Check if restaurants already seeded with menu items
        if db.query(Restaurant).count() >= 8 and db.query(MenuItem).count() > 0:
            print("Database already fully seeded with 8 restaurants and menu items!")
            return

        print("Seeding initial users...")
        def get_or_create_user(email, full_name, phone, password, role):
            u = db.query(User).filter(User.email == email).first()
            if not u:
                u = User(
                    id=uuid4(),
                    full_name=full_name,
                    email=email,
                    phone=phone,
                    password_hash=get_password_hash(password),
                    role=role,
                    is_active=True
                )
                db.add(u)
                db.commit()
            return u

        admin_user = get_or_create_user("admin@foodhub.com", "Platform Admin", "+1999888777", "admin123", UserRole.ADMIN)
        customer_user = get_or_create_user("customer@foodhub.com", "John Customer", "+1987654321", "customer123", UserRole.CUSTOMER)
        owner_spice = get_or_create_user("spicehub@owner.com", "Rajesh Sharma (Spice Hub Owner)", "+1911111111", "owner123", UserRole.OWNER)
        owner_pizza = get_or_create_user("pizzapalace@owner.com", "Marco Rossi (Pizza Palace Owner)", "+1922222222", "owner123", UserRole.OWNER)
        owner_burger = get_or_create_user("burgerhouse@owner.com", "Sam Burger (Burger House Owner)", "+1933333333", "owner123", UserRole.OWNER)
        owner_tandoori = get_or_create_user("tandoori@owner.com", "Khan Sahib (Tandoori Junction Owner)", "+1944444444", "owner123", UserRole.OWNER)
        owner_south = get_or_create_user("southspice@owner.com", "Venkatesh Iyer (South Spice Owner)", "+1955555555", "owner123", UserRole.OWNER)
        owner_sweet = get_or_create_user("sweettreats@owner.com", "Anita Sweet (Sweet Treats Owner)", "+1966666666", "owner123", UserRole.OWNER)
        owner_coastal = get_or_create_user("coastalcurry@owner.com", "Meera Naik (Coastal Curry House Owner)", "+1977777777", "owner123", UserRole.OWNER)
        owner_bombay = get_or_create_user("bombaybistro@owner.com", "Arjun Mehta (Bombay Street Bistro Owner)", "+1988888888", "owner123", UserRole.OWNER)

        db.commit()

        # Add default address for customer
        cust_address = Address(
            id=uuid4(),
            user_id=customer_user.id,
            address="123 Foodie Street, Apt 4B",
            city="Tech City",
            state="California",
            pincode="90210",
            address_type="Home",
            is_default=True
        )
        db.add(cust_address)
        db.commit()

        now = datetime.utcnow()
        open_time = now
        close_time = now + timedelta(hours=14)

        def get_or_create_restaurant(owner_id, name, cuisine, license_num, rating, img, cover, desc, addr, phone, time_str, fee, min_amt):
            r = db.query(Restaurant).filter(Restaurant.fassai_license_Number == license_num).first()
            if not r:
                r = Restaurant(
                    id=uuid4(),
                    owner_id=owner_id,
                    name=name,
                    cuisine=cuisine,
                    fassai_license_Number=license_num,
                    rating=rating,
                    is_active=True,
                    open_at=open_time,
                    close_at=close_time,
                    image_url=img,
                    cover_image=cover,
                    description=desc,
                    address=addr,
                    phone=phone,
                    delivery_time=time_str,
                    delivery_fee=fee,
                    min_order_amount=min_amt
                )
                db.add(r)
                db.commit()
            return r

        print("Seeding 8 restaurants...")
        rest_spice = get_or_create_restaurant(owner_spice.id, "Spice Hub", "Indian, North Indian, Chinese", "FSSAI-10001", 4.8, "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600", "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200", "Authentic North Indian curry, aromatic biryani, and Indo-Chinese delicacies made fresh with organic spices.", "45 Curry Lane, Downtown", "+1 555-0101", "25-35 min", 2.99, 12.00)
        rest_pizza = get_or_create_restaurant(owner_pizza.id, "Pizza Palace", "Pizza, Italian, Fast Food", "FSSAI-10002", 4.7, "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600", "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200", "Hand-tossed wood-fired pizzas with artisanal cheeses and imported Italian tomato sauce.", "88 Italian Plaza, Westside", "+1 555-0102", "20-30 min", 1.99, 10.00)
        rest_burger = get_or_create_restaurant(owner_burger.id, "Burger House", "Burgers, Fast Food", "FSSAI-10003", 4.6, "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600", "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1200", "Gourmet smash burgers, crispy chicken sandwiches, and golden hand-cut fries.", "12 Burger Boulevard, Central District", "+1 555-0103", "15-25 min", 2.49, 8.00)
        rest_tandoori = get_or_create_restaurant(owner_tandoori.id, "Tandoori Junction", "Mughlai, Tandoor, North Indian", "FSSAI-10004", 4.9, "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600", "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200", "Sizzling tandoori kebabs, rich buttery gravies, and royal Mughlai breads baked in clay ovens.", "77 Royal Street, East End", "+1 555-0104", "30-40 min", 3.49, 15.00)
        rest_south = get_or_create_restaurant(owner_south.id, "South Spice", "South Indian", "FSSAI-10005", 4.8, "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=600", "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=1200", "Crispy masala dosas, fluffy steamed idlis, spicy chettinad curries, and piping hot filter coffee.", "104 Coconut Grove, South Avenue", "+1 555-0105", "20-30 min", 1.99, 10.00)
        rest_sweet = get_or_create_restaurant(owner_sweet.id, "Sweet Treats", "Desserts, Cakes, Ice Cream", "FSSAI-10006", 4.9, "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600", "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200", "Handcrafted cakes, warm chocolate brownies, gelato, waffles, and traditional Indian sweets.", "9 Baker's Square, Midtown", "+1 555-0106", "15-25 min", 1.49, 7.00)
        rest_coastal = get_or_create_restaurant(owner_coastal.id, "Coastal Curry House", "Seafood, Konkan, Indian", "FSSAI-10007", 4.7, "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600", "https://images.unsplash.com/photo-1547592180-85f173990554?w=1200", "Konkan seafood, coconut curries, and fresh coastal favourites.", "18 Seaside Road, Harbour View", "+1 555-0107", "25-35 min", 2.99, 14.00)
        rest_bombay = get_or_create_restaurant(owner_bombay.id, "Bombay Street Bistro", "Street Food, Indian", "FSSAI-10008", 4.5, "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600", "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200", "Mumbai street-food classics, served hot with bold chutneys and spices.", "63 Market Lane, Central District", "+1 555-0108", "15-25 min", 1.49, 8.00)

        db.commit()

        print("Seeding menu categories and items...")
        # Categories & Items helper
        def add_cat(rest_id, name, order):
            c = MenuCategory(id=uuid4(), restaurant_id=rest_id, name=name, display_order=order)
            db.add(c)
            return c.id

        def add_item(rest_id, cat_id, name, price, veg, desc, img):
            item = MenuItem(
                id=uuid4(),
                restaurant_id=rest_id,
                category_id=cat_id,
                name=name,
                price=price,
                is_vegetarian=veg,
                description=desc,
                image_url=img,
                is_available=True
            )
            db.add(item)
            return item.id

        # 1. Spice Hub Menu
        c_sh_rec = add_cat(rest_spice.id, "Recommended", 1)
        c_sh_starters = add_cat(rest_spice.id, "Starters", 2)
        c_sh_main = add_cat(rest_spice.id, "Main Course", 3)
        c_sh_biryani = add_cat(rest_spice.id, "Biryani", 4)
        c_sh_chinese = add_cat(rest_spice.id, "Chinese Special", 5)

        item_sh_1 = add_item(rest_spice.id, c_sh_rec, "Paneer Butter Masala", 12.99, True, "Cubes of cottage cheese cooked in creamy tomato butter gravy.", "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500")
        add_item(rest_spice.id, c_sh_biryani, "Chicken Dum Biryani", 14.99, False, "Aromatic basmati rice layered with spiced marinated chicken.", "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500")
        add_item(rest_spice.id, c_sh_starters, "Veg Spring Rolls", 7.99, True, "Crispy fried wrappers filled with shredded vegetables.", "https://images.unsplash.com/photo-1544025162-d76694265947?w=500")
        add_item(rest_spice.id, c_sh_main, "Dal Makhani", 10.99, True, "Black lentils slow cooked overnight with fresh butter and cream.", "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500")
        add_item(rest_spice.id, c_sh_chinese, "Chilli Paneer Dry", 11.49, True, "Crispy cottage cheese tossed in spicy soy-garlic sauce.", "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500")

        # 2. Pizza Palace Menu
        c_pp_rec = add_cat(rest_pizza.id, "Recommended", 1)
        c_pp_pizza = add_cat(rest_pizza.id, "Pizza", 2)
        c_pp_sides = add_cat(rest_pizza.id, "Starters & Sides", 3)
        c_pp_bev = add_cat(rest_pizza.id, "Beverages", 4)

        add_item(rest_pizza.id, c_pp_rec, "Margherita Pizza", 11.99, True, "Classic mozzarella cheese, fresh basil, and San Marzano tomato sauce.", "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500")
        add_item(rest_pizza.id, c_pp_pizza, "Pepperoni Feast Pizza", 15.99, False, "Loaded with double pepperoni, molten mozzarella, and spicy herbs.", "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500")
        add_item(rest_pizza.id, c_pp_sides, "Garlic Breadsticks with Cheese", 5.99, True, "Fresh baked breadsticks brushed with garlic butter and herbs.", "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=500")
        add_item(rest_pizza.id, c_pp_bev, "Iced Italian Soda", 3.49, True, "Sparkling soda flavored with black currant and lemon zest.", "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500")

        # 3. Burger House Menu
        c_bh_rec = add_cat(rest_burger.id, "Recommended", 1)
        c_bh_burgers = add_cat(rest_burger.id, "Burgers", 2)
        c_bh_sides = add_cat(rest_burger.id, "Fries & Sides", 3)

        add_item(rest_burger.id, c_bh_rec, "Classic Cheese Smash Burger", 9.99, False, "Dual Angus beef patties, melted cheddar, pickles, and house sauce.", "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500")
        add_item(rest_burger.id, c_bh_burgers, "Crispy Veg Supreme Burger", 8.49, True, "Crispy potato-veggie patty topped with spicy mayo and lettuce.", "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500")
        add_item(rest_burger.id, c_bh_sides, "Loaded Peri-Peri Fries", 4.99, True, "Golden fries dusted with peri-peri seasoning and cheese dip.", "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500")

        # 4. Tandoori Junction Menu
        c_tj_rec = add_cat(rest_tandoori.id, "Recommended", 1)
        c_tj_starters = add_cat(rest_tandoori.id, "Starters", 2)
        c_tj_main = add_cat(rest_tandoori.id, "Main Course", 3)

        add_item(rest_tandoori.id, c_tj_rec, "Chicken Tandoori Half", 13.99, False, "Chicken marinated in yogurt and tikka spices baked in clay oven.", "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500")
        add_item(rest_tandoori.id, c_tj_main, "Butter Chicken Special", 14.99, False, "Tender tandoori chicken simmered in silky tomato gravy.", "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500")

        # 5. South Spice Menu
        c_ss_rec = add_cat(rest_south.id, "Recommended", 1)
        c_ss_dosa = add_cat(rest_south.id, "Dosa Specials", 2)

        add_item(rest_south.id, c_ss_rec, "Special Masala Dosa", 7.99, True, "Thin crispy rice crepes filled with spiced potato mash.", "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500")
        add_item(rest_south.id, c_ss_dosa, "Steamed Idli Sambar (4 Pcs)", 5.99, True, "Fluffy rice cakes served with spicy lentil sambar and coconut chutney.", "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500")

        # 6. Sweet Treats Menu
        c_st_rec = add_cat(rest_sweet.id, "Recommended", 1)
        c_st_dessert = add_cat(rest_sweet.id, "Desserts", 2)

        add_item(rest_sweet.id, c_st_rec, "Sizzling Chocolate Brownie", 6.99, True, "Warm fudge brownie served with vanilla ice cream and hot chocolate sauce.", "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500")
        add_item(rest_sweet.id, c_st_dessert, "Gulab Jamun (2 Pcs)", 3.99, True, "Warm milk solid dumplings soaked in cardamom sugar syrup.", "https://images.unsplash.com/photo-1593701478625-3b987b7a13c3?w=500")

        # 7. Coastal Curry House Menu
        c_cc_rec = add_cat(rest_coastal.id, "Recommended", 1)
        c_cc_seafood = add_cat(rest_coastal.id, "Seafood Specials", 2)
        add_item(rest_coastal.id, c_cc_rec, "Konkan Prawn Curry", 15.99, False, "Coastal prawns simmered in a fragrant coconut and kokum curry.", "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500")
        add_item(rest_coastal.id, c_cc_seafood, "Crispy Surmai Fry", 14.49, False, "Spiced king mackerel fried crisp and served with fresh salad.", "https://images.unsplash.com/photo-1547592180-85f173990554?w=500")

        # 8. Bombay Street Bistro Menu
        c_bs_rec = add_cat(rest_bombay.id, "Recommended", 1)
        c_bs_street = add_cat(rest_bombay.id, "Street Food", 2)
        add_item(rest_bombay.id, c_bs_rec, "Mumbai Vada Pav", 4.49, True, "Spiced potato fritter in a soft pav with dry garlic chutney.", "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500")
        add_item(rest_bombay.id, c_bs_street, "Butter Pav Bhaji", 6.99, True, "Rich mashed vegetable bhaji served with buttered pav.", "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500")

        print("Creating initial customer cart...")
        # Create initial customer cart pointing to Spice Hub
        if not db.query(Cart).filter(Cart.user_id == customer_user.id).first():
            cust_cart = Cart(
                id=uuid4(),
                user_id=customer_user.id,
                restaurant_id=rest_spice.id
            )
            db.add(cust_cart)
            db.commit()

        print("Creating sample customer order...")
        sample_order = Order(
            id=uuid4(),
            user_id=customer_user.id,
            restaurant_id=rest_spice.id,
            delivery_address_id=cust_address.id,
            order_status=OrderStatus.PREPARING,
            item_total=27.98,
            delivery_fee=2.99,
            discount_amount=0.00,
            final_amount=30.97,
            placed_at=datetime.utcnow() - timedelta(minutes=15)
        )
        db.add(sample_order)
        db.commit()

        order_item1 = OrderItem(
            id=uuid4(),
            order_id=sample_order.id,
            menu_item_id=item_sh_1,
            quantity=2,
            unit_price_snapshot=12.99,
            subtotal=25.98
        )
        db.add(order_item1)
        db.commit()

        print("Database successfully seeded with 8 restaurants, menu items, users, and orders!")

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
