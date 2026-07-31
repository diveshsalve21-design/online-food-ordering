from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from db import get_db
from models.carts import Cart
from schemas import CartCreate, CartResponse, CartUpdate

router = APIRouter(prefix="/carts", tags=["Carts"])


@router.post("/", response_model=CartResponse, status_code=status.HTTP_201_CREATED)
def create_carts(payload: CartCreate, db: Session = Depends(get_db)):
    record = Cart(**payload.model_dump())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


@router.get("/", response_model=list[CartResponse])
def list_carts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(Cart).offset(skip).limit(limit).all()


@router.get("/{record_id}", response_model=CartResponse)
def get_carts(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(Cart, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Cart not found")
    return record


@router.patch("/{record_id}", response_model=CartResponse)
def update_carts(record_id: UUID, payload: CartUpdate, db: Session = Depends(get_db)):
    record = db.get(Cart, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Cart not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(record, field, value)
    db.commit()
    db.refresh(record)
    return record


@router.delete("/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_carts(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(Cart, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Cart not found")
    db.delete(record)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
