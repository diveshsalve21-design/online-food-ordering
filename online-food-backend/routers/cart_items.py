from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from db import get_db
from models.Carts_Items import CartItem
from models.carts import Cart
from models.menu_items import MenuItem
from models.restaurants import Restaurant
from schemas import CartItemCreate, CartItemResponse, CartItemUpdate

router = APIRouter(prefix="/cart-items", tags=["Cart items"])


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_cart_item(payload: CartItemCreate, db: Session = Depends(get_db)):
    cart = db.get(Cart, payload.cart_id)
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    menu_item = db.get(MenuItem, payload.menu_item_id)
    if not menu_item:
        raise HTTPException(status_code=404, detail="Menu item not found")

    # Single-restaurant restriction check:
    existing_items = db.query(CartItem).filter(CartItem.cart_id == cart.id).all()
    if existing_items and str(cart.restaurant_id) != str(menu_item.restaurant_id):
        # Check if restaurant details match
        curr_rest = db.get(Restaurant, cart.restaurant_id)
        curr_name = curr_rest.name if curr_rest else "another restaurant"
        new_rest = db.get(Restaurant, menu_item.restaurant_id)
        new_name = new_rest.name if new_rest else "the selected restaurant"
        
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Your cart already contains items from '{curr_name}'. Clear your cart to add items from '{new_name}'."
        )

    # Update restaurant_id of cart to match menu_item's restaurant
    cart.restaurant_id = menu_item.restaurant_id
    db.commit()

    # Check if item already in cart
    existing_cart_item = db.query(CartItem).filter(
        CartItem.cart_id == payload.cart_id,
        CartItem.menu_item_id == payload.menu_item_id
    ).first()

    if existing_cart_item:
        existing_cart_item.quantity += payload.quantity
        db.commit()
        db.refresh(existing_cart_item)
        return {
            "id": str(existing_cart_item.id),
            "cart_id": str(existing_cart_item.cart_id),
            "menu_item_id": str(existing_cart_item.menu_item_id),
            "quantity": existing_cart_item.quantity,
            "name": menu_item.name,
            "unit_price": float(menu_item.price),
            "image_url": menu_item.image_url
        }

    record = CartItem(**payload.model_dump())
    db.add(record)
    db.commit()
    db.refresh(record)
    
    return {
        "id": str(record.id),
        "cart_id": str(record.cart_id),
        "menu_item_id": str(record.menu_item_id),
        "quantity": record.quantity,
        "name": menu_item.name,
        "unit_price": float(menu_item.price),
        "image_url": menu_item.image_url
    }


@router.get("/")
def list_cart_items(cart_id: Optional[UUID] = None, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    query = db.query(CartItem)
    if cart_id:
        query = query.filter(CartItem.cart_id == cart_id)
    
    items = query.offset(skip).limit(limit).all()
    result = []
    for item in items:
        mi = db.get(MenuItem, item.menu_item_id)
        result.append({
            "id": str(item.id),
            "cart_id": str(item.cart_id),
            "menu_item_id": str(item.menu_item_id),
            "quantity": item.quantity,
            "special_instruction": item.special_instruction,
            "name": mi.name if mi else "Food Item",
            "unit_price": float(mi.price) if mi else 0.0,
            "image_url": mi.image_url if mi else None
        })
    return result


@router.delete("/clear/{cart_id}")
def clear_cart_items(cart_id: UUID, db: Session = Depends(get_db)):
    db.query(CartItem).filter(CartItem.cart_id == cart_id).delete()
    db.commit()
    return {"message": "Cart cleared successfully"}


@router.get("/{record_id}")
def get_cart_item(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(CartItem, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="CartItem not found")
    mi = db.get(MenuItem, record.menu_item_id)
    return {
        "id": str(record.id),
        "cart_id": str(record.cart_id),
        "menu_item_id": str(record.menu_item_id),
        "quantity": record.quantity,
        "special_instruction": record.special_instruction,
        "name": mi.name if mi else "Food Item",
        "unit_price": float(mi.price) if mi else 0.0,
        "image_url": mi.image_url if mi else None
    }


@router.patch("/{record_id}")
def update_cart_items(record_id: UUID, payload: CartItemUpdate, db: Session = Depends(get_db)):
    record = db.get(CartItem, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="CartItem not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(record, field, value)
    db.commit()
    db.refresh(record)
    mi = db.get(MenuItem, record.menu_item_id)
    return {
        "id": str(record.id),
        "cart_id": str(record.cart_id),
        "menu_item_id": str(record.menu_item_id),
        "quantity": record.quantity,
        "special_instruction": record.special_instruction,
        "name": mi.name if mi else "Food Item",
        "unit_price": float(mi.price) if mi else 0.0,
        "image_url": mi.image_url if mi else None
    }


@router.delete("/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_cart_items(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(CartItem, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="CartItem not found")
    db.delete(record)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
