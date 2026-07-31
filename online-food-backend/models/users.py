from sqlalchemy import Enum as SQLAlchemyEnum, String, Boolean, Uuid, DateTime
from sqlalchemy import Column, String, Boolean, Uuid, DateTime, Enum
from uuid import UUID, uuid4
from datetime import datetime
from database import Base 
from sqlalchemy.orm import Mapped, mapped_column, relationship
from models.Enums import UserRole

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from models.address import Address
    from models.restaurants import Restaurant
    from models.Orders import Order
    from models.carts import Cart
    from models.Reviews import Review
    from models.favorites import Favorite
    from models.delivery_partners import DeliveryPartner

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


    role: Mapped[UserRole] = mapped_column(
        SQLAlchemyEnum(UserRole),
        default=UserRole.CUSTOMER,
        nullable=False
    )

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
    # Relationships
    addresses: Mapped[list["Address"]] = relationship(back_populates="user")
    restaurants: Mapped[list["Restaurant"]] = relationship(back_populates="owner")
    orders: Mapped[list["Order"]] = relationship(back_populates="user")
    carts: Mapped[list["Cart"]] = relationship(back_populates="user")
    reviews: Mapped[list["Review"]] = relationship(back_populates="user")
    favorites: Mapped[list["Favorite"]] = relationship(back_populates="user")
    delivery_partner: Mapped["DeliveryPartner | None"] = relationship(
        back_populates="user", uselist=False
    )



