from database import Base
from sqlalchemy import UUID, String, ForeignKey, Uuid, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from uuid import UUID,uuid4

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



    