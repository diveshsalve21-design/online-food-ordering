from datetime import datetime
from uuid import UUID, uuid4

from sqlalchemy import String, DateTime, ForeignKey, Uuid, Enum
from sqlalchemy.orm import Mapped, mapped_column

from database import Base
from models.Enums import DeliveryStatus


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
        nullable=False,
    )

    delivery_partner_id: Mapped[UUID] = mapped_column(
        Uuid,
        ForeignKey("delivery_partners.id"),
        nullable=True,
    )

    delivery_status: Mapped[DeliveryStatus] = mapped_column(
        Enum(DeliveryStatus),
        default=DeliveryStatus.ASSIGNED,
        nullable=False,
    )

    otp: Mapped[str] = mapped_column(
        String(10),
        nullable=True,
    )

    picked_at: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=True,
    )

    delivered_at: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=True,
    )