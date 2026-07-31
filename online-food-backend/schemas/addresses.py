from typing import Optional
from uuid import UUID

from pydantic import BaseModel

from .base import Schema


class AddressCreate(BaseModel):
    user_id: UUID
    address: str
    city: str
    state: str
    pincode: str
    address_type: str
    is_default: bool = False


class AddressUpdate(BaseModel):
    user_id: Optional[UUID] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None
    address_type: Optional[str] = None
    is_default: Optional[bool] = None


class AddressResponse(Schema):
    id: UUID
    user_id: UUID
    address: str
    city: str
    state: str
    pincode: str
    address_type: str
    is_default: bool
