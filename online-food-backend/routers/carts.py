from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from db import get_db
from models.carts import Cart
from schemas import CartCreate, CartResponse, CartUpdate

router = APIRouter(prefix="/carts", tags=["Carts"])


@router.post("/", response_model=CartResponse, status_code=status.HTTP_201_CREATED)
def create_carts(payload: CartCreate, db: Session = Depends(get_db)):
    record = Cart(**payload.model_dump())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


from typing import Optional

@router.get("/", response_model=list[CartResponse])
def list_carts(user_id: Optional[UUID] = None, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    query = db.query(Cart)
    if user_id:
        query = query.filter(Cart.user_id == user_id)
    return query.offset(skip).limit(limit).all()


@router.get("/user/{user_id}")
def get_cart_by_user(user_id: UUID, db: Session = Depends(get_db)):
    cart = db.query(Cart).filter(Cart.user_id == user_id).first()
    if not cart:
        # Create cart if missing
        first_rest = db.query(Cart).first()
        rest_id = first_rest.restaurant_id if first_rest else None
        if not rest_id:
            from models.restaurants import Restaurant
            r = db.query(Restaurant).first()
            if r:
                rest_id = r.id
        if not rest_id:
            raise HTTPException(status_code=404, detail="No restaurants available to create cart")
        cart = Cart(user_id=user_id, restaurant_id=rest_id)
        db.add(cart)
        db.commit()
        db.refresh(cart)

    from models.restaurants import Restaurant
    restaurant = db.get(Restaurant, cart.restaurant_id) if cart.restaurant_id else None

    return {
        "id": str(cart.id),
        "user_id": str(cart.user_id),
        "restaurant_id": str(cart.restaurant_id) if cart.restaurant_id else None,
        "restaurant_name": restaurant.name if restaurant else None,
        "delivery_fee": float(restaurant.delivery_fee) if restaurant and restaurant.delivery_fee else 2.99,
        "updated_at": cart.updated_at
    }


@router.patch("/{record_id}", response_model=CartResponse)
def update_carts(record_id: UUID, payload: CartUpdate, db: Session = Depends(get_db)):
    record = db.get(Cart, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Cart not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(record, field, value)
    db.commit()
    db.refresh(record)
    return record


@router.delete("/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_carts(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(Cart, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Cart not found")
    db.delete(record)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
