from database import Base
from sqlalchemy import UUID, String, ForeignKey, Uuid, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from uuid import UUID,uuid4
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from models.Orders import Order
    from models.users import User

class Address(Base):

    __tablename__ = "addresses"

    id : Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True),
        primary_key=True,
        default=uuid4
    )

    user_id : Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False
    )

    address :Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    city :Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    state : Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    pincode : Mapped[str] = mapped_column(
        String(10),
        nullable=False
    )

    address_type : Mapped[str] = mapped_column(
        String(20),
        nullable=False
    )

    is_default : Mapped[bool] = mapped_column(
        Boolean,
        default=False,
    )

    user: Mapped["User"] = relationship(back_populates="addresses")
    orders: Mapped[list["Order"]] = relationship(back_populates="delivery_address")


    
