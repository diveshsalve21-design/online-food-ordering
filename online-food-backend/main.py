from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.addresses import router as addresses_router
from routers.carts import router as carts_router
from routers.cart_items import router as cart_items_router
from routers.coupons import router as coupons_router
from routers.deliveries import router as deliveries_router
from routers.delivery_partners import router as delivery_partners_router
from routers.favorites import router as favorites_router
from routers.item_addons import router as item_addons_router
from routers.item_variants import router as item_variants_router
from routers.menu_categories import router as menu_categories_router
from routers.menu_items import router as menu_items_router
from routers.order_items import router as order_items_router
from routers.orders import router as orders_router
from routers.payments import router as payments_router
from routers.restaurants import router as restaurants_router
from routers.reviews import router as reviews_router
from routers.users import router as users_router
from routers.auth import router as auth_router
from routers.catalog import router as catalog_router
from database import Base, engine
import models  # Registers every SQLAlchemy model before tables are created.

app = FastAPI()

@app.on_event("startup")
def create_database_tables() -> None:
    """Make the development app runnable without a separate migration step."""
    Base.metadata.create_all(bind=engine)

# CORS middleware for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(catalog_router)
app.include_router(users_router)
app.include_router(addresses_router)
app.include_router(restaurants_router)
app.include_router(menu_categories_router)
app.include_router(menu_items_router)
app.include_router(item_variants_router)
app.include_router(item_addons_router)
app.include_router(carts_router)
app.include_router(cart_items_router)
app.include_router(coupons_router)
app.include_router(orders_router)
app.include_router(order_items_router)
app.include_router(payments_router)
app.include_router(delivery_partners_router)
app.include_router(deliveries_router)
app.include_router(favorites_router)
app.include_router(reviews_router)

@app.get("/")
def home():
    return {"message": "Welcome to the Online Food Backend!"}
