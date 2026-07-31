from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from db import get_db
from models.coupon import Coupon
from schemas import CouponCreate, CouponResponse, CouponUpdate

router = APIRouter(prefix="/coupons", tags=["Coupons"])


@router.post("/", response_model=CouponResponse, status_code=status.HTTP_201_CREATED)
def create_coupons(payload: CouponCreate, db: Session = Depends(get_db)):
    record = Coupon(**payload.model_dump())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


@router.get("/", response_model=list[CouponResponse])
def list_coupons(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(Coupon).offset(skip).limit(limit).all()


@router.get("/{record_id}", response_model=CouponResponse)
def get_coupons(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(Coupon, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Coupon not found")
    return record


@router.patch("/{record_id}", response_model=CouponResponse)
def update_coupons(record_id: UUID, payload: CouponUpdate, db: Session = Depends(get_db)):
    record = db.get(Coupon, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Coupon not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(record, field, value)
    db.commit()
    db.refresh(record)
    return record


@router.delete("/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_coupons(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(Coupon, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Coupon not found")
    db.delete(record)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
