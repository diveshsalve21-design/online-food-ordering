from datetime import datetime
from uuid import UUID, uuid4

from sqlalchemy import String, Float, DateTime, ForeignKey, Uuid, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base
from models.Enums import PaymentMethod, PaymentStatus


class Payment(Base):
    __tablename__ = "payments"

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

    payment_method: Mapped[PaymentMethod] = mapped_column(
        Enum(PaymentMethod),
        nullable=False,
    )

    payment_status: Mapped[PaymentStatus] = mapped_column(
        Enum(PaymentStatus),
        default=PaymentStatus.PENDING,
        nullable=False,
    )

    transaction_id: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        nullable=True,
    )

    amount: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    paid_at: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=True,
    )

    order: Mapped["Order"] = relationship(back_populates="payment")
