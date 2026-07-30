from sqlalchemy import Column, String, Boolean, Uuid,Text, ForeignKey, Numeric
from uuid import UUID, uuid4
from database import Base
from sqlalchemy.orm import Mapped, mapped_column

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

    description: Mapped[Text] = mapped_column(
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

    image_url: Mapped[str] = mapped_column(
        String(255),
        nullable=True
    )