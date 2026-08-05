from sqlalchemy import Column, Uuid, ForeignKey, TIMESTAMP
from uuid import UUID, uuid4
from database import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from models.Carts_Items import CartItem
    from models.restaurants import Restaurant
    from models.users import User

class Cart(Base):

    __tablename__ = "carts"

    id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True),
        primary_key=True,
        default=uuid4
    )

    user_id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True),
        ForeignKey("users.id"),
        unique=True,
        nullable=False
    )

    restaurant_id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True),
        ForeignKey("restaurants.id"),
        nullable=False
    )

    updated_at: Mapped[datetime] = mapped_column(
        TIMESTAMP,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )

    user: Mapped["User"] = relationship(back_populates="carts")
    restaurant: Mapped["Restaurant"] = relationship(back_populates="carts")
    cart_items: Mapped[list["CartItem"]] = relationship(back_populates="cart")
