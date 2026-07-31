from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel

from models.Enums import OrderStatus
from .base import Schema


class OrderCreate(BaseModel):
    user_id: UUID
    restaurant_id: UUID
    delivery_address_id: UUID
    coupon_id: Optional[UUID] = None
    order_status: OrderStatus = OrderStatus.PENDING
    item_total: float
    delivery_fee: float = 0.0
    discount_amount: float = 0.0
    final_amount: float


class OrderUpdate(BaseModel):
    user_id: Optional[UUID] = None
    restaurant_id: Optional[UUID] = None
    delivery_address_id: Optional[UUID] = None
    coupon_id: Optional[UUID] = None
    order_status: Optional[OrderStatus] = None
    item_total: Optional[float] = None
    delivery_fee: Optional[float] = None
    discount_amount: Optional[float] = None
    final_amount: Optional[float] = None


class OrderResponse(Schema):
    id: UUID
    user_id: UUID
    restaurant_id: UUID
    delivery_address_id: UUID
    coupon_id: Optional[UUID]
    order_status: OrderStatus
    item_total: float
    delivery_fee: float
    discount_amount: float
    final_amount: float
    placed_at: datetime
