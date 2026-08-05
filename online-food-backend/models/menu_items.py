from sqlalchemy import Column, String, Boolean, Uuid,Text, ForeignKey, Numeric
from uuid import UUID, uuid4
from database import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from models.Carts_Items import CartItem
    from models.Item_Addons import ItemAddon
    from models.Order_items import OrderItem
    from models.item_Variant import ItemVariant
    from models.menu_categories import MenuCategory
    from models.restaurants import Restaurant

class MenuItem(Base):

    __tablename__ = "menu_items"

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

    category_id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True),
        ForeignKey("menu_categories.id"),
        nullable=False
    )

    name: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    price: Mapped[float] = mapped_column(
        Numeric(10, 2),
        nullable=False  
    )

    is_vegetarian: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )

    is_available: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False
    )

    image_url: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    restaurant: Mapped["Restaurant"] = relationship(back_populates="menu_items")
    category: Mapped["MenuCategory"] = relationship(back_populates="menu_items")
    variants: Mapped[list["ItemVariant"]] = relationship(back_populates="menu_item")
    addons: Mapped[list["ItemAddon"]] = relationship(back_populates="menu_item")
    cart_items: Mapped[list["CartItem"]] = relationship(back_populates="menu_item")
    order_items: Mapped[list["OrderItem"]] = relationship(back_populates="menu_item")
