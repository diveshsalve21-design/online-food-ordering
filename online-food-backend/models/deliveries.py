from datetime import datetime
from uuid import UUID, uuid4

from sqlalchemy import String, DateTime, ForeignKey, Uuid, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING

from database import Base
from models.Enums import DeliveryStatus

if TYPE_CHECKING:
    from models.Orders import Order
    from models.delivery_partners import DeliveryPartner


class Delivery(Base):
    __tablename__ = "deliveries"

    id: Mapped[UUID] = mapped_column(
        Uuid,
        primary_key=True,
        default=uuid4,
    )

    order_id: Mapped[UUID] = mapped_column(
        Uuid,
        ForeignKey("orders.id"),
        unique=True,
        nullable=False,
    )

    delivery_partner_id: Mapped[UUID | None] = mapped_column(
        Uuid,
        ForeignKey("delivery_partners.id"),
        nullable=True,
    )

    delivery_status: Mapped[DeliveryStatus] = mapped_column(
        Enum(DeliveryStatus),
        default=DeliveryStatus.ASSIGNED,
        nullable=False,
    )

    otp: Mapped[str | None] = mapped_column(
        String(10),
        nullable=True,
    )

    picked_at: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True,
    )

    delivered_at: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True,
    )

    order: Mapped["Order"] = relationship(back_populates="delivery")
    delivery_partner: Mapped["DeliveryPartner | None"] = relationship(back_populates="deliveries")
