from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from db import get_db
from models.address import Address
from schemas import AddressCreate, AddressResponse, AddressUpdate

router = APIRouter(prefix="/addresses", tags=["Addresses"])


@router.post("/", response_model=AddressResponse, status_code=status.HTTP_201_CREATED)
def create_addresses(payload: AddressCreate, db: Session = Depends(get_db)):
    record = Address(**payload.model_dump())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


@router.get("/", response_model=list[AddressResponse])
def list_addresses(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(Address).offset(skip).limit(limit).all()


@router.get("/{record_id}", response_model=AddressResponse)
def get_addresses(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(Address, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Address not found")
    return record


@router.patch("/{record_id}", response_model=AddressResponse)
def update_addresses(record_id: UUID, payload: AddressUpdate, db: Session = Depends(get_db)):
    record = db.get(Address, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Address not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(record, field, value)
    db.commit()
    db.refresh(record)
    return record


@router.delete("/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_addresses(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(Address, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Address not found")
    db.delete(record)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
