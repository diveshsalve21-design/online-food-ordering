from sqlalchemy import Column, String, Boolean, Uuid, DateTime, Enum


from uuid import UUID, uuid4
from datetime import datetime
from database import Base 
from sqlalchemy.orm import Mapped, mapped_column
from models.Enums import UserRole

class User(Base):
    __tablename__ = "users"

    id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True), 
        primary_key=True, 
        default=uuid4
        )
    
    full_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    email: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        nullable=False
    )

    phone: Mapped[str] = mapped_column(
        String(15),
        unique=True,
        nullable=False
    )

    password_hash: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    role:Mapped[UserRole] = mapped_column(Enum(UserRole),default=UserRole.CUSTOMER)


    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default= datetime.utcnow,
        nullable=False
    )

