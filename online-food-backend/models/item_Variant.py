from uuid import UUID, uuid4

from sqlalchemy import String, Float, ForeignKey, Uuid
from sqlalchemy.orm import Mapped, mapped_column

from database import Base


class ItemVariant(Base):
    __tablename__ = "item_variants"

    id: Mapped[UUID] = mapped_column(
        Uuid,
        primary_key=True,
        default=uuid4,
    )

    menu_item_id: Mapped[UUID] = mapped_column(
        Uuid,
        ForeignKey("menu_items.id"),
        nullable=False,
    )

    name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    price_delta: Mapped[float] = mapped_column(
        Float,
        default=0.0,
        nullable=False,
    )