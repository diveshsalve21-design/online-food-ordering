from uuid import UUID, uuid4
from datetime import datetime

from sqlalchemy import String,Integer,DateTime,ForeignKey,Uuid

from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base


class Review(Base):
    __tablename__ = "reviews"

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

    order_id: Mapped[UUID] = mapped_column(
        Uuid,
        ForeignKey("orders.id"),
        unique=True,
        nullable=False,
    )

    rating: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    comment: Mapped[str] = mapped_column(
        String(500),
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    user: Mapped["User"] = relationship(back_populates="reviews")
    restaurant: Mapped["Restaurant"] = relationship(back_populates="reviews")
    order: Mapped["Order"] = relationship(back_populates="reviews")
