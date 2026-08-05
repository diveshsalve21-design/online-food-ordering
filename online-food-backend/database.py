import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.orm import declarative_base

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./foodfusion.db")

try:
    engine_options = {"connect_args": {"check_same_thread": False}} if DATABASE_URL.startswith("sqlite") else {}
    engine = create_engine(DATABASE_URL, **engine_options)
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))
except Exception as e:
    print(f"Warning: Connection to DATABASE_URL failed ({e}). Falling back to SQLite local database.")
    DATABASE_URL = "sqlite:///./foodfusion.db"
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

Base = declarative_base()

def apply_migrations():
    """Ensure newly added columns are present in existing database tables."""
    try:
        with engine.begin() as conn:
            if engine.name != "sqlite":
                try:
                    conn.execute(text("ALTER TABLE restaurants ALTER COLUMN open_at DROP NOT NULL"))
                    conn.execute(text("ALTER TABLE restaurants ALTER COLUMN close_at DROP NOT NULL"))
                except Exception:
                    pass
            if engine.name == "sqlite":
                cols_raw = conn.execute(text("PRAGMA table_info(restaurants)")).fetchall()
                existing_cols = [c[1] for c in cols_raw]
            else:
                cols_raw = conn.execute(text(
                    "SELECT column_name FROM information_schema.columns WHERE table_name='restaurants'"
                )).fetchall()
                existing_cols = [c[0] for c in cols_raw]
            
            new_cols = [
                ("image_url", "VARCHAR(500)"),
                ("cover_image", "VARCHAR(500)"),
                ("description", "VARCHAR(500)"),
                ("address", "VARCHAR(255)"),
                ("phone", "VARCHAR(20)"),
                ("delivery_time", "VARCHAR(50) DEFAULT '25-35 min'"),
                ("delivery_fee", "NUMERIC(10, 2) DEFAULT 2.99"),
                ("min_order_amount", "NUMERIC(10, 2) DEFAULT 10.00"),
            ]
            
            for col_name, col_type in new_cols:
                if col_name not in existing_cols:
                    try:
                        conn.execute(text(f"ALTER TABLE restaurants ADD COLUMN {col_name} {col_type}"))
                        print(f"Added column {col_name} to restaurants table.")
                    except Exception as err:
                        print(f"Migration column {col_name} note: {err}")
            # Ensure menu_categories has restaurant_id
            try:
                if engine.name != "sqlite":
                    conn.execute(text("ALTER TABLE menu_categories ALTER COLUMN resturant_id DROP NOT NULL"))
            except Exception:
                pass
            try:
                if engine.name == "sqlite":
                    cat_cols = [c[1] for c in conn.execute(text("PRAGMA table_info(menu_categories)")).fetchall()]
                else:
                    cat_cols = [c[0] for c in conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name='menu_categories'")).fetchall()]
                
                if "restaurant_id" not in cat_cols:
                    conn.execute(text("ALTER TABLE menu_categories ADD COLUMN restaurant_id UUID"))
                    print("Added column restaurant_id to menu_categories table.")
            except Exception as e_cat:
                print(f"Migration menu_categories note: {e_cat}")

            # Ensure menu_items has restaurant_id and is_vegetarian
            try:
                if engine.name == "sqlite":
                    mi_cols = [c[1] for c in conn.execute(text("PRAGMA table_info(menu_items)")).fetchall()]
                else:
                    mi_cols = [c[0] for c in conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name='menu_items'")).fetchall()]
                
                if "restaurant_id" not in mi_cols:
                    conn.execute(text("ALTER TABLE menu_items ADD COLUMN restaurant_id UUID"))
                if "is_vegetarian" not in mi_cols:
                    conn.execute(text("ALTER TABLE menu_items ADD COLUMN is_vegetarian BOOLEAN DEFAULT FALSE"))
            except Exception as e_mi:
                print(f"Migration menu_items note: {e_mi}")

    except Exception as e:
        print(f"Migration error: {e}")
