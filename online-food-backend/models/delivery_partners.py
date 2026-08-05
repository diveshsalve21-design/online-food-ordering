from uuid import UUID, uuid4

from sqlalchemy import Boolean, Float, ForeignKey, Uuid, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING

from database import Base
from models.Enums import VehicleType

if TYPE_CHECKING:
    from models.deliveries import Delivery
    from models.users import User


class DeliveryPartner(Base):
    __tablename__ = "delivery_partners"

    id: Mapped[UUID] = mapped_column(
        Uuid,
        primary_key=True,
        default=uuid4,
    )

    user_id: Mapped[UUID] = mapped_column(
        Uuid,
        ForeignKey("users.id"),
        unique=True,
        nullable=False,
    )

    vehicle_type: Mapped[VehicleType] = mapped_column(
        Enum(VehicleType),
        nullable=False,
    )

    is_available: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )

    current_lat: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    current_lng: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    rating: Mapped[float] = mapped_column(
        Float,
        default=0.0,
        nullable=False,
    )

    user: Mapped["User"] = relationship(back_populates="delivery_partner")
    deliveries: Mapped[list["Delivery"]] = relationship(back_populates="delivery_partner")
