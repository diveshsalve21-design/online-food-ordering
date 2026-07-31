from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from db import get_db
from models.menu_categories import MenuCategory
from schemas import MenuCategoryCreate, MenuCategoryResponse, MenuCategoryUpdate

router = APIRouter(prefix="/menu-categories", tags=["Menu categories"])


@router.post("/", response_model=MenuCategoryResponse, status_code=status.HTTP_201_CREATED)
def create_menu_categories(payload: MenuCategoryCreate, db: Session = Depends(get_db)):
    record = MenuCategory(**payload.model_dump())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


@router.get("/", response_model=list[MenuCategoryResponse])
def list_menu_categories(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(MenuCategory).offset(skip).limit(limit).all()


@router.get("/{record_id}", response_model=MenuCategoryResponse)
def get_menu_categories(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(MenuCategory, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="MenuCategory not found")
    return record


@router.patch("/{record_id}", response_model=MenuCategoryResponse)
def update_menu_categories(record_id: UUID, payload: MenuCategoryUpdate, db: Session = Depends(get_db)):
    record = db.get(MenuCategory, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="MenuCategory not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(record, field, value)
    db.commit()
    db.refresh(record)
    return record


@router.delete("/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_menu_categories(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(MenuCategory, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="MenuCategory not found")
    db.delete(record)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
