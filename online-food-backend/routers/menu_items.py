from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from db import get_db
from models.menu_items import MenuItem
from schemas import MenuItemCreate, MenuItemResponse, MenuItemUpdate

router = APIRouter(prefix="/menu-items", tags=["Menu items"])


@router.post("/", response_model=MenuItemResponse, status_code=status.HTTP_201_CREATED)
def create_menu_items(payload: MenuItemCreate, db: Session = Depends(get_db)):
    record = MenuItem(**payload.model_dump())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


from typing import Optional

@router.get("/", response_model=list[MenuItemResponse])
def list_menu_items(
    restaurant_id: Optional[UUID] = None,
    category_id: Optional[UUID] = None,
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    query = db.query(MenuItem)
    if restaurant_id:
        query = query.filter(MenuItem.restaurant_id == restaurant_id)
    if category_id:
        query = query.filter(MenuItem.category_id == category_id)
    return query.offset(skip).limit(limit).all()


@router.get("/{record_id}", response_model=MenuItemResponse)
def get_menu_items(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(MenuItem, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="MenuItem not found")
    return record


@router.patch("/{record_id}", response_model=MenuItemResponse)
def update_menu_items(record_id: UUID, payload: MenuItemUpdate, db: Session = Depends(get_db)):
    record = db.get(MenuItem, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="MenuItem not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(record, field, value)
    db.commit()
    db.refresh(record)
    return record


@router.delete("/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_menu_items(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(MenuItem, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="MenuItem not found")
    db.delete(record)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
