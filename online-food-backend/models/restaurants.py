from sqlalchemy import Column, String, Boolean, Uuid, DateTime, ForeignKey, TIMESTAMP, Numeric
from uuid import UUID, uuid4
from datetime import datetime
from database import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from models.Orders import Order
    from models.Reviews import Review
    from models.carts import Cart
    from models.coupon import Coupon
    from models.favorites import Favorite
    from models.menu_categories import MenuCategory
    from models.menu_items import MenuItem
    from models.users import User

class Restaurant(Base):

    __tablename__ = "restaurants"

    id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True),
        primary_key=True,
        default=uuid4
    )

    owner_id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False
    )

    name: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    cuisine: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    fassai_license_Number: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        nullable=False
    )

    rating: Mapped[float] = mapped_column(
        Numeric(2, 1),
        default=0.0,
        nullable=False
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False
    )

    open_at: Mapped[datetime | None] = mapped_column(
        TIMESTAMP,
        nullable=True
    )

    close_at: Mapped[datetime | None] = mapped_column(
        TIMESTAMP,
        nullable=True
    )

    image_url: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True
    )

    cover_image: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True
    )

    description: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True
    )

    address: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    phone: Mapped[str | None] = mapped_column(
        String(20),
        nullable=True
    )

    delivery_time: Mapped[str | None] = mapped_column(
        String(50),
        default="25-35 min",
        nullable=True
    )

    delivery_fee: Mapped[float | None] = mapped_column(
        Numeric(10, 2),
        default=2.99,
        nullable=True
    )

    min_order_amount: Mapped[float | None] = mapped_column(
        Numeric(10, 2),
        default=10.00,
        nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP,
        default=datetime.utcnow,
        nullable=False
    )

    owner: Mapped["User"] = relationship(back_populates="restaurants")
    categories: Mapped[list["MenuCategory"]] = relationship(back_populates="restaurant")
    menu_items: Mapped[list["MenuItem"]] = relationship(back_populates="restaurant")
    orders: Mapped[list["Order"]] = relationship(back_populates="restaurant")
    carts: Mapped[list["Cart"]] = relationship(back_populates="restaurant")
    coupons: Mapped[list["Coupon"]] = relationship(back_populates="restaurant")
    reviews: Mapped[list["Review"]] = relationship(back_populates="restaurant")
    favorites: Mapped[list["Favorite"]] = relationship(back_populates="restaurant")
