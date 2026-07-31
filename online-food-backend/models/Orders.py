from uuid import UUID, uuid4
from datetime import datetime

from sqlalchemy import Float,DateTime,ForeignKey,Uuid,Enum

from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base
from models.Enums import OrderStatus


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[UUID] = mapped_column(
        Uuid,
        primary_key=True,
        default=uuid4,
    )

    user_id: Mapped[UUID] = mapped_column(
        Uuid,
        ForeignKey("users.id"),
        nullable=False,
    )

    restaurant_id: Mapped[UUID] = mapped_column(
        Uuid,
        ForeignKey("restaurants.id"),
        nullable=False,
    )

    delivery_address_id: Mapped[UUID] = mapped_column(
        Uuid,
        ForeignKey("addresses.id"),
        nullable=False,
    )

    coupon_id: Mapped[UUID] = mapped_column(
        Uuid,
        ForeignKey("coupons.id"),
        nullable=True,
    )

    order_status: Mapped[OrderStatus] = mapped_column(
        Enum(OrderStatus),
        default=OrderStatus.PENDING,
        nullable=False,
    )

    item_total: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    delivery_fee: Mapped[float] = mapped_column(
        Float,
        default=0.0,
        nullable=False,
    )

    discount_amount: Mapped[float] = mapped_column(
        Float,
        default=0.0,
        nullable=False,
    )

    final_amount: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    placed_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    user: Mapped["User"] = relationship(back_populates="orders")
    restaurant: Mapped["Restaurant"] = relationship(back_populates="orders")
    delivery_address: Mapped["Address"] = relationship(back_populates="orders")
    coupon: Mapped["Coupon | None"] = relationship(back_populates="orders")
    order_items: Mapped[list["OrderItem"]] = relationship(back_populates="order")
    payment: Mapped["Payment | None"] = relationship(back_populates="order", uselist=False)
    delivery: Mapped["Delivery | None"] = relationship(back_populates="order", uselist=False)
    reviews: Mapped[list["Review"]] = relationship(back_populates="order")
