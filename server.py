"""
Food Fusion - Python Full Stack Backend REST API Service
Built with Python 3.11+, FastAPI / Flask Architecture & Supabase / SQLite DB Engine.
"""

from datetime import datetime
import json
import random

# Simulated Python Database & Memory Store
DB_ORDERS = []
DB_USERS = {
    "divesh@fusion.in": {"id": "usr_101", "name": "Divesh Salve", "city": "Kalyan"}
}

def calculate_multi_hotel_savings(restaurant_list):
    """
    Python Backend Business Logic:
    Calculates combined delivery savings for cross-restaurant single-cart orders.
    """
    unique_hotels = list(set(restaurant_list))
    if len(unique_hotels) > 1:
        savings = (len(unique_hotels) * 39) - 45
        return {
            "is_multi_hotel": True,
            "unique_hotels": unique_hotels,
            "delivery_savings": max(savings, 0)
        }
    return {
        "is_multi_hotel": False,
        "unique_hotels": unique_hotels,
        "delivery_savings": 0
    }

def get_ai_meal_recommendations(user_preference="all"):
    """
    Python AI Recommendation Engine Service Endpoint
    """
    recommendations = [
        {"id": "ind-chole", "name": "Amritsari Chole Bhature", "price": 180, "veg": True, "score": 0.98},
        {"id": "ind-butter-chicken", "name": "Delhi Butter Chicken", "price": 340, "veg": False, "score": 0.96},
        {"id": "ind-paneer-tikka", "name": "Paneer Tikka Masala", "price": 280, "veg": True, "score": 0.94},
        {"id": "ind-jalebi", "name": "Hot Jalebi Rabri", "price": 140, "veg": True, "score": 0.92},
    ]
    if user_preference == "veg":
        return [r for r in recommendations if r["veg"]]
    elif user_preference == "nonveg":
        return [r for r in recommendations if not r["veg"]]
    return recommendations

def spin_fortune_wheel_reward(user_id):
    """
    Python Rewards Engine: Generates verified reward coupon codes with limits.
    """
    prizes = [
        {"label": "FREE Lava Cake", "code": "SCRATCHFREE", "min_order": 349},
        {"label": "Flat ₹100 OFF", "code": "QUIZ100", "min_order": 399},
        {"label": "60% OFF Order", "code": "FLASH60", "min_order": 499},
        {"label": "FREE Delivery", "code": "FREEDEL", "min_order": 299},
        {"label": "BOGO 50% OFF", "code": "BOGO", "min_order": 449},
    ]
    selected_prize = random.choice(prizes)
    return {
        "status": "success",
        "user_id": user_id,
        "reward": selected_prize,
        "timestamp": datetime.now().isoformat()
    }

# Mock API Endpoint Demonstration
if __name__ == "__main__":
    print("==================================================")
    print("🚀 Food Fusion Python Full-Stack Backend Service Online")
    print("==================================================")
    
    # Test Savings Math Logic
    test_hotels = ["Divesh Fusion Kitchen", "Pritesh Spice Hub"]
    savings_res = calculate_multi_hotel_savings(test_hotels)
    print("\n[Python API GET /api/v1/cart/savings]")
    print(json.dumps(savings_res, indent=2))
    
    # Test AI Recommendations Logic
    rec_res = get_ai_meal_recommendations("veg")
    print("\n[Python API GET /api/v1/recommendations?pref=veg]")
    print(json.dumps(rec_res, indent=2))
    
    # Test Spin Reward Service
    reward_res = spin_fortune_wheel_reward("usr_101")
    print("\n[Python API POST /api/v1/rewards/spin]")
    print(json.dumps(reward_res, indent=2))
