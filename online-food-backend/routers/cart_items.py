from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from db import get_db
from models.Carts_Items import CartItem
from schemas import CartItemCreate, CartItemResponse, CartItemUpdate

router = APIRouter(prefix="/cart-items", tags=["Cart items"])


@router.post("/", response_model=CartItemResponse, status_code=status.HTTP_201_CREATED)
def create_cart_items(payload: CartItemCreate, db: Session = Depends(get_db)):
    record = CartItem(**payload.model_dump())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


@router.get("/", response_model=list[CartItemResponse])
def list_cart_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(CartItem).offset(skip).limit(limit).all()


@router.get("/{record_id}", response_model=CartItemResponse)
def get_cart_items(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(CartItem, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="CartItem not found")
    return record


@router.patch("/{record_id}", response_model=CartItemResponse)
def update_cart_items(record_id: UUID, payload: CartItemUpdate, db: Session = Depends(get_db)):
    record = db.get(CartItem, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="CartItem not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(record, field, value)
    db.commit()
    db.refresh(record)
    return record


@router.delete("/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_cart_items(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(CartItem, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="CartItem not found")
    db.delete(record)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
