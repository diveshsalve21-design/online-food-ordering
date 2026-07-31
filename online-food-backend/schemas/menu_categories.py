from typing import Optional
from uuid import UUID

from pydantic import BaseModel

from .base import Schema


class MenuCategoryCreate(BaseModel):
    resturant_id: UUID
    name: str
    display_order: int


class MenuCategoryUpdate(BaseModel):
    resturant_id: Optional[UUID] = None
    name: Optional[str] = None
    display_order: Optional[int] = None


class MenuCategoryResponse(Schema):
    id: UUID
    resturant_id: UUID
    name: str
    display_order: int
