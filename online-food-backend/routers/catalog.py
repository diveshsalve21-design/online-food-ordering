"""Public catalogue used by the customer storefront.

The administrative menu-item endpoints remain available for database-managed
menus; this endpoint supplies a useful starter catalogue for a fresh install.
"""
from fastapi import APIRouter

router = APIRouter(prefix="/catalog", tags=["Catalogue"])

_MENU = [
    {"id": "margherita", "name": "Truffle Margherita", "description": "Wood-fired pizza with basil, mozzarella and truffle oil.", "price": 349, "is_vegetarian": True, "is_available": True, "image_key": "pizza", "category": "pizza", "calories": 620, "time": 25},
    {"id": "burger", "name": "Smoky Chicken Burger", "description": "Grilled chicken, cheese and house smoky sauce.", "price": 289, "is_vegetarian": False, "is_available": True, "image_key": "burger", "category": "burger", "calories": 540, "time": 20},
    {"id": "biryani", "name": "Hyderabadi Dum Biryani", "description": "Aromatic basmati rice, spices and tender chicken.", "price": 379, "is_vegetarian": False, "is_available": True, "image_key": "biryani", "category": "biryani", "calories": 760, "time": 30},
    {"id": "noodles", "name": "Chilli Garlic Noodles", "description": "Wok-tossed noodles with vegetables and chilli garlic.", "price": 249, "is_vegetarian": True, "is_available": True, "image_key": "noodles", "category": "chinese", "calories": 480, "time": 18},
    {"id": "salad", "name": "Garden Protein Bowl", "description": "Fresh greens, grains, avocado and a citrus dressing.", "price": 269, "is_vegetarian": True, "is_available": True, "image_key": "salad", "category": "healthy", "calories": 390, "time": 15},
    {"id": "dessert", "name": "Chocolate Lava Cake", "description": "Warm dark chocolate cake with a molten centre.", "price": 179, "is_vegetarian": True, "is_available": True, "image_key": "dessert", "category": "dessert", "calories": 420, "time": 15},
]

@router.get("/menu")
def list_catalogue_menu() -> list[dict]:
    return _MENU
