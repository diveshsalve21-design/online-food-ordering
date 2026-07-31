from uuid import UUID, uuid4

from sqlalchemy import String, Integer, ForeignKey, Uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base


class CartItem(Base):
    __tablename__ = "cart_items"

    id: Mapped[UUID] = mapped_column(
        Uuid,
        primary_key=True,
        default=uuid4,
    )

    cart_id: Mapped[UUID] = mapped_column(
        Uuid,
        ForeignKey("carts.id"),
        nullable=False,
    )

    menu_item_id: Mapped[UUID] = mapped_column(
        Uuid,
        ForeignKey("menu_items.id"),
        nullable=False,
    )

    quantity: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=1,
    )

    special_instruction: Mapped[str] = mapped_column(
        String(255),
        nullable=True,
    )

    cart: Mapped["Cart"] = relationship(back_populates="cart_items")
    menu_item: Mapped["MenuItem"] = relationship(back_populates="cart_items")
