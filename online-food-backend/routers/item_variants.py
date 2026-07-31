from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from db import get_db
from models.item_Variant import ItemVariant
from schemas import ItemVariantCreate, ItemVariantResponse, ItemVariantUpdate

router = APIRouter(prefix="/item-variants", tags=["Item variants"])


@router.post("/", response_model=ItemVariantResponse, status_code=status.HTTP_201_CREATED)
def create_item_variants(payload: ItemVariantCreate, db: Session = Depends(get_db)):
    record = ItemVariant(**payload.model_dump())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


@router.get("/", response_model=list[ItemVariantResponse])
def list_item_variants(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(ItemVariant).offset(skip).limit(limit).all()


@router.get("/{record_id}", response_model=ItemVariantResponse)
def get_item_variants(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(ItemVariant, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="ItemVariant not found")
    return record


@router.patch("/{record_id}", response_model=ItemVariantResponse)
def update_item_variants(record_id: UUID, payload: ItemVariantUpdate, db: Session = Depends(get_db)):
    record = db.get(ItemVariant, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="ItemVariant not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(record, field, value)
    db.commit()
    db.refresh(record)
    return record


@router.delete("/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_item_variants(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(ItemVariant, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="ItemVariant not found")
    db.delete(record)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
