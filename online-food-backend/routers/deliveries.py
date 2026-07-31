from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from db import get_db
from models.deliveries import Delivery
from schemas import DeliveryCreate, DeliveryResponse, DeliveryUpdate

router = APIRouter(prefix="/deliveries", tags=["Deliveries"])


@router.post("/", response_model=DeliveryResponse, status_code=status.HTTP_201_CREATED)
def create_deliveries(payload: DeliveryCreate, db: Session = Depends(get_db)):
    record = Delivery(**payload.model_dump())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


@router.get("/", response_model=list[DeliveryResponse])
def list_deliveries(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(Delivery).offset(skip).limit(limit).all()


@router.get("/{record_id}", response_model=DeliveryResponse)
def get_deliveries(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(Delivery, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Delivery not found")
    return record


@router.patch("/{record_id}", response_model=DeliveryResponse)
def update_deliveries(record_id: UUID, payload: DeliveryUpdate, db: Session = Depends(get_db)):
    record = db.get(Delivery, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Delivery not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(record, field, value)
    db.commit()
    db.refresh(record)
    return record


@router.delete("/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_deliveries(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(Delivery, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Delivery not found")
    db.delete(record)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
