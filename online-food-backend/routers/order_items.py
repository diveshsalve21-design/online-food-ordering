from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from db import get_db
from models.Order_items import OrderItem
from schemas import OrderItemCreate, OrderItemResponse, OrderItemUpdate

router = APIRouter(prefix="/order-items", tags=["Order items"])


@router.post("/", response_model=OrderItemResponse, status_code=status.HTTP_201_CREATED)
def create_order_items(payload: OrderItemCreate, db: Session = Depends(get_db)):
    record = OrderItem(**payload.model_dump())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


@router.get("/", response_model=list[OrderItemResponse])
def list_order_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(OrderItem).offset(skip).limit(limit).all()


@router.get("/{record_id}", response_model=OrderItemResponse)
def get_order_items(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(OrderItem, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="OrderItem not found")
    return record


@router.patch("/{record_id}", response_model=OrderItemResponse)
def update_order_items(record_id: UUID, payload: OrderItemUpdate, db: Session = Depends(get_db)):
    record = db.get(OrderItem, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="OrderItem not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(record, field, value)
    db.commit()
    db.refresh(record)
    return record


@router.delete("/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_order_items(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(OrderItem, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="OrderItem not found")
    db.delete(record)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
