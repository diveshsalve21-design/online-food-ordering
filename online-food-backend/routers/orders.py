from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session, joinedload

from db import get_db
from models.Orders import Order
from models.Order_items import OrderItem
from models.restaurants import Restaurant
from models.users import User
from models.address import Address
from models.Enums import OrderStatus
from schemas import OrderCreate, OrderResponse, OrderUpdate

router = APIRouter(prefix="/orders", tags=["Orders"])


@router.post("/", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
def create_orders(payload: OrderCreate, db: Session = Depends(get_db)):
    record = Order(**payload.model_dump())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


@router.get("/", response_model=list[OrderResponse])
def list_orders(
    user_id: Optional[UUID] = None,
    restaurant_id: Optional[UUID] = None,
    order_status: Optional[OrderStatus] = None,
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    query = db.query(Order)
    if user_id:
        query = query.filter(Order.user_id == user_id)
    if restaurant_id:
        query = query.filter(Order.restaurant_id == restaurant_id)
    if order_status:
        query = query.filter(Order.order_status == order_status)
    return query.order_by(Order.placed_at.desc()).offset(skip).limit(limit).all()


@router.get("/details/list")
def list_orders_detailed(
    user_id: Optional[UUID] = None,
    restaurant_id: Optional[UUID] = None,
    order_status: Optional[str] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    query = db.query(Order)
    if user_id:
        query = query.filter(Order.user_id == user_id)
    if restaurant_id:
        query = query.filter(Order.restaurant_id == restaurant_id)
    if order_status:
        query = query.filter(Order.order_status == order_status)
    
    orders = query.order_by(Order.placed_at.desc()).offset(skip).limit(limit).all()
    result = []
    for o in orders:
        user = db.get(User, o.user_id)
        restaurant = db.get(Restaurant, o.restaurant_id)
        addr = db.get(Address, o.delivery_address_id) if o.delivery_address_id else None
        items = db.query(OrderItem).filter(OrderItem.order_id == o.id).all()
        
        result.append({
            "id": str(o.id),
            "user_id": str(o.user_id),
            "customer_name": user.full_name if user else "Customer",
            "customer_phone": user.phone if user else "",
            "restaurant_id": str(o.restaurant_id),
            "restaurant_name": restaurant.name if restaurant else "Restaurant",
            "delivery_address": f"{addr.address}, {addr.city}" if addr else "Saved Address",
            "order_status": o.order_status.value if hasattr(o.order_status, 'value') else str(o.order_status),
            "item_total": float(o.item_total),
            "delivery_fee": float(o.delivery_fee),
            "discount_amount": float(o.discount_amount),
            "final_amount": float(o.final_amount),
            "placed_at": o.placed_at.isoformat() if o.placed_at else "",
            "items": [
                {
                    "id": str(it.id),
                    "menu_item_id": str(it.menu_item_id),
                    "quantity": it.quantity,
                    "price": float(it.unit_price_snapshot)
                } for it in items
            ]
        })
    return result


@router.get("/{record_id}", response_model=OrderResponse)
def get_orders(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(Order, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return record


@router.get("/{record_id}/details")
def get_order_details(record_id: UUID, db: Session = Depends(get_db)):
    o = db.get(Order, record_id)
    if o is None:
        raise HTTPException(status_code=404, detail="Order not found")
    
    user = db.get(User, o.user_id)
    restaurant = db.get(Restaurant, o.restaurant_id)
    addr = db.get(Address, o.delivery_address_id) if o.delivery_address_id else None
    items = db.query(OrderItem).filter(OrderItem.order_id == o.id).all()
    
    return {
        "id": str(o.id),
        "user_id": str(o.user_id),
        "customer_name": user.full_name if user else "Customer",
        "customer_phone": user.phone if user else "",
        "restaurant_id": str(o.restaurant_id),
        "restaurant_name": restaurant.name if restaurant else "Restaurant",
        "restaurant_image": restaurant.image_url if restaurant else None,
        "delivery_address": f"{addr.address}, {addr.city}" if addr else "Saved Address",
        "order_status": o.order_status.value if hasattr(o.order_status, 'value') else str(o.order_status),
        "item_total": float(o.item_total),
        "delivery_fee": float(o.delivery_fee),
        "discount_amount": float(o.discount_amount),
        "final_amount": float(o.final_amount),
        "placed_at": o.placed_at.isoformat() if o.placed_at else "",
        "items": [
            {
                "id": str(it.id),
                "menu_item_id": str(it.menu_item_id),
                "quantity": it.quantity,
                "price": float(it.unit_price_snapshot)
            } for it in items
        ]
    }


@router.patch("/{record_id}", response_model=OrderResponse)
def update_orders(record_id: UUID, payload: OrderUpdate, db: Session = Depends(get_db)):
    record = db.get(Order, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Order not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(record, field, value)
    db.commit()
    db.refresh(record)
    return record


@router.delete("/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_orders(record_id: UUID, db: Session = Depends(get_db)):
    record = db.get(Order, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Order not found")
    db.delete(record)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
