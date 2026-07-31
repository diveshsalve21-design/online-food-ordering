from typing import Optional
from uuid import UUID

from pydantic import BaseModel

from models.Enums import VehicleType
from .base import Schema


class DeliveryPartnerCreate(BaseModel):
    user_id: UUID
    vehicle_type: VehicleType
    is_available: bool = True
    current_lat: Optional[float] = None
    current_lng: Optional[float] = None
    rating: float = 0.0


class DeliveryPartnerUpdate(BaseModel):
    user_id: Optional[UUID] = None
    vehicle_type: Optional[VehicleType] = None
    is_available: Optional[bool] = None
    current_lat: Optional[float] = None
    current_lng: Optional[float] = None
    rating: Optional[float] = None


class DeliveryPartnerResponse(Schema):
    id: UUID
    user_id: UUID
    vehicle_type: VehicleType
    is_available: bool
    current_lat: Optional[float]
    current_lng: Optional[float]
    rating: float
