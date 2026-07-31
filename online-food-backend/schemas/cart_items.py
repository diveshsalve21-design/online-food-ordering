from typing import Optional
from uuid import UUID

from pydantic import BaseModel

from .base import Schema


class CartItemCreate(BaseModel):
    cart_id: UUID
    menu_item_id: UUID
    quantity: int = 1
    special_instruction: Optional[str] = None


class CartItemUpdate(BaseModel):
    cart_id: Optional[UUID] = None
    menu_item_id: Optional[UUID] = None
    quantity: Optional[int] = None
    special_instruction: Optional[str] = None


class CartItemResponse(Schema):
    id: UUID
    cart_id: UUID
    menu_item_id: UUID
    quantity: int
    special_instruction: Optional[str]
