from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from db import get_db
from models.restaurants import Restaurant
from schemas import RestaurantCreate, RestaurantResponse, RestaurantUpdate

router = APIRouter(prefix="/restaurants", tags=["Restaurants"])


@router.post("/", response_model=RestaurantResponse, status_code=status.HTTP_201_CREATED)
def create_restaurants(payload: RestaurantCreate, db: Session = Depends(get_db)):
    record = Restaurant(**payload.model_dump())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


@router.get("/", response_model=list[RestaurantResponse])
def list_restaurants(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(Restaurant).offset(skip).limit(limit).all()


@router.get("/{record_id}", response_model=RestaurantResponse)
def get_restaurants(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(Restaurant, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    return record


@router.patch("/{record_id}", response_model=RestaurantResponse)
def update_restaurants(record_id: UUID, payload: RestaurantUpdate, db: Session = Depends(get_db)):
    record = db.get(Restaurant, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(record, field, value)
    db.commit()
    db.refresh(record)
    return record


@router.delete("/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_restaurants(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(Restaurant, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    db.delete(record)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
