import os
from dotenv import load_dotenv
from sqlalchemy import create_engine,text
from sqlalchemy.orm import declarative_base

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./foodfusion.db")

engine_options = {"connect_args": {"check_same_thread": False}} if DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(DATABASE_URL, **engine_options)

Base = declarative_base()

try:
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))
except Exception as e:
    raise RuntimeError("Database connection failed. Set DATABASE_URL to a valid SQLAlchemy URL.") from e
    
