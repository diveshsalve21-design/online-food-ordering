from sqlalchemy import Column, String, Uuid, ForeignKey, Integer
from uuid import UUID, uuid4
from database import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship

class MenuCategory(Base):

    __tablename__ = "menu_categories"

    id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True),
        primary_key=True,
        default=uuid4
    )

    restaurant_id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True),
        ForeignKey("restaurants.id"),
        nullable=False
    )

    name : Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    display_order: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    restaurant: Mapped["Restaurant"] = relationship(back_populates="categories")
    menu_items: Mapped[list["MenuItem"]] = relationship(back_populates="category")
