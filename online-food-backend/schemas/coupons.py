from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel

from models.Enums import DiscountType
from .base import Schema


class CouponCreate(BaseModel):
    user_id: UUID
    restaurant_id: UUID
    code: str
    discount_type: DiscountType
    discount_value: float
    min_order_value: float
    valid_until: datetime
    is_active: bool = True


class CouponUpdate(BaseModel):
    restaurant_id: Optional[UUID] = None
    code: Optional[str] = None
    discount_type: Optional[DiscountType] = None
    discount_value: Optional[float] = None
    min_order_value: Optional[float] = None
    valid_until: Optional[datetime] = None
    is_active: Optional[bool] = None


class CouponResponse(Schema):
    user_id: UUID
    restaurant_id: UUID
    code: str
    discount_type: DiscountType
    discount_value: float
    min_order_value: float
    valid_until: datetime
    is_active: bool
