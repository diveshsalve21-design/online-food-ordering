from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from db import get_db
from models.Orders import Order
from schemas import OrderCreate, OrderResponse, OrderUpdate

router = APIRouter(prefix="/orders", tags=["Orders"])


@router.post("/", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
def create_orders(payload: OrderCreate, db: Session = Depends(get_db)):
    record = Order(**payload.model_dump())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


@router.get("/", response_model=list[OrderResponse])
def list_orders(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(Order).offset(skip).limit(limit).all()


@router.get("/{record_id}", response_model=OrderResponse)
def get_orders(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(Order, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return record


@router.patch("/{record_id}", response_model=OrderResponse)
def update_orders(record_id: UUID, payload: OrderUpdate, db: Session = Depends(get_db)):
    record = db.get(Order, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Order not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(record, field, value)
    db.commit()
    db.refresh(record)
    return record


@router.delete("/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_orders(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(Order, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Order not found")
    db.delete(record)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
