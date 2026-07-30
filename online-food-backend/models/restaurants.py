from sqlalchemy import Column, String, Boolean, Uuid, DateTime, ForeignKey, TIMESTAMP, Numeric
from uuid import UUID, uuid4
from datetime import datetime
from database import Base
from sqlalchemy.orm import Mapped, mapped_column

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

    open_at: Mapped[datetime] = mapped_column(
        TIMESTAMP,
        nullable=False
    )

    close_at: Mapped[datetime] = mapped_column(
        TIMESTAMP,
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP,
        default=datetime.utcnow,
        nullable=False
    )
    