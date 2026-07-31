from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from db import get_db
from models.Reviews import Review
from schemas import ReviewCreate, ReviewResponse, ReviewUpdate

router = APIRouter(prefix="/reviews", tags=["Reviews"])


@router.post("/", response_model=ReviewResponse, status_code=status.HTTP_201_CREATED)
def create_reviews(payload: ReviewCreate, db: Session = Depends(get_db)):
    record = Review(**payload.model_dump())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


@router.get("/", response_model=list[ReviewResponse])
def list_reviews(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(Review).offset(skip).limit(limit).all()


@router.get("/{record_id}", response_model=ReviewResponse)
def get_reviews(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(Review, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Review not found")
    return record


@router.patch("/{record_id}", response_model=ReviewResponse)
def update_reviews(record_id: UUID, payload: ReviewUpdate, db: Session = Depends(get_db)):
    record = db.get(Review, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Review not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(record, field, value)
    db.commit()
    db.refresh(record)
    return record


@router.delete("/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_reviews(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(Review, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Review not found")
    db.delete(record)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
