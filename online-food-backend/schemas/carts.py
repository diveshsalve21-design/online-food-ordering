from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel

from .base import Schema


class CartCreate(BaseModel):
    user_id: UUID
    restaurant_id: UUID


class CartUpdate(BaseModel):
    user_id: Optional[UUID] = None
    restaurant_id: Optional[UUID] = None


class CartResponse(Schema):
    id: UUID
    user_id: UUID
    restaurant_id: UUID
    updated_at: datetime
