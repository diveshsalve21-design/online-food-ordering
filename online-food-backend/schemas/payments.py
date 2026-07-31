from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel

from models.Enums import PaymentMethod, PaymentStatus
from .base import Schema


class PaymentCreate(BaseModel):
    order_id: UUID
    payment_method: PaymentMethod
    payment_status: PaymentStatus = PaymentStatus.PENDING
    transaction_id: Optional[str] = None
    amount: float
    paid_at: Optional[datetime] = None


class PaymentUpdate(BaseModel):
    order_id: Optional[UUID] = None
    payment_method: Optional[PaymentMethod] = None
    payment_status: Optional[PaymentStatus] = None
    transaction_id: Optional[str] = None
    amount: Optional[float] = None
    paid_at: Optional[datetime] = None


class PaymentResponse(Schema):
    id: UUID
    order_id: UUID
    payment_method: PaymentMethod
    payment_status: PaymentStatus
    transaction_id: Optional[str]
    amount: float
    paid_at: Optional[datetime]
