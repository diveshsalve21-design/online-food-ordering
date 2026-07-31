from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from db import get_db
from models.Item_Addons import ItemAddon
from schemas import ItemAddonCreate, ItemAddonResponse, ItemAddonUpdate

router = APIRouter(prefix="/item-addons", tags=["Item addons"])


@router.post("/", response_model=ItemAddonResponse, status_code=status.HTTP_201_CREATED)
def create_item_addons(payload: ItemAddonCreate, db: Session = Depends(get_db)):
    record = ItemAddon(**payload.model_dump())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


@router.get("/", response_model=list[ItemAddonResponse])
def list_item_addons(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(ItemAddon).offset(skip).limit(limit).all()


@router.get("/{record_id}", response_model=ItemAddonResponse)
def get_item_addons(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(ItemAddon, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="ItemAddon not found")
    return record


@router.patch("/{record_id}", response_model=ItemAddonResponse)
def update_item_addons(record_id: UUID, payload: ItemAddonUpdate, db: Session = Depends(get_db)):
    record = db.get(ItemAddon, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="ItemAddon not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(record, field, value)
    db.commit()
    db.refresh(record)
    return record


@router.delete("/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_item_addons(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(ItemAddon, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="ItemAddon not found")
    db.delete(record)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
