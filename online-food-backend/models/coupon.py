from datetime import datetime
from uuid import UUID, uuid4

from sqlalchemy import String,Boolean,DateTime,Float,ForeignKey,Enum,Uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base
from models.Enums import DiscountType


class Coupon(Base):
    __tablename__ = "coupons"

    id: Mapped[UUID] = mapped_column(
        Uuid,
        primary_key=True,
        default=uuid4,
    )

    restaurant_id: Mapped[UUID] = mapped_column(
        Uuid,
        ForeignKey("restaurants.id"),
        nullable=False,
    )

    code: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        nullable=False,
    )

    discount_type: Mapped[DiscountType] = mapped_column(
        Enum(DiscountType),
        nullable=False,
    )

    discount_value: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    min_order_value: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    valid_until: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )

    restaurant: Mapped["Restaurant"] = relationship(back_populates="coupons")
    orders: Mapped[list["Order"]] = relationship(back_populates="coupon")
