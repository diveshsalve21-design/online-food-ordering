from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from db import get_db
from models.payments import Payment
from schemas import PaymentCreate, PaymentResponse, PaymentUpdate

router = APIRouter(prefix="/payments", tags=["Payments"])


@router.post("/", response_model=PaymentResponse, status_code=status.HTTP_201_CREATED)
def create_payments(payload: PaymentCreate, db: Session = Depends(get_db)):
    record = Payment(**payload.model_dump())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


@router.get("/", response_model=list[PaymentResponse])
def list_payments(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(Payment).offset(skip).limit(limit).all()


@router.get("/{record_id}", response_model=PaymentResponse)
def get_payments(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(Payment, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Payment not found")
    return record


@router.patch("/{record_id}", response_model=PaymentResponse)
def update_payments(record_id: UUID, payload: PaymentUpdate, db: Session = Depends(get_db)):
    record = db.get(Payment, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Payment not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(record, field, value)
    db.commit()
    db.refresh(record)
    return record


@router.delete("/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_payments(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(Payment, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Payment not found")
    db.delete(record)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
