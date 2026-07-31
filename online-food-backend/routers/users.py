from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from db import get_db
from models.users import User
from schemas import UserCreate, UserResponse, UserUpdate

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_users(payload: UserCreate, db: Session = Depends(get_db)):
    record = User(**payload.model_dump())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


@router.get("/", response_model=list[UserResponse])
def list_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(User).offset(skip).limit(limit).all()


@router.get("/{record_id}", response_model=UserResponse)
def get_users(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(User, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="User not found")
    return record


@router.patch("/{record_id}", response_model=UserResponse)
def update_users(record_id: UUID, payload: UserUpdate, db: Session = Depends(get_db)):
    record = db.get(User, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="User not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(record, field, value)
    db.commit()
    db.refresh(record)
    return record


@router.delete("/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_users(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(User, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(record)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
