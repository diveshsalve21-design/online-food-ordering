from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from db import get_db
from models.delivery_partners import DeliveryPartner
from schemas import DeliveryPartnerCreate, DeliveryPartnerResponse, DeliveryPartnerUpdate

router = APIRouter(prefix="/delivery-partners", tags=["Delivery partners"])


@router.post("/", response_model=DeliveryPartnerResponse, status_code=status.HTTP_201_CREATED)
def create_delivery_partners(payload: DeliveryPartnerCreate, db: Session = Depends(get_db)):
    record = DeliveryPartner(**payload.model_dump())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


@router.get("/", response_model=list[DeliveryPartnerResponse])
def list_delivery_partners(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(DeliveryPartner).offset(skip).limit(limit).all()


@router.get("/{record_id}", response_model=DeliveryPartnerResponse)
def get_delivery_partners(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(DeliveryPartner, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="DeliveryPartner not found")
    return record


@router.patch("/{record_id}", response_model=DeliveryPartnerResponse)
def update_delivery_partners(record_id: UUID, payload: DeliveryPartnerUpdate, db: Session = Depends(get_db)):
    record = db.get(DeliveryPartner, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="DeliveryPartner not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(record, field, value)
    db.commit()
    db.refresh(record)
    return record


@router.delete("/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_delivery_partners(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(DeliveryPartner, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="DeliveryPartner not found")
    db.delete(record)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
