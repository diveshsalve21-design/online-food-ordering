import os
from dotenv import load_dotenv
from sqlalchemy import create_engine,text
from sqlalchemy.orm import declarative_base

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)

Base = declarative_base()

try:
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))
        print("Database connection successful!")

except Exception as e:
    print("Database connection failed!")
    print(f"Error: {e}")
    
