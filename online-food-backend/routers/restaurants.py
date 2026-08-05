from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session, joinedload

from db import get_db
from models.restaurants import Restaurant
from models.menu_categories import MenuCategory
from models.menu_items import MenuItem
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
def list_restaurants(
    search: Optional[str] = None,
    is_active: Optional[bool] = None,
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    query = db.query(Restaurant)
    if is_active is not None:
        query = query.filter(Restaurant.is_active == is_active)
    if search:
        pattern = f"%{search}%"
        query = query.filter(
            (Restaurant.name.ilike(pattern)) | (Restaurant.cuisine.ilike(pattern))
        )
    return query.offset(skip).limit(limit).all()


@router.get("/owner/{owner_id}", response_model=RestaurantResponse)
def get_restaurant_by_owner(owner_id: UUID, db: Session = Depends(get_db)):
    record = db.query(Restaurant).filter(Restaurant.owner_id == owner_id).first()
    if record is None:
        raise HTTPException(status_code=404, detail="Restaurant not found for this owner")
    return record


@router.get("/{record_id}/menu")
def get_restaurant_menu(record_id: UUID, db: Session = Depends(get_db)):
    restaurant = db.get(Restaurant, record_id)
    if restaurant is None:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    
    categories = db.query(MenuCategory).filter(
        MenuCategory.restaurant_id == record_id
    ).order_by(MenuCategory.display_order).all()
    
    items = db.query(MenuItem).filter(
        MenuItem.restaurant_id == record_id
    ).all()
    
    return {
        "restaurant_id": str(record_id),
        "categories": [
            {"id": str(c.id), "name": c.name, "display_order": c.display_order} 
            for c in categories
        ],
        "menu_items": [
            {
                "id": str(i.id),
                "restaurant_id": str(i.restaurant_id),
                "category_id": str(i.category_id),
                "name": i.name,
                "description": i.description,
                "price": float(i.price),
                "is_vegetarian": i.is_vegetarian,
                "is_available": i.is_available,
                "image_url": i.image_url
            }
            for i in items
        ]
    }


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
