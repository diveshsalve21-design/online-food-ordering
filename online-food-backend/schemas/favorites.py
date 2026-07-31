from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel

from .base import Schema


class FavoriteCreate(BaseModel):
    user_id: UUID
    restaurant_id: UUID


class FavoriteUpdate(BaseModel):
    user_id: Optional[UUID] = None
    restaurant_id: Optional[UUID] = None


class FavoriteResponse(Schema):
    id: UUID
    user_id: UUID
    restaurant_id: UUID
    added_at: datetime
