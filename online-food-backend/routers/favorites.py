from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from db import get_db
from models.favorites import Favorite
from schemas import FavoriteCreate, FavoriteResponse, FavoriteUpdate

router = APIRouter(prefix="/favorites", tags=["Favorites"])


@router.post("/", response_model=FavoriteResponse, status_code=status.HTTP_201_CREATED)
def create_favorites(payload: FavoriteCreate, db: Session = Depends(get_db)):
    record = Favorite(**payload.model_dump())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


@router.get("/", response_model=list[FavoriteResponse])
def list_favorites(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(Favorite).offset(skip).limit(limit).all()


@router.get("/{record_id}", response_model=FavoriteResponse)
def get_favorites(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(Favorite, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Favorite not found")
    return record


@router.patch("/{record_id}", response_model=FavoriteResponse)
def update_favorites(record_id: UUID, payload: FavoriteUpdate, db: Session = Depends(get_db)):
    record = db.get(Favorite, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Favorite not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(record, field, value)
    db.commit()
    db.refresh(record)
    return record


@router.delete("/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_favorites(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(Favorite, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Favorite not found")
    db.delete(record)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
