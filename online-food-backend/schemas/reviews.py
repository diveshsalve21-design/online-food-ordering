from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel

from .base import Schema


class ReviewCreate(BaseModel):
    user_id: UUID
    restaurant_id: UUID
    order_id: UUID
    rating: int
    comment: Optional[str] = None


class ReviewUpdate(BaseModel):
    user_id: Optional[UUID] = None
    restaurant_id: Optional[UUID] = None
    order_id: Optional[UUID] = None
    rating: Optional[int] = None
    comment: Optional[str] = None


class ReviewResponse(Schema):
    id: UUID
    user_id: UUID
    restaurant_id: UUID
    order_id: UUID
    rating: int
    comment: Optional[str]
    created_at: datetime
