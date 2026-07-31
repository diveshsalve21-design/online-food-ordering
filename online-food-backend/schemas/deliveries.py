from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel

from models.Enums import DeliveryStatus
from .base import Schema


class DeliveryCreate(BaseModel):
    order_id: UUID
    delivery_partner_id: Optional[UUID] = None
    delivery_status: DeliveryStatus = DeliveryStatus.ASSIGNED
    otp: Optional[str] = None
    picked_at: Optional[datetime] = None
    delivered_at: Optional[datetime] = None


class DeliveryUpdate(BaseModel):
    order_id: Optional[UUID] = None
    delivery_partner_id: Optional[UUID] = None
    delivery_status: Optional[DeliveryStatus] = None
    otp: Optional[str] = None
    picked_at: Optional[datetime] = None
    delivered_at: Optional[datetime] = None


class DeliveryResponse(Schema):
    id: UUID
    order_id: UUID
    delivery_partner_id: Optional[UUID]
    delivery_status: DeliveryStatus
    otp: Optional[str]
    picked_at: Optional[datetime]
    delivered_at: Optional[datetime]
